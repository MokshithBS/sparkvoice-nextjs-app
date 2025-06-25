import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, MicVocal } from "lucide-react"

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.48 1.34 4.94L2.05 22l5.3-1.42c1.4.78 3.03 1.21 4.69 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zM17.29 15.2c-.28-.14-1.66-.82-1.92-.91s-.44-.14-.63.14-.73.91-.89 1.1s-.32.21-.59.07c-.28-.14-1.17-.43-2.23-1.38s-1.7-1.58-1.9-1.85c-.2-.28-.02-.43.12-.57s.28-.32.41-.48c.14-.14.19-.24.28-.41.1-.17.05-.31-.02-.45s-.63-1.51-.86-2.07c-.23-.56-.46-.48-.63-.49-.17-.01-.36-.01-.54-.01s-.48.07-.73.35c-.24.28-.93.9-1.15 2.19s-1.18 2.55-.93 2.72c.24.17.48.24 1.77 1.48 1.29 1.24 1.81 1.58 2.7 2.03.89.45 1.6.49 2.2.42.6-.07 1.66-.68 1.9-1.32.23-.64.23-1.18.16-1.32c-.07-.14-.26-.21-.54-.35z" />
  </svg>
)

const steps = [
  {
    icon: <Camera className="w-10 h-10 text-accent" />,
    title: "1. Scan Your List",
    description: "Upload a photo of your handwritten grocery slip. Our AI reads it line by line.",
    image: "https://placehold.co/400x300.png",
    hint: "handwritten list scan"
  },
  {
    icon: <MicVocal className="w-10 h-10 text-accent" />,
    title: "2. Speak Your Order",
    description: "Simply talk in your native language. SparkVoice understands and adds items to your cart.",
    image: "https://placehold.co/400x300.png",
    hint: "voice command phone"
  },
  {
    icon: <WhatsAppIcon className="w-10 h-10 text-accent" />,
    title: "3. Chat on WhatsApp",
    description: "Send a text, image, or voice note to our number. We'll reply with a pre-filled cart.",
    image: "https://placehold.co/400x300.png",
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
              No app install required. No complicated menus. Start shopping in seconds.
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
                    className="rounded-lg shadow-md"
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
