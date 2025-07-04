import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Mic } from "lucide-react"
import { WhatsAppIcon } from "../icons/whatsapp-icon"

const steps = [
  {
    icon: <Camera className="w-10 h-10 text-accent" />,
    title: "1. Snap Your List",
    description: "Upload a photo of a handwritten chit. Our AI reads and recognizes the items using cutting-edge OCR and NLP.",
    image: "https://storage.googleapis.com/aip-dev-images-public/spark-voice-scan.png",
    hint: "handwritten list scan"
  },
  {
    icon: <Mic className="w-10 h-10 text-accent" />,
    title: "2. Say Your List",
    description: "Speak your grocery list in any Indian language. SparkVoice transcribes, understands, and converts it into a cart.",
    image: "https://storage.googleapis.com/aip-dev-images-public/spark-voice-speak.png",
    hint: "voice command phone"
  },
  {
    icon: <WhatsAppIcon className="w-10 h-10 text-accent" />,
    title: "3. Chat on WhatsApp",
    description: "Send a text, image, or voice note. We'll reply with a pre-filled cart, ready for you to confirm.",
    image: "https://storage.googleapis.com/aip-dev-images-public/spark-voice-chat.png",
    hint: "whatsapp chat phone"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">3 Effortless Ways to Shop</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
             From speaking your list to chatting on WhatsApp, your shopping is just a command away.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-1 md:grid-cols-3 lg:gap-12 mt-12">
          {steps.map((step) => (
            <Card key={step.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex flex-col items-center text-center pb-4">
                {step.icon}
                <CardTitle className="mt-4 font-headline text-2xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground flex flex-col flex-grow justify-between">
                <p className="mb-4">{step.description}</p>
                 <Image
                    src={step.image}
                    alt={step.title}
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md object-cover aspect-[4/3]"
                    data-ai-hint={step.hint}
                  />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
