"use client";

import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { upload } from "@vercel/blob/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import Image from "next/image";

interface WizardData {
  projectName: string;
  gender: string;
}

export default function UploadPage() {
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session) {
      console.log("User authenticated:", session.user?.email);
    }
  }, [status, router, session]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0077B5]"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status === "unauthenticated") {
    return null;
  }

  useEffect(() => {
    // Get wizard data from localStorage
    const data = JSON.parse(localStorage.getItem("wizardData") || "{}");
    if (!data.projectName || !data.gender) {
      router.push("/wizard/project-name");
      return;
    }
    setWizardData(data);
  }, [router]);

  // AANGEPAST VOOR IPHONE (HEIC SUPPORT)
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isHeic =
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif");
      const isSizeOk = file.size <= 120 * 1024 * 1024;

      return (isImage || isHeic) && isSizeOk;
    });

    setUploadedPhotos((prev) => [...prev, ...newFiles].slice(0, 10));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContinue = async () => {
    if (uploadedPhotos.length < 4 || !wizardData) return;
    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload photos directly to Vercel Blob via client-side upload
      const uploadPromises = uploadedPhotos.map(async (photo, index) => {
        try {
          const blob = await upload(photo.name, photo, {
            access: "public",
            handleUploadUrl: "/api/upload",
          });

          // Update progress
          setUploadProgress(
            Math.round(((index + 1) / uploadedPhotos.length) * 100)
          );

          return blob.url;
        } catch (error) {
          console.error(`Error uploading ${photo.name}:`, error);
          throw new Error(`Upload mislukt voor ${photo.name}`);
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // Check if all uploads succeeded
      if (uploadedUrls.some((url) => !url)) {
        throw new Error("Sommige foto's konden niet worden geüpload");
      }

      // Create project with default pack 928 (portetfotos m/v)
      const response = await fetch("/api/projects/create-with-pack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: wizardData.projectName,
          gender: wizardData.gender,
          selectedPackId: "928",
          uploadedPhotos: uploadedUrls,
        }),
      });

      const result = await response.json().catch(() => ({
        message: "Onbekende fout bij het parsen van de response",
      }));

      if (!response.ok) {
        throw new Error(
          result.message || result.error || `Server fout: ${response.status}`
        );
      }

      if (result.projectId) {
        // Store project data for payment page
        localStorage.setItem(
          "pendingProject",
          JSON.stringify({
            projectId: result.projectId,
            projectName: wizardData.projectName,
            gender: wizardData.gender,
            uploadedPhotos: uploadedUrls,
          })
        );
        // Clear wizard data
        localStorage.removeItem("wizardData");
        router.push(`/generate/${result.projectId}`);
      } else if (result.message) {
        throw new Error(result.message);
      } else {
        console.warn(
          "Astria API failed, but continuing to pricing with uploaded photos"
        );
        localStorage.setItem(
          "pendingProject",
          JSON.stringify({
            projectId: "temp_" + Date.now(),
            projectName: wizardData.projectName,
            gender: wizardData.gender,
            uploadedPhotos: uploadedUrls,
          })
        );
        localStorage.removeItem("wizardData");
        router.push(`/generate/temp`);
      }
    } catch (error) {
      console.error("Upload error details:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Er is een fout opgetreden";

      let userMessage = "Er is een fout opgetreden. Probeer het opnieuw.";
      if (errorMessage.includes("credits")) {
        userMessage =
          "Je hebt niet genoeg credits. Koop eerst credits om door te gaan.";
      } else if (
        errorMessage.includes("Unauthorized") ||
        errorMessage.includes("Not authorized")
      ) {
        userMessage =
          "Je bent niet ingelogd. Log opnieuw in en probeer het opnieuw.";
      } else if (errorMessage.includes("Upload")) {
        userMessage =
          "Upload mislukt. Controleer je internetverbinding en probeer het opnieuw.";
      } else if (errorMessage) {
        userMessage = errorMessage;
      }

      alert(userMessage);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  if (!wizardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0077B5]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <ProgressBar currentStep={3} totalSteps={3} className="bg-blue-900" />
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upload je foto's</CardTitle>
            <p className="text-gray-600">
              Upload minimaal 4 foto's van hoge kwaliteit voor het beste
              resultaat
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Camera className="h-8 w-8 text-[#0077B5]" />
              <div>
                <h3 className="text-lg font-semibold">Foto Richtlijnen</h3>
                <p className="text-gray-600 text-sm">
                  Foto's met verschillende achtergronden met je gezicht naar de
                  camera, vanaf je schouders of je middel. geen hoeden of
                  zonnebrillen.
                </p>
              </div>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors relative">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <Button className="bg-blue-900 hover:bg-950 text-white mb-4">
                <Upload className="h-4 w-4 mr-2" />
                Selecteer Foto's
              </Button>
              <p className="text-gray-600">
                of{" "}
                <span className="text-blue-900 font-medium">
                  sleep en zet neer
                </span>{" "}
                je foto's hier
              </p>
              <p className="text-sm text-gray-500 mt-2">
                PNG, JPG, HEIC, WEBP tot 120MB
              </p>
              <input
                type="file"
                multiple
                accept="image/*,.heic,.HEIC,.heif,.HEIF"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Geüploade Foto's</h3>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    uploadedPhotos.length >= 4 ? "bg-green-500" : "bg-gray-300"
                  }`}></div>
                <span className="text-sm font-medium">
                  {uploadedPhotos.length} van 10
                </span>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                {uploadedPhotos.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Nog geen foto's geüpload
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {uploadedPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={
                              URL.createObjectURL(photo) || "/placeholder.svg"
                            }
                            alt={`Upload ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {uploading && uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uploaden...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-900 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button
                onClick={handleContinue}
                disabled={uploadedPhotos.length < 4 || uploading}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                {uploading
                  ? "Portetfotos worden gemaakt..."
                  : "Genereer 40 Professionele Portetfotos"}
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="w-full"
                disabled={uploading}>
                ← Terug
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
