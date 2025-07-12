
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context";
import { Bot, HeartPulse, Leaf, Receipt, ScanSearch, Sparkles, Users2 } from "lucide-react"

const featureItems = [
  {
    icon: <Sparkles className="w-8 h-8 text-accent" />,
    key: "multimodalInput",
  },
  {
    icon: <Bot className="w-8 h-8 text-accent" />,
    key: "aiAssistant",
  },
  {
    icon: <Users2 className="w-8 h-8 text-accent" />,
    key: "sparkHives",
  },
  {
    icon: <ScanSearch className="w-8 h-8 text-accent" />,
    key: "pantryManagement",
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-accent" />,
    key: "sparkDiet",
  },
  {
    icon: <Leaf className="w-8 h-8 text-accent" />,
    key: "sparkGreen",
  },
  {
    icon: <Receipt className="w-8 h-8 text-accent" />,
    key: "priceMatch",
  },
]

export function Features() {
  const { t } = useLanguage();
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">{t('landing.features.tagline')}</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('landing.features.title')}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
             {t('landing.features.description')}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
          {featureItems.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex flex-col items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4 font-headline text-2xl">{t(`landing.features.items.${feature.key}.title` as any)}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground flex-grow">
                <p>{t(`landing.features.items.${feature.key}.description` as any)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
