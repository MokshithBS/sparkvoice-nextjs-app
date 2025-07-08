
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

export default function RemindersPage() {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
        toast({
            variant: 'destructive',
            title: 'Invalid Phone Number',
            description: 'Please enter a valid 10-digit phone number.',
        });
        return;
    }
    
    setIsSubmitting(true);
    // Simulate API call to set up essentials list and reminders
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
            title: 'Reminders Enabled!',
            description: "We'll send smart refill reminders for your essential items to your WhatsApp.",
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
                    <span className="sr-only">Back to Store</span>
                    </Link>
                </Button>
                <h1 className="text-xl font-bold font-headline flex items-center gap-2">
                    <BellRing className="w-6 h-6 text-primary" />
                    <span>My Essentials Reminders</span>
                </h1>
                <div className="w-8"></div>
            </div>
        </header>

        <main className="flex-1 py-8 px-4">
            <div className="container mx-auto max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Smart Refill Reminders</CardTitle>
                        <CardDescription>
                            Never run out of your must-have items again. Based on your past purchases, we'll track your essentials like atta, oil, or milk and send a friendly reminder to your WhatsApp just before you're about to run out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitted ? (
                             <div className="text-center space-y-4 py-8">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                                <h2 className="text-2xl font-bold">You're All Set!</h2>
                                <p className="text-muted-foreground">We will send smart reminders to <span className="font-bold text-foreground">{phone}</span>. You can now return to shopping.</p>
                                <Button asChild>
                                    <Link href="/store">Back to Store</Link>
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Your 10-digit WhatsApp Number</Label>
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
                                            Setting Up...
                                        </>
                                    ) : (
                                        <>
                                            <WhatsAppIcon className="mr-2 h-5 w-5" />
                                            Enable Smart Reminders
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
