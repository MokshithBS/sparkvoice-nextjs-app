
'use client';

import { ShoppingCart, Twitter, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full bg-card text-card-foreground border-t">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="#" className="flex items-center space-x-2" prefetch={false}>
              <ShoppingCart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline">SparkVoice</span>
            </Link>
            <p className="text-muted-foreground">
              {t('landing.footer.tagline')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div className="space-y-4">
              <h4 className="font-semibold font-headline">{t('landing.footer.product.title')}</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>{t('landing.footer.product.features')}</Link></li>
                <li><Link href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>{t('landing.footer.product.testimonials')}</Link></li>
                <li><Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>{t('landing.footer.product.faq')}</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold font-headline">{t('landing.footer.company.title')}</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>{t('landing.footer.company.contact')}</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>{t('landing.footer.company.careers')}</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold font-headline">{t('landing.footer.legal.title')}</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>{t('landing.footer.legal.privacy')}</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>{t('landing.footer.legal.terms')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">{t('landing.footer.copyright')}</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
