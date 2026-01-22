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

    if (!astriaApiKey || !uploadedPhotos || uploadedPhotos.length < 4) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 },
      );
    }

    const user = await getUserByEmail(session.user.email);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 1. Credit check
    const currentCredits = await CreditManager.getUserCredits(user.id);
    if (currentCredits < 1) {
      return NextResponse.json(
        { message: "Not enough credits" },
        { status: 402 },
      );
    }

    // 2. Project aanmaken in DB
    // FIX: We gebruiken ARRAY[] syntax voor Postgres om 500 errors op lege arrays te voorkomen
    const result = await sql`
      INSERT INTO projects (user_id, name, gender, outfits, backgrounds, uploaded_photos, status, credits_used)
      VALUES (
        ${user.id}, 
        ${projectName}, 
        ${gender}, 
        ARRAY[]::text[], 
        ARRAY[]::text[], 
        ${uploadedPhotos}, 
        'training', 
        0
      )
      RETURNING id
    `;
    const projectId = result[0].id;

    // 3. Astria Call
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

    const astriaResponse = await fetch(
      `https://api.astria.ai/p/${selectedPackId}/tunes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${astriaApiKey}`,
        },
        body: JSON.stringify(tuneBody),
      },
    );

    if (!astriaResponse.ok) {
      const errorData = await astriaResponse.json();
      console.error("Astria error:", errorData);
      await sql`DELETE FROM projects WHERE id = ${projectId}`;
      return NextResponse.json(
        { message: "Astria API error" },
        { status: 500 },
      );
    }

    const astriaData = await astriaResponse.json();

    // 4. Update en Creditgebruik (Parallel)
    await Promise.all([
      sql`UPDATE projects SET tune_id = ${astriaData.id.toString()} WHERE id = ${projectId}`,
      CreditManager.useCredit(user.id, projectId),
    ]);

    // 5. IPHONE FIX: Forceer Connection: close voor Safari stabiliteit
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
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
