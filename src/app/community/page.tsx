
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, CheckCircle, Loader2, Building, Sparkles, Plus, MessagesSquare, Vote, PiggyBank, ShoppingCart, Bot, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/context/language-context';


const yourHives = [
    { id: '1', name: "Prestige Falcon City", members: 24, image: 'https://storage.googleapis.com/aip-dev-images-public/community-1.png', hint: 'apartment building' },
    { id: '2', name: "SIT Hostel Block-B", members: 12, image: 'https://storage.googleapis.com/aip-dev-images-public/community-2.png', hint: 'college hostel' },
]

const discoverHives = [
    { id: '3', name: "Tumkur Cyclists Group", members: 45, image: 'https://storage.googleapis.com/aip-dev-images-public/community-3.png', hint: 'cyclists group' },
    { id: '4', name: "BH Road Seniors Club", members: 31, image: 'https://storage.googleapis.com/aip-dev-images-public/community-4.png', hint: 'senior citizens' },
]

const hiveFeatures = [
    { key: "chat_together", icon: <MessagesSquare className="w-6 h-6 text-primary"/> },
    { key: "decide_together", icon: <Vote className="w-6 h-6 text-primary"/> },
    { key: "budget_together", icon: <PiggyBank className="w-6 h-6 text-primary"/> },
    { key: "shop_together", icon: <ShoppingCart className="w-6 h-6 text-primary"/> },
    { key: "ai_assistant", icon: <Bot className="w-6 h-6 text-primary"/> },
    { key: "hive_rewards", icon: <Award className="w-6 h-6 text-primary"/> },
]

export default function CommunityPage() {
  const [groupName, setGroupName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
        toast({
            variant: 'destructive',
            title: t('community.hub.toast.nameRequired.title'),
            description: t('community.hub.toast.nameRequired.description'),
        });
        return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
            title: t('community.hub.toast.hiveCreated.title'),
            description: t('community.hub.toast.hiveCreated.description', { groupName }),
        });
    }, 1500);
  };


  return (
    <div className="flex flex-col min-h-dvh bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/store">
                    <ArrowLeft />
                    <span className="sr-only">{t('common.backToStore')}</span>
                    </Link>
                </Button>
                <h1 className="text-xl font-bold font-headline flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <span>{t('community.hub.title')}</span>
                </h1>
                <div className="w-8"></div>
            </div>
        </header>

        <main className="flex-1 py-8 px-4">
            <div className="container mx-auto max-w-2xl space-y-12">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('community.hub.create.title')}</CardTitle>
                        <CardDescription>
                           {t('community.hub.create.description')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitted ? (
                             <div className="text-center space-y-4 py-8">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                                <h2 className="text-2xl font-bold">{t('community.hub.create.submitted.title')}</h2>
                                <p className="text-muted-foreground">{t('community.hub.create.submitted.description', { groupName })}</p>
                                <div className="flex justify-center gap-4">
                                    <Button>{t('community.hub.create.submitted.copyLink')}</Button>
                                    <Button asChild variant="outline">
                                        <Link href="/store">{t('common.backToStore')}</Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="group-name">{t('community.hub.create.form.nameLabel')}</Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="group-name"
                                            type="text"
                                            placeholder={t('community.hub.create.form.namePlaceholder')}
                                            value={groupName}
                                            onChange={(e) => setGroupName(e.target.value)}
                                            className="pl-10"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !groupName}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('community.hub.create.form.buttonLoading')}
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="mr-2 h-5 w-5" />
                                            {t('community.hub.create.form.button')}
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                <div className="mt-12">
                    <p className="text-lg text-primary font-semibold text-center mb-2">{t('community.hub.features.tagline')}</p>
                    <h2 className="text-2xl font-bold mb-2 text-center">{t('community.hub.features.title')}</h2>
                    <p className="text-muted-foreground text-center mb-6 max-w-xl mx-auto">{t('community.hub.features.description')}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {hiveFeatures.map((feature) => (
                           <Card key={feature.key}>
                                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                    <div className="p-2 bg-primary/10 rounded-lg">{feature.icon}</div>
                                    <CardTitle className="text-base">{t(`community.hub.features.${feature.key}.title` as any)}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{t(`community.hub.features.${feature.key}.description` as any)}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <Separator/>

                <div>
                    <h2 className="text-2xl font-bold mb-4">{t('community.hub.activeHives.title')}</h2>
                    <div className="grid gap-4">
                        {yourHives.map(hive => (
                            <Link href={`/community/${hive.id}`} key={hive.id}>
                                <Card className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={hive.image} alt={hive.name} data-ai-hint={hive.hint} />
                                        <AvatarFallback>{hive.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <CardTitle className="text-lg">{hive.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-2"><Users className="w-4 h-4"/>{t('community.hub.members', { count: hive.members })}</CardDescription>
                                    </div>
                                    <Button variant="secondary">{t('common.view')}</Button>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">{t('community.hub.discover.title')}</h2>
                     <div className="grid gap-4">
                        {discoverHives.map(hive => (
                            <Card key={hive.id} className="flex items-center gap-4 p-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={hive.image} alt={hive.name} data-ai-hint={hive.hint}/>
                                    <AvatarFallback>{hive.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <CardTitle className="text-lg">{hive.name}</CardTitle>
                                    <CardDescription className="flex items-center gap-2"><Users className="w-4 h-4"/>{t('community.hub.members', { count: hive.members })}</CardDescription>
                                </div>
                                <Button>{t('community.hub.discover.join')}</Button>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    </div>
  );
}
