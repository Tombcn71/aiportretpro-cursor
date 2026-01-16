import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string) => {
        // Authenticate users before generating the token
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
          maximumSizeInBytes: 120 * 1024 * 1024, // 120MB
          tokenPayload: JSON.stringify({
            userId: session.user.email,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called when upload is complete
        console.log("blob upload completed", blob.url);

        try {
          const payload = JSON.parse(tokenPayload || "{}");
          console.log("Upload completed for user:", payload.userId);

          // Optional: Save to database if needed
          // await db.userUploads.create({
          //   userId: payload.userId,
          //   blobUrl: blob.url,
          //   uploadedAt: new Date()
          // });
        } catch (error) {
          console.error("Error in onUploadCompleted:", error);
          // Don't throw error here since upload already succeeded
        }
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
