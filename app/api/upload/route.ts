import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  // STAP 1: Lees de body als tekst. Dit voorkomt de "minus sign" crash
  // die specifiek bij iPhone/Vercel uploads gebeurt.
  const rawBody = await request.text();

  let body: HandleUploadBody;
  try {
    body = JSON.parse(rawBody);
  } catch (error) {
    // Als dit faalt (bijv. door de Vercel webhook), sturen we een 200.
    // Dit voorkomt dat de app van de klant vastloopt.
    return NextResponse.json({ status: "ok" });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await getServerSession(authOptions);
        if (!session?.user) throw new Error("Not authorized");

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/heic", // CRUCIAAL VOOR IPHONE
            "image/heif",
          ],
          maximumSizeInBytes: 120 * 1024 * 1024,
          tokenPayload: JSON.stringify({ userId: session.user.email }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload succesvol voor iPhone:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
