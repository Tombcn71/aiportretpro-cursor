import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    console.log("🎯 PROMPT WEBHOOK RECEIVED");

    const searchParams = request.nextUrl.searchParams;
    const modelId = searchParams.get("model_id");
    const webhookSecret = searchParams.get("webhook_secret");

    // 1. Validatie Secret
    if (webhookSecret !== process.env.APP_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!modelId) {
      return NextResponse.json({ error: "Missing model_id" }, { status: 400 });
    }

    const webhookData = JSON.parse(body);
    const imageUrls: string[] = [];

    // 2. Extraheer alle mogelijke afbeeldingen uit de Astria JSON
    const extractUrls = (obj: any) => {
      if (typeof obj === "string" && obj.startsWith("http"))
        imageUrls.push(obj);
      if (obj && typeof obj === "object") {
        for (const key in obj) {
          if (key === "url" && typeof obj[key] === "string")
            imageUrls.push(obj[key]);
          else extractUrls(obj[key]);
        }
      }
    };
    extractUrls(webhookData);

    const uniqueUrls = [...new Set(imageUrls)].filter((url) =>
      url.includes("astria.ai"),
    );

    if (uniqueUrls.length > 0) {
      // 3. Haal huidige foto's op om te mergen
      const result =
        await sql`SELECT generated_photos FROM projects WHERE id = ${modelId}`;
      let currentPhotos: string[] = [];

      if (result.length > 0 && result[0].generated_photos) {
        currentPhotos = Array.isArray(result[0].generated_photos)
          ? result[0].generated_photos
          : JSON.parse(result[0].generated_photos || "[]");
      }

      const finalPhotos = [...new Set([...currentPhotos, ...uniqueUrls])];

      // 4. DE FIX: Forceer status naar 'completed' en sla veilig op
      // We gebruiken JSON.stringify om database-mismatches te voorkomen
      const photosJson = JSON.stringify(finalPhotos);

      await sql`
        UPDATE projects 
        SET generated_photos = ${photosJson}::jsonb, 
            status = 'completed',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${modelId}
      `;

      console.log(`✅ Project ${modelId} succesvol bijgewerkt.`);
    }

    return NextResponse.json({ success: true, count: uniqueUrls.length });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
