import { Camera, Download, Sparkles, Zap } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="px-4 pt-0 -mt-14 pb-16 mb-24 md:mb-32  ">
      {" "}
      <div className="max-w-6xl mx-auto">
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-4 mb-4">
          Zo werkt het{" "}
        </p>
        <p className="text-lg text-[#374151] text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          Even wat foto's uploaden, dat is alles{" "}
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-xl bg-white border border-blue-200 flex items-center justify-center mx-auto shadow-sm">
              <Camera className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold">1. Upload 4 foto's</h3>
            <p className="text-muted-foreground">
              Upload gewone selfies of casual foto's
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-xl bg-white border border-blue-200 flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold">2. AI gaat aan het werk</h3>
            <p className="text-muted-foreground">
              Onze AI traint je model. Klaar in 15 min.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-xl bg-white border border-blue-200 flex items-center justify-center mx-auto shadow-sm">
              <Download className="w-8 h-8 text-blue-900" />
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
