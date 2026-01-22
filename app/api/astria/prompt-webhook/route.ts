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

    const webhookData = JSON.parse(body);
    const imageUrls: string[] = [];

    // Extraheer foto's uit de prompt-data
    if (
      webhookData.prompt?.images &&
      Array.isArray(webhookData.prompt.images)
    ) {
      for (const image of webhookData.prompt.images) {
        const url = typeof image === "string" ? image : image.url;
        if (url) imageUrls.push(url);
      }
    }

    if (imageUrls.length > 0) {
      // 1. Haal de HUIDIGE foto's op uit de database
      const projectResult =
        await sql`SELECT generated_photos FROM projects WHERE id = ${modelId}`;
      let currentPhotos: string[] = [];

      if (projectResult.length > 0 && projectResult[0].generated_photos) {
        currentPhotos = Array.isArray(projectResult[0].generated_photos)
          ? projectResult[0].generated_photos
          : JSON.parse(projectResult[0].generated_photos);
      }

      // 2. Combineer en verwijder dubbelen (Deduplicatie)
      const uniquePhotos = [...new Set([...currentPhotos, ...imageUrls])];

      // 3. Update met de volledige lijst
      await sql`
        UPDATE projects 
        SET generated_photos = ${uniquePhotos}, 
            status = CASE WHEN ${uniquePhotos.length} >= 40 THEN 'completed' ELSE 'processing' END,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${modelId}
      `;
    }

    return NextResponse.json({ success: true, count: imageUrls.length });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
