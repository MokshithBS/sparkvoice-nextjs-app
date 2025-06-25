import Image from "next/image"
import { PlayCircle } from "lucide-react"

export function VisualDemos() {
  return (
    <section id="demos" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">See SparkVoice in Action</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Watch a quick demo to see how our AI can transform your speaking skills in real-time.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-2xl">
            <Image
              src="https://placehold.co/1280x720.png"
              alt="Demo Video Thumbnail"
              width={1280}
              height={720}
              className="w-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="dashboard analytics"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white/80 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
