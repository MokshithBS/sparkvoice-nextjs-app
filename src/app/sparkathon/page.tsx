
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Film, Lightbulb, Package, Target, Youtube, CheckCircle, BrainCircuit, Handshake, Globe, TrendingUp, Users, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from "@/components/ui/aspect-ratio"


export default function SparkathonPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-muted/40 font-body">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                <ArrowLeft />
                <span className="sr-only">Back to Home</span>
                </Link>
            </Button>
            <h1 className="text-xl font-bold font-headline text-center">
                Walmart Sparkathon 2025 Submission
            </h1>
            <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-3xl space-y-10">

            <div className="text-center space-y-2">
                <h2 className="text-4xl font-extrabold tracking-tight text-primary font-headline">SparkVoice: Your list, your voice, your cart — effortlessly.</h2>
                <p className="text-lg text-muted-foreground">Empowering every Indian to shop without barriers.</p>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Lightbulb className="w-8 h-8 text-primary"/>
                        <CardTitle className="text-2xl font-headline">Our Idea</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium leading-relaxed">
                        SparkVoice is India's most intelligent, multimodal AI, purpose-built to unlock digital commerce for the next 500 million value-first shoppers. It effortlessly transforms everyday human intent—a photo of a handwritten grocery list, a voice note in a native dialect, or a simple thought—into a complete, value-optimized, delivered shopping cart. We turn the habit of saving ₹5 into seamless reality, proving Walmart's Everyday Low Price commitment at every step.
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Target className="w-8 h-8 text-destructive"/>
                        <CardTitle className="text-2xl font-headline">The Problem We're Solving</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-base text-muted-foreground leading-relaxed">
                   <p>
                        Walmart’s next phase of growth in India depends on reaching the 500 million consumers in Tier 2/3 cities and rural areas. But conventional e-commerce has stalled—not because of poor technology, but because it overlooks how India truly shops and thinks.
                    </p>
                    <p>
                        In India, saving ₹5 isn’t just a deal — it’s a habit, a mindset, and sometimes, a need. We see this value-first psychology daily: a father habitually comparing kirana prices; a student walking to a farther store for cheaper books; a mother bargaining for five minutes to save five rupees. Convenience is secondary to value – this is the real shopping psychology across a massive part of India.
                    </p>
                    <p>
                        Digital apps today are either too complex or too disconnected from these deeply ingrained behaviors. We see this gap daily:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>A mother in a village still trusts her handwritten shopping list.</li>
                        <li>A first-time internet user finds filters and carts confusing.</li>
                        <li>A busy parent prefers to speak a quick voice note than tap 20 times.</li>
                    </ul>
                    <p>
                        These aren’t edge cases—they are the average Indian shopper, representing the heart of the next billion users.
                    </p>
                    <p>
                        But this friction isn’t just digital for consumers. Local kirana stores—Walmart’s crucial last-mile lifeline—still manually transcribe these same lists and spoken orders, wasting precious time and effort. Worse, there’s often no real-time price clarity, which directly breaks the trust chain with both the consumer and the store.
                    </p>

                    <Separator className="my-6"/>

                    <h3 className="text-xl font-bold text-foreground">Walmart India's Focus: The Everyday Low Price Engine</h3>
                    <p>
                        Walmart U.S. built its empire by guaranteeing Everyday Low Prices, backed by relentless real-time competitive price monitoring and vendor negotiations. To achieve the same dominance in India, the challenge is deeper:
                    </p>
                     <ul className="list-disc pl-5 space-y-2">
                        <li>Prices change weekly—even daily—in crucial categories like fruits, staples, and perishables.</li>
                        <li>Customers expect hyper-local price relevance, specific to their neighborhood.</li>
                        <li>Trust only builds when you can show savings, not just say it.</li>
                    </ul>
                    <p className="font-bold text-foreground">
                        SparkVoice isn't just about smarter shopping; it's about fundamentally proving to every Indian father, mother, student, and kirana shop that Walmart offers undeniable, real value. If Walmart wants to win the next 500 million consumers, price intelligence isn’t a feature—it’s the absolute foundation.
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-green-600"/>
                        <CardTitle className="text-2xl font-headline">How We Solve It: SparkVoice</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-base text-muted-foreground leading-relaxed">
                   <p>
                    SparkVoice isn't just an app; it's a compassionate, intelligent bridge designed to connect every Indian consumer to digital commerce. We've built a full-stack conversational commerce ecosystem that understands users in the most natural ways possible, without forcing them to adapt to complex systems.
                   </p>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-foreground text-lg">A Truly Multimodal Shopping Experience</h4>
                            <p>We eliminate the "tyranny of the search bar." With SparkVoice, users can simply snap a photo of a handwritten list in any language, record a voice note in a regional dialect, or just type a thought. Our AI instantly comprehends their intent and builds a cart.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground text-lg">A Suite of Hyper-Personalized AI Assistants</h4>
                             <p className="mb-2">Our AI powers a range of intelligent tools that adapt to individual needs:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                                <li><strong>Contextual AI Assistant (SparkCart AI):</strong> A family preparing for a festival can simply say, "I need items for a Diwali pooja," and our AI curates a cart with everything from diyas and sweets to fresh flowers.</li>
                                <li><strong>SparkSaver (Value Cart):</strong> Users set a weekly budget like, "₹1500 for my family of four," and our AI builds the most value-for-money cart, prioritizing essentials and sale items to help them manage expenses.</li>
                                <li><strong>AI Pantry Management:</strong> A quick snap of a kitchen shelf allows our AI to identify what's running low—like the last bit of tea powder or a nearly empty jar of pickles—and suggest a restock list for automated subscriptions and deal alerts.</li>
                                <li><strong>SparkDiet Planner:</strong> Get a personalized grocery cart based on health goals, or snap a photo of a meal to instantly analyze its nutritional content.</li>
                                <li><strong>SparkGreen Sustainability:</strong> At checkout, users are gently nudged with eco-friendly alternatives, like swapping plastic detergent bags for refill pouches, and can choose carbon-neutral delivery options to offset their footprint.</li>
                            </ul>
                        </div>
                    </div>
                   <Separator className="my-6"/>
                    <div>
                        <p className="font-semibold text-foreground mb-4">
                            At Walmart, the promise of ‘Everyday Low Prices’ is backed by real-time data, not just marketing. We bring that same trust-building engine to India through SparkVoice’s price intelligence tools.
                        </p>
                        <div className="space-y-4">
                            <h4 className="font-bold text-foreground">🔍 Instant Price Match</h4>
                            <p>Users can scan a local kirana bill to see a line-by-line comparison with Walmart’s prices. We highlight exact savings, empowering users to make informed, confident decisions. This feature directly tackles the price trust barrier in Bharat.</p>
                            
                            <h4 className="font-bold text-foreground">🛡️ Instant Price Defender</h4>
                             <p>Behind the scenes, our system uses a live competitive price-checking engine to continuously compare Walmart’s prices with:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                <li>Local kirana rates (via scanned bills and market APIs)</li>
                                <li>Regional e-commerce platforms</li>
                            </ul>
                            <p>If we find a better deal, we automatically match or beat it before checkout — no user effort needed.</p>
                            
                            <h4 className="font-bold text-foreground">💰 Savings Vault</h4>
                            <p>Every price match and smart purchase adds to the Savings Vault — a visual tracker of how much a user has saved over time. This reinforces financial confidence, especially among first-time digital shoppers.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                     <div className="flex items-center gap-3">
                        <Rocket className="w-8 h-8 text-primary"/>
                        <CardTitle className="text-2xl font-headline">Technical Stack</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        We've built SparkVoice on a modern, scalable, and AI-native technology stack to ensure a robust and fast user experience.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-bold">Next.js & React</h4>
                            <p className="text-sm text-muted-foreground">For a fast, server-rendered frontend.</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-bold">Google's Genkit</h4>
                            <p className="text-sm text-muted-foreground">Powers all our generative AI features.</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-bold">Tailwind CSS</h4>
                            <p className="text-sm text-muted-foreground">For rapid and responsive UI development.</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-bold">ShadCN UI</h4>
                            <p className="text-sm text-muted-foreground">For accessible and modern components.</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-bold">TypeScript</h4>
                            <p className="text-sm text-muted-foreground">For robust and type-safe code.</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-bold">Firebase</h4>
                            <p className="text-sm text-muted-foreground">For scalable hosting and deployment.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>


             <Card className="shadow-lg">
                <CardHeader>
                     <div className="flex items-center gap-3">
                        <Film className="w-8 h-8 text-accent"/>
                        <CardTitle className="text-2xl font-headline">2-Minute Working Demo</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        Watch our solution in action, demonstrating how a user can go from a simple voice note to a complete, optimized shopping cart in seconds.
                    </p>
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden border">
                        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="block w-full h-full group">
                            <Image
                                src="https://placehold.co/1280x720.png"
                                alt="Video Demo Placeholder"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint="youtube play button"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <Youtube className="w-16 h-16 text-white/80 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
                            </div>
                        </Link>
                    </AspectRatio>
                </CardContent>
            </Card>

        </div>
      </main>
    </div>
  );
}
