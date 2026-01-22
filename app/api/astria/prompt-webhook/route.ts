import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const webhookData = JSON.parse(body);
    const modelId = new URL(request.url).searchParams.get("model_id");

    const newImages: string[] = [];
    if (webhookData.prompt?.images) {
      webhookData.prompt.images.forEach((img: any) => {
        const url = typeof img === "string" ? img : img.url;
        if (url) newImages.push(url);
      });
    }

    if (newImages.length > 0) {
      // Haal huidige foto's op om te voorkomen dat we ze wissen
      const res =
        await sql`SELECT generated_photos FROM projects WHERE id = ${modelId}`;
      let currentPhotos: string[] = [];

      if (res.length > 0 && res[0].generated_photos) {
        const rawData = res[0].generated_photos;
        currentPhotos = Array.isArray(rawData)
          ? rawData
          : JSON.parse(rawData || "[]");
      }

      // Voeg samen en maak uniek
      const combined = [...new Set([...currentPhotos, ...newImages])];

      // UPDATE: We slaan het op als een simpele JSON string voor maximale compatibiliteit
      await sql`
        UPDATE projects 
        SET generated_photos = ${JSON.stringify(combined)}, 
            status = 'completed',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${modelId}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Webhook error:", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
