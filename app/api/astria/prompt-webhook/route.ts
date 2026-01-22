import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const searchParams = request.nextUrl.searchParams;
    const modelId = searchParams.get("model_id");
    const webhookSecret = searchParams.get("webhook_secret");

    console.log("🔔 Webhook ontvangen voor model:", modelId);

    if (webhookSecret !== process.env.APP_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const webhookData = JSON.parse(body);
    const imageUrls: string[] = [];

    if (
      webhookData.prompt?.images &&
      Array.isArray(webhookData.prompt.images)
    ) {
      for (const image of webhookData.prompt.images) {
        const url = typeof image === "string" ? image : image.url;
        if (url) imageUrls.push(url);
      }
    }

    console.log("🖼️  Nieuwe foto's:", imageUrls.length);

    if (imageUrls.length > 0) {
      const projectResult = await sql`
        SELECT generated_photos 
        FROM projects 
        WHERE id = ${modelId}
        FOR UPDATE
      `;

      let currentPhotos: string[] = [];
      if (projectResult.length > 0 && projectResult[0].generated_photos) {
        const dbPhotos = projectResult[0].generated_photos;
        currentPhotos = Array.isArray(dbPhotos) ? dbPhotos : [];
      }

      console.log("📊 Huidige foto's:", currentPhotos.length);

      const allPhotos = [...currentPhotos, ...imageUrls];
      const uniquePhotos = [...new Set(allPhotos)];

      console.log("✅ Totaal uniek:", uniquePhotos.length);

      await sql`
        UPDATE projects 
        SET 
          generated_photos = ${uniquePhotos},
          status = CASE 
            WHEN ${uniquePhotos.length} >= 40 THEN 'completed' 
            ELSE 'processing' 
          END,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${modelId}
      `;

      return NextResponse.json({
        success: true,
        count: imageUrls.length,
        total: uniquePhotos.length,
      });
    }

    return NextResponse.json({ success: true, count: 0 });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
