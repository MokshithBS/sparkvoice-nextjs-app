'use client';

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/context/language-context";

const testimonials = [
  {
    key: "radha",
    avatar: "RK",
    avatarUrl: "https://storage.googleapis.com/aip-dev-images-public/avatar-1.png",
    hint: "woman face",
  },
  {
    key: "suresh",
    avatar: "SP",
    avatarUrl: "https://storage.googleapis.com/aip-dev-images-public/avatar-2.png",
    hint: "man face",
  },
  {
    key: "gupta",
    avatar: "MG",
    avatarUrl: "https://storage.googleapis.com/aip-dev-images-public/avatar-3.png",
    hint: "man face",
  },
]

export function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('landing.testimonials.title')}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('landing.testimonials.description')}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
              <CardContent className="p-0">
                <blockquote className="text-lg font-semibold leading-snug text-card-foreground">
                  “{t(`landing.testimonials.items.${testimonial.key}.quote` as any)}”
                </blockquote>
              </CardContent>
              <div className="mt-6 flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatarUrl} data-ai-hint={testimonial.hint} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-card-foreground">{t(`landing.testimonials.items.${testimonial.key}.name` as any)}</p>
                  <p className="text-sm text-muted-foreground">{t(`landing.testimonials.items.${testimonial.key}.title` as any)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
