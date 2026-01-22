import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const modelId = new URL(request.url).searchParams.get("model_id");
    // We updaten hier GEEN foto's meer, alleen de status.
    // Dit voorkomt dat deze webhook de 40 foto's van de train-webhook overschrijft met 8 stuks.
    await sql`
      UPDATE projects 
      SET status = 'completed', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${modelId}
    `;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
