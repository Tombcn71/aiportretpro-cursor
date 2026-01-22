import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

type TuneData = {
  id: number;
  trained_at: string | null;
};

export async function POST(request: NextRequest) {
  try {
    const incomingData = (await request.json()) as { tune: TuneData };
    const { tune } = incomingData;
    const urlObj = new URL(request.url);
    const model_id = urlObj.searchParams.get("model_id");

    const tuneId = tune.id;
    const status = tune.trained_at ? "trained" : "training";

    if (!tuneId)
      return NextResponse.json({ error: "No tune ID" }, { status: 400 });

    // 1. Update de status van het project
    await sql`
      UPDATE projects 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${model_id}
    `;

    // 2. Als de training klaar is, haal ALLES op
    if (status === "trained") {
      const response = await fetch(
        `https://api.astria.ai/tunes/${tuneId}/prompts`,
        {
          headers: {
            Authorization: `Bearer ${process.env.ASTRIA_API_KEY}`,
          },
        },
      );

      if (response.ok) {
        const promptsData = await response.json();
        const allImageUrls: string[] = [];

        // Loop door ALLE prompts en ALLE afbeeldingen
        for (const prompt of promptsData) {
          if (prompt.images && Array.isArray(prompt.images)) {
            for (const image of prompt.images) {
              const url = typeof image === "string" ? image : image.url;
              if (url) allImageUrls.push(url);
            }
          }
        }

        if (allImageUrls.length > 0) {
          // UPDATE: Met JSON.stringify zodat je dashboard NIET leeg blijft
          await sql`
            UPDATE projects 
            SET 
              generated_photos = ${JSON.stringify(allImageUrls)},
              status = 'completed',
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ${model_id}
          `;
        }
      }
    }

    return NextResponse.json({ success: true, processed: true });
  } catch (error) {
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
