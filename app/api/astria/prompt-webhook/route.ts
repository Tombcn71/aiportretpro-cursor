import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    console.log("🎯 PROMPT WEBHOOK RECEIVED:", body);

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("user_id");
    const modelId = searchParams.get("model_id");
    const webhookSecret = searchParams.get("webhook_secret");

    // Verify webhook secret
    if (webhookSecret !== process.env.APP_WEBHOOK_SECRET) {
      console.error("❌ Invalid webhook secret");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let webhookData;
    try {
      webhookData = JSON.parse(body);
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Extract image URLs - EXACT ZOALS JIJ HET HAD
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
      // DIT IS JOUW LOGICA: Foto's toevoegen en status updaten
      // Ik heb alleen de SQL-syntax veilig gemaakt voor Neon
      await sql`
        UPDATE projects 
        SET generated_photos = ${imageUrls}, 
            status = 'completed',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${modelId}
      `;
      console.log(
        `✅ Project ${modelId} geüpdatet met ${imageUrls.length} foto's`,
      );
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
