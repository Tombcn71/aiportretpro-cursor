import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const searchParams = request.nextUrl.searchParams;
    const modelId = searchParams.get("model_id");
    const webhookSecret = searchParams.get("webhook_secret");

    if (webhookSecret !== process.env.APP_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let webhookData;
    try {
      webhookData = JSON.parse(body);
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const imageUrls: string[] = [];
    if (
      webhookData.prompt &&
      webhookData.prompt.images &&
      Array.isArray(webhookData.prompt.images)
    ) {
      for (const image of webhookData.prompt.images) {
        if (typeof image === "string" && image.startsWith("http")) {
          imageUrls.push(image);
        } else if (image && image.url && typeof image.url === "string") {
          imageUrls.push(image.url);
        }
      }
    }

    if (imageUrls.length > 0) {
      // --- DE FIX VOOR HET AANTAL ---
      // We halen eerst het huidige project op om te kijken hoeveel foto's er al zijn
      const currentProject =
        await sql`SELECT generated_photos FROM projects WHERE id = ${modelId}`;
      const existingPhotos = currentProject[0]?.generated_photos || [];

      // Update alleen als we ECHT meer foto's hebben gevonden (bijv. 40 vs 8)
      // Zo voorkom je dat de train-webhook resultaten (40) worden overschreven door deze (8)
      if (imageUrls.length >= existingPhotos.length) {
        await sql`
          UPDATE projects 
          SET generated_photos = ${imageUrls}, 
              status = 'completed',
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${modelId}
        `;
        console.log(
          `✅ Project ${modelId} geüpdatet naar ${imageUrls.length} foto's`,
        );
      } else {
        console.log(
          `⚠️ Prompt-webhook genegeerd: er staan al ${existingPhotos.length} foto's in DB`,
        );
      }
    }

    return NextResponse.json({
      success: true,
      imagesFound: imageUrls.length,
    });
  } catch (error) {
    console.error("❌ Prompt webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
