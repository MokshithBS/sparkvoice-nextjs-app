import { Faq } from '@/components/landing/faq';
import { Features } from '@/components/landing/features';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Problem } from '@/components/landing/problem';
import { Testimonials } from '@/components/landing/testimonials';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background font-body">
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
