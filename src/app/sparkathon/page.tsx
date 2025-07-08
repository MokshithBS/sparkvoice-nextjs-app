
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Film, Lightbulb, Package, Target, Youtube } from 'lucide-react';
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
                        For over 500 million people in India’s smaller towns and rural areas, the promise of e-commerce remains out of reach. The problem isn’t a lack of ambition; it’s a series of deeply human barriers.
                    </p>
                    <p>
                        This includes everyone from a grandmother in a village who handwrites her weekly grocery list in Kannada, to a first-time internet user who finds complex apps intimidating, to a busy parent who simply wants to use a voice note to order. They face a digital world built on a different set of assumptions—one that requires English proficiency, digital literacy, and comfort with multi-step checkouts.
                    </p>
                    <p>
                        This friction occurs every single day, creating a digital divide that prevents a massive segment of the population from accessing the convenience, variety, and savings of online retail. At the same time, local kirana stores struggle to grow, burdened by the manual effort of transcribing these very same handwritten lists and spoken orders.
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
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">We speak human:</strong> Users can snap a photo of a list, speak in their native tongue (including Hinglish), or describe a need like "a birthday party for 10 kids." Our AI instantly translates this intent into a perfectly curated cart.
                        </li>
                        <li>
                            <strong className="text-foreground">We build trust:</strong> Our AI-powered Price Match feature scans any physical bill and shows users exactly how much they save, making Walmart the most transparent and trusted option.
                        </li>
                        <li>
                            <strong className="text-foreground">We foster community:</strong> With SparkHives, neighbours can create shared carts, vote on bulk buys, and even organize social-good contributions, transforming solitary shopping into a collective, rewarding experience.
                        </li>
                    </ul>
                   <Separator className="my-4"/>
                   <p className="text-sm">
                    <strong className="text-foreground">Tech Stack:</strong> We've built SparkVoice on a modern, scalable foundation using Next.js (with App Router and Server Components for performance), React, Tailwind CSS for styling, and ShadCN for our UI library. The core intelligence is powered by Google's Genkit, allowing us to rapidly build and deploy sophisticated multimodal AI flows.
                   </p>
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
