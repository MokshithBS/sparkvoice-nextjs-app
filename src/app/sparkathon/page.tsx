
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
                <h2 className="text-4xl font-extrabold tracking-tight text-primary font-headline">SparkVoice</h2>
                <p className="text-2xl font-bold tracking-tight">Speak It or Snap It. Just Spark It.</p>
                <p className="text-lg text-muted-foreground">Bridging India's Digital Divide, One Conversation at a Time.</p>
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
                        SparkVoice is a multimodal AI that turns everyday human intent—a photo of a handwritten list, a voice note in a native dialect, or a simple thought—into a complete, delivered shopping cart.
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
                        Walmart’s next phase of growth in India depends on reaching the 500 million consumers in Tier 2/3 cities and rural areas. Yet, conventional e-commerce has hit a wall. The core problem isn't technology; it's that the current digital interface is fundamentally misaligned with how a massive part of India lives and thinks.
                    </p>
                    <p>
                        We see this every day: a grandmother in a village who only trusts her handwritten Kannada grocery list; a first-time internet user intimidated by complex apps; a busy parent who just wants to send a voice note for the week's shopping. These aren't edge cases; they represent the heart of the next billion users.
                    </p>
                    <p className="font-bold text-foreground">
                        This is Walmart's key challenge: The digital divide isn't about access to phones, it's about a mismatch in interaction. This daily friction prevents half a billion people from accessing Walmart's ecosystem, limiting market penetration and leaving immense value on the table.
                    </p>
                    <p>
                        At the same time, local kirana stores—Walmart's crucial last-mile partners—are burdened by the same manual friction, transcribing these very same lists and spoken orders, which stifles their efficiency and growth.
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
                    SparkVoice acts as a compassionate, intelligent bridge across this divide. Instead of forcing users to learn a new system, our platform understands them in the most natural ways possible. It’s not just an app; it’s a full-stack conversational commerce ecosystem.
                   </p>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 pt-1">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground">A Truly Multimodal Shopping Experience</h4>
                                <p>We eliminate the tyranny of the search bar. Users can snap a photo of a handwritten list in any language, record a voice note in a regional dialect, or simply type a thought. Our AI comprehends the intent and instantly builds a cart.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 pt-1">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground">A Suite of Hyper-Personalized AI Assistants</h4>
                                <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                                    <li><strong>SparkCart AI:</strong> A family preparing for a festival can simply say, “I need items for a Diwali pooja,” and our AI curates a cart with everything from diyas and sweets to fresh flowers.</li>
                                    <li><strong>SparkSaver:</strong> Users set a weekly budget like, “₹1500 for my family of four,” and our AI builds the most value-for-money cart, prioritizing essentials and sale items to help them manage expenses.</li>
                                    <li><strong>AI Pantry Management:</strong> A quick snap of a kitchen shelf allows our AI to identify what's running low—like the last bit of tea powder or a nearly empty jar of pickles—and suggest a restock list.</li>
                                    <li><strong>SparkGreen:</strong> At checkout, users are gently nudged with eco-friendly alternatives, like swapping plastic detergent bags for refill pouches, and can offset their delivery's carbon footprint.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 pt-1">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground">Trust Through Radical Transparency</h4>
                                <p>Our <strong>Instant Price-Match</strong> feature allows users to scan any physical kirana bill and see a line-by-line comparison with Walmart's prices, proving the value of shopping online and building unshakable customer loyalty.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 pt-1">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground">Community Commerce with SparkHives</h4>
                                <p>We transform shopping from a solitary task into a collective activity. <strong>Hives</strong> enable neighbors to create shared carts, run polls on bulk buys (like which brand of rice to get for the building), split payments effortlessly, and earn rewards for social contributions.</p>
                            </div>
                        </div>
                    </div>
                   <Separator className="my-6"/>
                    <div>
                        <h4 className="font-bold text-foreground text-lg mb-2">Our Technology Stack</h4>
                        <p className="text-sm mb-4">
                            Built from the ground up for performance, scalability, and rapid AI integration, our stack is modern and robust.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li><strong>Core Framework:</strong> Next.js 15 utilizing the App Router, Server Components, and Turbopack for a high-performance, server-first architecture.</li>
                            <li><strong>Frontend:</strong> React 18 with TypeScript for building a type-safe, component-based, and reactive user interface.</li>
                            <li><strong>UI & Styling:</strong> A combination of ShadCN UI for our accessible component library and Tailwind CSS for rapid, utility-first styling.</li>
                            <li><strong>AI Orchestration & Backend:</strong> We use Google's Genkit, an open-source framework, to build, deploy, and monitor our production-grade AI flows. This allows us to chain prompts, integrate tools, and manage complex agentic logic reliably.</li>
                            <li><strong>AI Models:</strong>
                                <ul className="list-['-_'] pl-5 mt-1">
                                    <li><strong>Gemini 2.0 Flash:</strong> For our core multimodal reasoning, handling complex vision tasks (list & bill OCR), natural language understanding (contextual carts, recipe generation), and structured data output.</li>
                                    <li><strong>Gemini 2.0 Flash Image Generation:</strong> Used for creative features like generating user avatars.</li>
                                    <li><strong>Gemini 2.5 Flash TTS:</strong> Powers our text-to-speech capabilities, providing voice feedback in our conversational flows.</li>
                                </ul>
                            </li>
                        </ul>
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
