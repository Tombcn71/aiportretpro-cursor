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

        // Log the incoming file for debugging
        console.log(`📸 Incoming upload: ${pathname}`);

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
            // HEIC/HEIF formats (iPhone photos)
            "image/heic",
            "image/heif",
            "image/heic-sequence",
            "image/heif-sequence",
            // Empty MIME type (iOS Safari sometimes sends HEIC with no MIME type)
            "",
            // Catch-all for any image type
            "application/octet-stream", // Sometimes sent by iOS for HEIC
          ],
          maximumSizeInBytes: 120 * 1024 * 1024, // 120MB
          tokenPayload: JSON.stringify({
            userId: session.user.email,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called when upload is complete
        console.log("✅ Blob upload completed:", blob.url);

        try {
          const payload = JSON.parse(tokenPayload || "{}");
          console.log("📧 Upload completed for user:", payload.userId);

          // Optional: Save to database if needed
          // await db.userUploads.create({
          //   userId: payload.userId,
          //   blobUrl: blob.url,
          //   uploadedAt: new Date()
          // });
        } catch (error) {
          console.error("❌ Error in onUploadCompleted:", error);
          // Don't throw error here since upload already succeeded
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("❌ Upload handler error:", error);

    // More detailed error response
    return NextResponse.json(
      {
        error: (error as Error).message,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 400 }
    );
  }
}
