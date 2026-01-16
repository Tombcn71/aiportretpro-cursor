import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// DIT IS DE FIX: Forceert de Edge runtime die wel met de iPhone-data om kan gaan
export const runtime = "edge";

export async function POST(request: Request): Promise<NextResponse> {
  // We gebruiken weer .json(), de 'edge' runtime voorkomt hier de crash
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
          throw new Error("Not authorized");
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/heic", // iPhone support
          ],
          maximumSizeInBytes: 120 * 1024 * 1024,
          tokenPayload: JSON.stringify({
            userId: session.user.email,
          }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload voltooid:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
