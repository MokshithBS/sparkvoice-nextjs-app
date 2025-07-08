'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Smartphone, MessageSquareWarning, Store } from "lucide-react"
import { useLanguage } from "@/context/language-context";

const problems = [
    {
        icon: <Users className="w-8 h-8 text-destructive" />,
        key: 'digitalIlliteracy',
    },
    {
        icon: <MessageSquareWarning className="w-8 h-8 text-destructive" />,
        key: 'languageBarriers',
    },
    {
        icon: <Smartphone className="w-8 h-8 text-destructive" />,
        key: 'accessLimitations',
    },
    {
        icon: <Store className="w-8 h-8 text-destructive" />,
        key: 'kiranaHurdles',
    },
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
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {t('landing.problem.description')}
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 mt-12">
                    {problems.map((problem) => (
                        <div key={problem.key} className="flex flex-col items-center text-center">
                            <div className="p-4 bg-destructive/10 rounded-full mb-4">
                                {problem.icon}
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-2">{t(`landing.problem.items.${problem.key}.title` as any)}</h3>
                            <p className="text-muted-foreground">{t(`landing.problem.items.${problem.key}.description` as any)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
