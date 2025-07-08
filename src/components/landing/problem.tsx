'use client';

import { useLanguage } from "@/context/language-context";
import { CheckCircle, HeartHandshake, PackageSplit, SearchX, MessageSquareWarning } from "lucide-react";

const problems = [
    {
        icon: <MessageSquareWarning className="w-8 h-8 text-destructive" />,
        title: 'Digital & language barriers',
        description: [
            'Many first-time internet users struggle to navigate complex UIs, search in English, or complete multi-step checkouts.',
            'Handwritten lists or voice notes in regional tongues go unrecognized by conventional apps.'
        ]
    },
    {
        icon: <SearchX className="w-8 h-8 text-destructive" />,
        title: 'Discovery overload',
        description: [
            'With millions of SKUs across hundreds of categories, shoppers waste time scrolling, filtering and comparing—often settling for second-best.',
            'Price transparency is low, and hidden delivery or convenience fees erode trust.'
        ]
    },
    {
        icon: <PackageSplit className="w-8 h-8 text-destructive" />,
        title: 'Fragmented fulfillment',
        description: [
            'Quick-commerce (“anytime, under 30 min”) lives in a different silo from regular e-commerce (“next-day” or subscription), forcing customers to juggle multiple apps.',
            'No single platform ties together subscriptions, one-off orders and community group buys.'
        ]
    },
    {
        icon: <HeartHandshake className="w-8 h-8 text-destructive" />,
        title: 'Lack of social & sustainability signals',
        description: [
            'Shopping is often a solitary, opaque process; there’s no easy way to pool demand, crowdsource choices or earn rewards for buying green.',
            'Environmentally conscious options remain buried under mainstream catalogs.'
        ]
    },
]

const breakthroughs = [
    'No app-learning curve (snap, speak, type)',
    'Guided discovery (intelligent “build my cart”)',
    'Unified fulfillment (instant, same-day, subscription & bulk buys)',
    'Trust through transparency (price-match scans)',
    'Collective power (group orders + social rewards)',
    'Sustainable nudges (carbon-neutral choices by default)',
]

export function Problem() {
    const { t } = useLanguage();
    return (
        <section id="problem" className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                         <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">{t('landing.problem.tagline')}</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('landing.problem.title')}</h2>
                    </div>
                </div>

                <div className="mt-8 max-w-3xl mx-auto">
                    <blockquote className="text-center text-xl lg:text-2xl font-medium text-foreground border-l-4 border-primary pl-4 italic">
                        How do we collapse a fragmented, friction-filled shopping journey into one seamless, trustworthy, hyper-personalized experience—regardless of language, literacy or location?
                    </blockquote>
                </div>
                
                <div className="mt-16">
                    <h3 className="text-3xl font-bold text-center mb-10 font-headline">Why This Matters</h3>
                    <div className="mx-auto grid max-w-5xl items-start gap-x-8 gap-y-10 sm:grid-cols-2">
                        {problems.map((problem, index) => (
                           <div key={index} className="flex gap-4 items-start">
                                <div className="p-3 bg-destructive/10 rounded-full h-fit">
                                    {problem.icon}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">{problem.title}</h4>
                                     <ul className="text-muted-foreground list-disc pl-5 space-y-2">
                                        {problem.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                    </ul>
                                </div>
                           </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-20 text-center bg-muted/50 py-12 rounded-xl">
                    <h3 className="text-3xl font-bold mb-4 font-headline">The Breakthrough</h3>
                    <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl/relaxed">
                        By surfacing a multimodal UI, conversational AI, community carts and eco-tracking all in one place, we remove barriers at every step:
                    </p>
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 max-w-4xl mx-auto">
                       {breakthroughs.map((item, index) => (
                           <div key={index} className="flex items-center gap-2 text-left">
                               <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                               <span className="font-medium">{item}</span>
                           </div>
                       ))}
                    </div>
                </div>

                <p className="mt-12 text-center text-lg lg:text-xl font-medium text-foreground max-w-4xl mx-auto">
                    In short, we’re solving the last-mile of the digital divide—making retail accessible, delightful and purpose-driven for every Indian shopper.
                </p>

            </div>
        </section>
    )
}
