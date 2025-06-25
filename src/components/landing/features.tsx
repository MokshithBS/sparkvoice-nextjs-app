import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Bot, BrainCircuit, Globe, MicVocal, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: <MicVocal className="w-8 h-8 text-accent" />,
    title: "Real-time Voice Modulation",
    description: "Get instant feedback on your pitch, pace, and volume to keep your audience engaged.",
  },
  {
    icon: <Bot className="w-8 h-8 text-accent" />,
    title: "AI-Powered Coaching",
    description: "Our smart coach analyzes your speech and provides personalized tips to enhance your delivery.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-accent" />,
    title: "Sentiment Analysis",
    description: "Understand the emotional tone of your voice and learn to convey your message with the intended impact.",
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-accent" />,
    title: "Filler Word Reduction",
    description: "Identify and eliminate 'ums' and 'ahs' to sound more polished and confident.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-accent" />,
    title: "Privacy First",
    description: "Your voice data is yours. We use state-of-the-art security to keep your practice sessions private.",
  },
  {
    icon: <Globe className="w-8 h-8 text-accent" />,
    title: "Multi-Language Support",
    description: "Practice and improve your speaking skills in multiple languages with our global platform.",
  },
]

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Elevate Your Communication</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SparkVoice offers a suite of tools designed to make you a more confident and effective speaker.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
