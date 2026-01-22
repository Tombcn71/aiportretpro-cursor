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

    let webhookData = JSON.parse(body);
    const imageUrls: string[] = [];

    if (
      webhookData.prompt &&
      webhookData.prompt.images &&
      Array.isArray(webhookData.prompt.images)
    ) {
      for (const image of webhookData.prompt.images) {
        const url = typeof image === "string" ? image : image.url;
        if (url) imageUrls.push(url);
      }
    }

    if (imageUrls.length > 0) {
      // 1. Haal de foto's op die er al staan
      const projectResult =
        await sql`SELECT generated_photos FROM projects WHERE id = ${modelId}`;
      let currentPhotos: string[] = [];

      if (projectResult.length > 0 && projectResult[0].generated_photos) {
        const raw = projectResult[0].generated_photos;
        currentPhotos = Array.isArray(raw) ? raw : JSON.parse(raw || "[]");
      }

      // 2. VOEG ZE SAMEN (Zodat je van 8 naar 40 gaat)
      const allPhotos = [...new Set([...currentPhotos, ...imageUrls])];

      // 3. UPDATE (Met de JSON fix zodat je dashboard niet leeg blijft)
      await sql`
        UPDATE projects 
        SET generated_photos = ${JSON.stringify(allPhotos)}, 
            status = CASE WHEN ${allPhotos.length} >= 40 THEN 'completed' ELSE 'processing' END,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${modelId}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
