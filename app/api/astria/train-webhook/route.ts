import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

type TuneData = {
  id: number;
  title: string;
  name: string;
  steps: null;
  trained_at: null;
  started_training_at: null;
  created_at: string;
  updated_at: string;
  expires_at: null;
};

export async function POST(request: NextRequest) {
  try {
    const incomingData = (await request.json()) as { tune: TuneData };
    const { tune } = incomingData;

    const urlObj = new URL(request.url);
    const user_id = urlObj.searchParams.get("user_id");
    const model_id = urlObj.searchParams.get("model_id");
    const webhook_secret = urlObj.searchParams.get("webhook_secret");

    const tuneId = tune.id;
    const status = tune.trained_at ? "trained" : "training";

    if (!tuneId) {
      return NextResponse.json({ error: "No tune ID" }, { status: 400 });
    }

    const projects = await sql`
      SELECT * FROM projects WHERE tune_id = ${tuneId.toString()}
    `;

    if (projects.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = projects[0];

    await sql`
      UPDATE projects 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${project.id}
    `;

    if (status === "trained") {
      try {
        const promptsResponse = await fetch(
          `https://api.astria.ai/tunes/${tuneId}/prompts`,
          {
            headers: {
              Authorization: `Bearer ${process.env.ASTRIA_API_KEY}`,
            },
          },
        );

        if (promptsResponse.ok) {
          const promptsData = await promptsResponse.json();
          const allImageUrls: string[] = [];

          // VERANDERING: Loop door ALLE prompts in de array (dus alle 40+ foto's)
          promptsData.forEach((prompt: any) => {
            if (prompt.images && Array.isArray(prompt.images)) {
              prompt.images.forEach((image: any) => {
                const url = typeof image === "string" ? image : image.url;
                if (url) {
                  allImageUrls.push(url);
                }
              });
            }
          });

          if (allImageUrls.length > 0) {
            await sql`
              UPDATE projects 
              SET 
                generated_photos = ${JSON.stringify(allImageUrls)},
                status = 'completed',
                updated_at = CURRENT_TIMESTAMP
              WHERE id = ${project.id}
            `;
          }
        }
      } catch (fetchError) {
        console.error("❌ Error fetching photos:", fetchError);
      }
    }

    return NextResponse.json({ success: true, processed: true });
  } catch (error) {
    console.error("❌ Train webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
