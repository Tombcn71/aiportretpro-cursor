import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GEEN edge runtime gebruiken, dat veroorzaakt je build error
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string) => {
        // Gebruik de standaard session check
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
            "image/heic",
          ],
          maximumSizeInBytes: 120 * 1024 * 1024,
          tokenPayload: JSON.stringify({
            userId: session.user.email,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("Upload completed", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    // Cruciaal: We loggen de error maar crashen de response niet met een 500
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
