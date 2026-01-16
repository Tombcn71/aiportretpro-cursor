import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string) => {
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
        try {
          const payload = JSON.parse(tokenPayload || "{}");
          console.log("Upload voltooid voor:", payload.userId, blob.url);
        } catch (error) {
          console.error("Payload error:", error);
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
