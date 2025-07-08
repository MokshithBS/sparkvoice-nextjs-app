
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BellRing, CheckCircle, Smartphone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useLanguage } from '@/context/language-context';

export default function RemindersPage() {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
        toast({
            variant: 'destructive',
            title: t('reminders.toast.invalidPhone.title'),
            description: t('reminders.toast.invalidPhone.description'),
        });
        return;
    }
    
    setIsSubmitting(true);
    // Simulate API call to set up essentials list and reminders
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
            title: t('reminders.toast.remindersEnabled.title'),
            description: t('reminders.toast.remindersEnabled.description'),
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
                    <BellRing className="w-6 h-6 text-primary" />
                    <span>{t('reminders.title')}</span>
                </h1>
                <div className="w-8"></div>
            </div>
        </header>

        <main className="flex-1 py-8 px-4">
            <div className="container mx-auto max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('reminders.card.title')}</CardTitle>
                        <CardDescription>
                            {t('reminders.card.description')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitted ? (
                             <div className="text-center space-y-4 py-8">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                                <h2 className="text-2xl font-bold">{t('reminders.submitted.title')}</h2>
                                <p className="text-muted-foreground">{t('reminders.submitted.description', { phone })}</p>
                                <Button asChild>
                                    <Link href="/store">{t('common.backToStore')}</Link>
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">{t('reminders.form.phoneLabel')}</Label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="e.g. 9876543210"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="pl-10"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !phone}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('reminders.form.buttonLoading')}
                                        </>
                                    ) : (
                                        <>
                                            <WhatsAppIcon className="mr-2 h-5 w-5" />
                                            {t('reminders.form.button')}
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
  );
}
