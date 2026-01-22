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
      // Atomische array append met deduplicatie
      await sql`
        UPDATE projects 
        SET 
          generated_photos = (
            SELECT array_agg(DISTINCT photo)
            FROM unnest(
              COALESCE(generated_photos, ARRAY[]::text[]) || ${imageUrls}::text[]
            ) AS photo
          ),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${modelId}
      `;

      // Check totaal aantal foto's
      const result = await sql`
        SELECT array_length(generated_photos, 1) as photo_count
        FROM projects 
        WHERE id = ${modelId}
      `;

      const photoCount = result[0]?.photo_count || 0;

      // Update status naar completed als we 40 foto's hebben
      if (photoCount >= 40) {
        await sql`
          UPDATE projects 
          SET status = 'completed'
          WHERE id = ${modelId}
        `;
      }

      console.log(
        `✅ Webhook #${Math.ceil(photoCount / 8)}: Added ${imageUrls.length} photos. Total: ${photoCount}/40`,
      );

      return NextResponse.json({
        success: true,
        count: imageUrls.length,
        total: photoCount,
      });
    }

    return NextResponse.json({ success: true, count: 0 });
  } catch (error) {
    console.error("❌ Prompt webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
