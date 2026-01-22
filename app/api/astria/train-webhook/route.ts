import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const incomingData = await request.json();
    const { tune } = incomingData;
    const model_id = new URL(request.url).searchParams.get("model_id");

    if (tune.trained_at) {
      // Haal ALLES op bij Astria (de 40 foto's)
      const response = await fetch(
        `https://api.astria.ai/tunes/${tune.id}/prompts`,
        {
          headers: { Authorization: `Bearer ${process.env.ASTRIA_API_KEY}` },
        },
      );

      if (response.ok) {
        const promptsData = await response.json();
        const allPhotos: string[] = [];

        // Loop door alle prompts en verzamel elke image URL
        promptsData.forEach((p: any) => {
          if (p.images)
            p.images.forEach((img: any) => {
              if (img.url) allPhotos.push(img.url);
            });
        });

        if (allPhotos.length > 0) {
          // Forceer de update naar de database
          await sql`
            UPDATE projects 
            SET generated_photos = ${JSON.stringify(allPhotos)},
                status = 'completed',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${model_id}
          `;
        }
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Fail" }, { status: 500 });
  }
}
