
'use client';

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "../icons/whatsapp-icon"
import { Phone } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Hero() {
  const { t } = useLanguage();
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              {t('landing.hero.title')}
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl lg:mx-0">
              {t('landing.hero.description')}
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-start justify-center flex-wrap">
              <Link href="/store" prefetch={false}>
                <Button size="lg" style={{ backgroundColor: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>{t('landing.hero.getStartedButton')}</Button>
              </Link>
              <Link href="tel:+910000000000" prefetch={false}>
                <Button variant="outline" size="lg">
                  <Phone className="w-5 h-5" />
                  {t('landing.header.orderByCall')}
                </Button>
              </Link>
              <Link href="https://wa.me/910000000000?text=Hi%2C%20I'd%20like%20to%20place%20an%20order%20with%20SparkVoice" target="_blank" prefetch={false}>
                <Button variant="outline" size="lg">
                  <WhatsAppIcon className="w-5 h-5" />
                  {t('landing.header.orderOnWhatsApp')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://storage.googleapis.com/aip-dev-images-public/spark-voice-hero.png"
              alt="Hero"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
              data-ai-hint="handwritten list phone"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
