import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Smartphone, MessageSquareWarning, Store } from "lucide-react"

const problems = [
    {
        icon: <Users className="w-8 h-8 text-destructive" />,
        title: "Digital Illiteracy",
        description: "Navigating complex apps, using 'add to cart', and completing digital checkouts is a major hurdle for many first-time internet users.",
    },
    {
        icon: <MessageSquareWarning className="w-8 h-8 text-destructive" />,
        title: "Language Barriers",
        description: "Most e-commerce platforms are English-first, alienating India’s vast multilingual population who are more comfortable in their native tongue.",
    },
    {
        icon: <Smartphone className="w-8 h-8 text-destructive" />,
        title: "Access Limitations",
        description: "Many households still lack personal smartphones or reliable internet, making app-based shopping impossible for a large segment of the population.",
    },
    {
        icon: <Store className="w-8 h-8 text-destructive" />,
        title: "Kirana Store Hurdles",
        description: "Local stores face high costs, technical complexity, and manual overhead in transcribing handwritten or verbal orders, limiting their growth.",
    },
]

export function Problem() {
    return (
        <section id="problem" className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">The Challenge</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">From Handwritten Slips to Digital Carts</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Over 500 million consumers in India's Tier 2, Tier 3 cities, and rural regions remain disconnected from digital commerce. The problem isn’t just technological—it’s behavioral, cultural, and infrastructural.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 mt-12">
                    {problems.map((problem) => (
                        <div key={problem.title} className="flex flex-col items-center text-center">
                            <div className="p-4 bg-destructive/10 rounded-full mb-4">
                                {problem.icon}
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-2">{problem.title}</h3>
                            <p className="text-muted-foreground">{problem.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
