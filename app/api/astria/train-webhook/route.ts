import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const incomingData = await request.json();
    const model_id = new URL(request.url).searchParams.get("model_id");

    if (incomingData.tune?.trained_at) {
      const response = await fetch(
        `https://api.astria.ai/tunes/${incomingData.tune.id}/prompts`,
        {
          headers: { Authorization: `Bearer ${process.env.ASTRIA_API_KEY}` },
        },
      );

      if (response.ok) {
        const promptsData = await response.json();
        const fetchedImages: string[] = [];
        promptsData.forEach((p: any) => {
          p.images?.forEach((i: any) => {
            const url = typeof i === "string" ? i : i.url;
            if (url) fetchedImages.push(url);
          });
        });

        if (fetchedImages.length > 0) {
          await sql`
            UPDATE projects 
            SET generated_photos = ${JSON.stringify(fetchedImages)},
                status = 'completed',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${model_id}
          `;
        }
      }
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
