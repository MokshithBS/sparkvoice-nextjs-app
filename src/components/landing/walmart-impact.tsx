'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Globe, Handshake, Lightbulb, Rocket, Target, TrendingUp, Users, Package, BrainCircuit } from "lucide-react";

const impactPoints = [
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Reaching the Next Billion Consumers",
        challenge: "Walmart aims to reach deeper into Tier 2/3 towns and rural markets—yet digital illiteracy and language barriers limit e-commerce penetration.",
        impact: "With multimodal AI input (voice, text, image) and vernacular NLP, we make Walmart’s platforms usable for non-English speakers, low-literacy users, and first-time internet shoppers—unlocking millions of new customers.",
        aligns: "Walmart’s inclusivity & rural commerce goals"
    },
    {
        icon: <BrainCircuit className="w-8 h-8 text-primary" />,
        title: "Driving Hyper-Personalized & Assisted Commerce",
        challenge: "Traditional apps don’t serve users who don’t know exactly what to search for. This leads to cart abandonment and low repeat purchase rates.",
        impact: "Our conversational AI understands real-life intent (“I need school snacks under ₹200”) and builds carts instantly—reducing search time by 80% and boosting conversion rates.",
        aligns: "Customer obsession, increasing AOV (average order value), and personalization initiatives"
    },
    {
        icon: <Package className="w-8 h-8 text-primary" />,
        title: "Transforming Fulfillment via Unified Retail Channels",
        challenge: "Walmart’s supply chain spans Quick Commerce (Flipkart Quick), E-commerce (Flipkart), and Wholesale (Flipkart Wholesale), but customer journeys remain siloed.",
        impact: "We unify quick, scheduled, group, and recurring deliveries into a single UX. This simplifies backend orchestration and increases operational efficiency while delivering flexibility to users.",
        aligns: "Omni-channel strategy and Smart Supply Chain investments"
    },
    {
        icon: <Handshake className="w-8 h-8 text-primary" />,
        title: "Enabling Social Commerce & Community Carting",
        challenge: "Despite growth in social commerce, there’s no cohesive community-based buying model that encourages engagement and loyalty.",
        impact: "Through SparkHives, users can build shared carts with neighbours, vote on bulk buys, and unlock discounts—transforming Walmart into a socially embedded platform, not just a seller.",
        aligns: "Flipkart’s Shopsy expansion and Walmart’s “retail-as-community” vision"
    },
    {
        icon: <Globe className="w-8 h-8 text-primary" />,
        title: "Accelerating Sustainability Goals",
        challenge: "Walmart is committed to becoming regenerative by 2040, but influencing eco-conscious shopping at the consumer level remains complex.",
        impact: "With SparkGreen, customers are nudged toward sustainable product swaps and carbon-neutral deliveries—gamifying eco-responsibility and making Walmart a trusted green partner.",
        aligns: "Walmart’s sustainability goals and ESG roadmap"
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
        title: "Building Price Transparency & Trust",
        challenge: "In local retail, trust and perceived savings still drive loyalty more than brand.",
        impact: "Our Instant Price-Match Scanner compares Walmart prices to local bills, showing customers real savings—redefining trust with every order.",
        aligns: "Price leadership and building long-term loyalty"
    }
];

const strategicFitPoints = [
    {
        icon: <Globe className="w-6 h-6 text-primary" />,
        text: "Scalable across Flipkart, Flipkart Wholesale, Shopsy, and Walmart’s global supply chains"
    },
    {
        icon: <Target className="w-6 h-6 text-primary" />,
        text: "Modular for urban, rural, and B2B customers"
    },
    {
        icon: <Handshake className="w-6 h-6 text-primary" />,
        text: "Impact-Driven with measurable metrics in accessibility, cart conversion, engagement, and emissions saved"
    },
    {
        icon: <Lightbulb className="w-6 h-6 text-primary" />,
        text: "AI-Native—future-ready for integrations with Walmart’s LLMs, edge devices, or smart storefronts"
    }
];

export function WalmartImpact() {
    return (
        <section id="walmart-impact" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">For Walmart Sparkathon</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                            How Our Innovation Creates Impact at Walmart
                        </h2>
                    </div>
                </div>

                <div className="mx-auto grid max-w-7xl items-stretch gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
                    {impactPoints.map((point, index) => (
                        <Card key={index} className="flex flex-col shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    {point.icon}
                                    <CardTitle className="text-xl font-headline">{point.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow gap-4">
                                <div>
                                    <h4 className="font-semibold text-destructive mb-1">Challenge:</h4>
                                    <p className="text-sm text-muted-foreground">{point.challenge}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-green-600 mb-1">Our Impact:</h4>
                                    <p className="text-sm text-muted-foreground">{point.impact}</p>
                                </div>
                                <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <span className="text-muted-foreground"><strong className="text-foreground">Aligns with:</strong> {point.aligns}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-20 text-center bg-card py-12 rounded-xl border">
                    <h3 className="text-3xl font-bold mb-6 font-headline flex items-center justify-center gap-3">
                        <Rocket className="w-8 h-8 text-primary" />
                        Strategic Fit for Walmart Sparkathon
                    </h3>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl mx-auto">
                        {strategicFitPoints.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 text-left p-2">
                                {item.icon}
                                <span className="font-medium text-lg">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
