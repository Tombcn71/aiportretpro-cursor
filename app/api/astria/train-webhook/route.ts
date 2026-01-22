import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const incomingData = await request.json();
    const { tune } = incomingData;
    const urlObj = new URL(request.url);
    const model_id = urlObj.searchParams.get("model_id");

    const status = tune.trained_at ? "trained" : "training";

    if (status === "trained") {
      const response = await fetch(
        `https://api.astria.ai/tunes/${tune.id}/prompts`,
        {
          headers: { Authorization: `Bearer ${process.env.ASTRIA_API_KEY}` },
        },
      );

      if (response.ok) {
        const promptsData = await response.json();
        const allImageUrls: string[] = [];

        // Loop door alle prompts en verzamel alle foto's
        for (const prompt of promptsData) {
          if (prompt.images) {
            prompt.images.forEach((img: any) => {
              if (img.url) allImageUrls.push(img.url);
            });
          }
        }

        // Gebruik de unieke lijst om overschrijven te voorkomen
        if (allImageUrls.length > 0) {
          await sql`
            UPDATE projects 
            SET generated_photos = ${allImageUrls},
                status = 'completed',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${model_id}
          `;
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
