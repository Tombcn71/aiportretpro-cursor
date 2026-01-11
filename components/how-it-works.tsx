import { Camera, Sparkles, Zap } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="px-4 pt-0 pb-16 mb-24 md:mb-32 ">
      {" "}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Hoe het werkt
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl  bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8  text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">1. Upload 4 foto's</h3>
            <p className="text-muted-foreground">
              Upload gewone selfies of casual foto's
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl  bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8  text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">2. AI gaat aan het werk</h3>
            <p className="text-muted-foreground">
              Onze AI traint je model. Klaar in 15 min.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl  bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8  text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">3. Download & gebruik</h3>
            <p className="text-muted-foreground">
              Kies je favorieten voor LinkedIn, je CV of je website.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
