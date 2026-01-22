import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByEmail, sql } from "@/lib/db";
import { CreditManager } from "@/lib/credits";

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { projectName, gender, selectedPackId, uploadedPhotos } = payload;

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!astriaApiKey) {
      console.error("Missing ASTRIA_API_KEY");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 },
      );
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentCredits = await CreditManager.getUserCredits(user.id);
    if (currentCredits < 1) {
      return NextResponse.json(
        { message: "Niet genoeg credits" },
        { status: 402 },
      );
    }

    // STAP 5 FIX: We voegen 'outfits' en 'backgrounds' even niet toe aan de INSERT
    // om syntax-fouten met lege arrays [] te voorkomen. De DB vult deze zelf aan met defaults.
    let projectId;
    try {
      const result = await sql`
        INSERT INTO projects (user_id, name, gender, uploaded_photos, status, credits_used)
        VALUES (${user.id}, ${projectName}, ${gender}, ${uploadedPhotos}, 'training', 0)
        RETURNING id
      `;
      projectId = result[0].id;
    } catch (dbError) {
      console.error("Database Insert Error:", dbError);
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    const baseUrl =
      process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
    const webhookUrl =
      process.env.NODE_ENV === "development"
        ? "https://your-ngrok.url"
        : baseUrl;

    const tuneBody = {
      tune: {
        title: `${projectName}_${projectId}`,
        name: gender,
        image_urls: uploadedPhotos,
        callback: `${webhookUrl}/api/astria/train-webhook?user_id=${user.id}&model_id=${projectId}&webhook_secret=${appWebhookSecret}`,
        prompt_attributes: {
          callback: `${webhookUrl}/api/astria/prompt-webhook?user_id=${user.id}&model_id=${projectId}&webhook_secret=${appWebhookSecret}`,
        },
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const astriaResponse = await fetch(
        `https://api.astria.ai/p/${selectedPackId}/tunes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${astriaApiKey}`,
          },
          body: JSON.stringify(tuneBody),
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!astriaResponse.ok) {
        const errorData = await astriaResponse.json();
        console.error("Astria API error:", errorData);
        await sql`DELETE FROM projects WHERE id = ${projectId}`;
        return NextResponse.json(
          { message: "AI Provider error" },
          { status: 500 },
        );
      }

      const astriaData = await astriaResponse.json();

      // Parallelle afhandeling
      await Promise.all([
        sql`UPDATE projects SET tune_id = ${astriaData.id.toString()} WHERE id = ${projectId}`,
        CreditManager.useCredit(user.id, projectId),
      ]);

      return new NextResponse(
        JSON.stringify({
          message: "success",
          projectId: projectId,
          tuneId: astriaData.id,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            Connection: "close",
          },
        },
      );
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      await sql`DELETE FROM projects WHERE id = ${projectId}`;
      return NextResponse.json(
        { message: "Connection to AI provider lost" },
        { status: 504 },
      );
    }
  } catch (error) {
    console.error("Critical API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
