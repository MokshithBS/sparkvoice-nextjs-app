'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, CheckCircle, Loader2, Building, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function CommunityPage() {
  const [groupName, setGroupName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
        toast({
            variant: 'destructive',
            title: 'Group Name Required',
            description: 'Please enter your apartment or village name.',
        });
        return;
    }
    
    setIsSubmitting(true);
    // Simulate API call to create a group
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
            title: 'Group Created!',
            description: `You can now invite neighbours to join the "${groupName}" group.`,
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
                    <Users className="w-6 h-6 text-primary" />
                    <span>Community Buys</span>
                </h1>
                <div className="w-8"></div>
            </div>
        </header>

        <main className="flex-1 py-8 px-4">
            <div className="container mx-auto max-w-2xl space-y-8">

                 <div className="relative w-full aspect-video md:aspect-[2.4/1] rounded-xl overflow-hidden">
                    <Image
                        src="https://storage.googleapis.com/aip-dev-images-public/community-buying.png"
                        alt="Community shopping together"
                        fill
                        className="object-cover"
                        data-ai-hint="community shopping groceries"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <h2 className="text-3xl font-bold text-white">Shop Together, Save More!</h2>
                        <p className="text-lg text-white/90 mt-1 max-w-lg">Team up with your neighbours to unlock bulk discounts on everyday essentials.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Start a New Buying Group</CardTitle>
                        <CardDescription>
                            Create a group for your apartment building, housing society, or village. We'll give you a special link to invite others.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitted ? (
                             <div className="text-center space-y-4 py-8">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                                <h2 className="text-2xl font-bold">Your Group is Ready!</h2>
                                <p className="text-muted-foreground">The buying group for <span className="font-bold text-foreground">"{groupName}"</span> has been created. Share the link with your neighbours to start saving!</p>
                                <div className="flex justify-center gap-4">
                                    <Button>Copy Invite Link</Button>
                                    <Button asChild variant="outline">
                                        <Link href="/store">Back to Store</Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="group-name">Apartment, Society, or Village Name</Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="group-name"
                                            type="text"
                                            placeholder="e.g., Prestige Falcon City"
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
                                            Creating Group...
                                        </>
                                    ) : (
                                        <>
                                            <Users className="mr-2 h-5 w-5" />
                                            Create Buying Group
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
