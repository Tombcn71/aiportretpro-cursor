import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const incomingData = await request.json();
    const { tune } = incomingData;
    const urlObj = new URL(request.url);
    const model_id = urlObj.searchParams.get("model_id");

    const status = tune.trained_at ? "trained" : "training";

    await sql`
      UPDATE projects 
      SET status = ${status === "trained" ? "processing" : "training"},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${model_id}
    `;

    console.log(`🎓 Training ${status} voor model ${model_id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Training webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
