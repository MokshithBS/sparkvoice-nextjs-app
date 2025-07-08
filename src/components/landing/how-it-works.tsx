
'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Camera, Mic } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const steps = [
  {
    icon: <Camera className="w-10 h-10 text-accent" />,
    key: "snap",
  },
  {
    icon: <Mic className="w-10 h-10 text-accent" />,
    key: "say",
  },
  {
    icon: <Bot className="w-10 h-10 text-accent" />,
    key: "describe",
  }
]

export function HowItWorks() {
  const { t } = useLanguage();
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('landing.howItWorks.title')}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
             {t('landing.howItWorks.description')}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-1 md:grid-cols-3 lg:gap-12 mt-12">
          {steps.map((step) => (
            <Card key={step.key} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex flex-col items-center text-center pb-4">
                {step.icon}
                <CardTitle className="mt-4 font-headline text-2xl">{t(`landing.howItWorks.steps.${step.key}.title` as any)}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground flex flex-col flex-grow justify-between">
                <p className="mb-4">{t(`landing.howItWorks.steps.${step.key}.description` as any)}</p>
                <div className="aspect-[4/3] flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
                        {React.cloneElement(step.icon, {className: "w-24 h-24 text-primary/80"})}
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
