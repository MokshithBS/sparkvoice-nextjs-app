import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Languages, ListChecks, Phone, Store, Zap } from "lucide-react"

const features = [
  {
    icon: <Zap className="w-8 h-8 text-accent" />,
    title: "Zero-Friction Entry",
    description: "Just speak or snap your list. No typing, no browsing, no complex menus.",
  },
  {
    icon: <ListChecks className="w-8 h-8 text-accent" />,
    title: "List Intelligence",
    description: "Our AI reads messy handwriting, understands quantities, and auto-builds your cart.",
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-accent" />,
    title: "Brand Smartness",
    description: "Remembers your favorite brands and defaults to your past purchases for a personalized cart.",
  },
  {
    icon: <Languages className="w-8 h-8 text-accent" />,
    title: "Multilingual & Multimodal",
    description: "Works in your language across voice, text, image, WhatsApp, and even simple phone calls.",
  },
  {
    icon: <Phone className="w-8 h-8 text-accent" />,
    title: "Feature-Phone Friendly",
    description: "No smartphone? No problem. Place orders easily with our IVR system via a simple call.",
  },
  {
    icon: <Store className="w-8 h-8 text-accent" />,
    title: "Real-Time Retail Sync",
    description: "Your orders are sent instantly to your local kirana store, ready for delivery.",
  },
]

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">What Makes SparkVoice Powerful</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Smarter Way to Shop</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-driven platform is designed to understand you, not the other way around.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex flex-col items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4 font-headline text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground flex-grow">
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
