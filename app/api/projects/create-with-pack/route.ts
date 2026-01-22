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
    // 1. Payload binnenhalen
    const payload = await request.json();
    const { projectName, gender, selectedPackId, uploadedPhotos } = payload;

    // 2. Auth Check
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 3. Validatie (Config & Input)
    if (!astriaApiKey) {
      console.error("Missing ASTRIA_API_KEY");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 },
      );
    }

    if (!uploadedPhotos || uploadedPhotos.length < 4) {
      return NextResponse.json(
        { message: "Minimaal 4 foto's vereist" },
        { status: 400 },
      );
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4. Credit check
    const currentCredits = await CreditManager.getUserCredits(user.id);
    if (currentCredits < 1) {
      return NextResponse.json(
        { message: "Niet genoeg credits beschikbaar" },
        { status: 402 },
      );
    }

    // 5. Project aanmaken in de Database (Initieel stadium)
    const result = await sql`
      INSERT INTO projects (user_id, name, gender, outfits, backgrounds, uploaded_photos, status, credits_used)
      VALUES (${user.id}, ${projectName}, ${gender}, ${[]}, ${[]}, ${uploadedPhotos}, 'training', 0)
      RETURNING id
    `;
    const projectId = result[0].id;

    // 6. Webhook Configuratie
    const baseUrl =
      process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
    // Gebruik de base URL voor callbacks, tenzij we lokaal testen
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

    // 7. Astria API Request met timeout-beveiliging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 seconden timeout

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
        // Ruim het aangemaakte project op bij falen
        await sql`DELETE FROM projects WHERE id = ${projectId}`;
        return NextResponse.json(
          { message: "AI Provider error" },
          { status: 500 },
        );
      }

      const astriaData = await astriaResponse.json();

      // 8. Update DB en Credit afschrijven (Parallel)
      await Promise.all([
        sql`UPDATE projects SET tune_id = ${astriaData.id.toString()} WHERE id = ${projectId}`,
        CreditManager.useCredit(user.id, projectId),
      ]);

      // 9. iPhone-vriendelijke Response
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
            Connection: "close", // Sluit de verbinding direct af na succes
          },
        },
      );
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      console.error("Fetch or Timeout Error:", fetchError);
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
