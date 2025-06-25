import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Amplify Your Voice with AI
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl lg:mx-0">
              Transform your communication with SparkVoice. Get real-time feedback and AI-powered coaching to speak with confidence and impact.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-start justify-center">
              <Link href="#" prefetch={false}>
                <Button size="lg" style={{ backgroundColor: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>Start Free Trial</Button>
              </Link>
              <Link href="#" prefetch={false}>
                <Button variant="outline" size="lg">
                  Request a Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Hero"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
              data-ai-hint="voice ai"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
