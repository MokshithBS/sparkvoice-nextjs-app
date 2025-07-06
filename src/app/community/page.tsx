'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, CheckCircle, Loader2, Building, Sparkles, MapPin, Package, Plus, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const yourHives = [
    { id: '1', name: "Prestige Falcon City", members: 24, image: 'https://storage.googleapis.com/aip-dev-images-public/community-1.png', hint: 'apartment building' },
    { id: '2', name: "SIT Hostel Block-B", members: 12, image: 'https://storage.googleapis.com/aip-dev-images-public/community-2.png', hint: 'college hostel' },
]

const discoverHives = [
    { id: '3', name: "Tumkur Cyclists Group", members: 45, image: 'https://storage.googleapis.com/aip-dev-images-public/community-3.png', hint: 'cyclists group' },
    { id: '4', name: "BH Road Seniors Club", members: 31, image: 'https://storage.googleapis.com/aip-dev-images-public/community-4.png', hint: 'senior citizens' },
]

const hiveTemplates = [
    { name: "Hostel Starter Kit", description: "Monthly stock-up for students.", icon: <Package/>, hint: 'student supplies' },
    { name: "Family Festival Pack", description: "All essentials for the festival season.", icon: <Package/>, hint: 'festival food' },
    { name: "Weekly Veggie Haul", description: "Fresh vegetables for the week.", icon: <Package/>, hint: 'vegetable basket' },
]

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
            description: 'Please enter a name for your Hive.',
        });
        return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
            title: 'Hive Created!',
            description: `You can now invite others to join the "${groupName}" Hive.`,
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
                    <Sparkles className="w-6 h-6 text-primary" />
                    <span>SparkHives</span>
                </h1>
                <div className="w-8"></div>
            </div>
        </header>

        <main className="flex-1 py-8 px-4">
            <div className="container mx-auto max-w-2xl space-y-12">
                <Card>
                    <CardHeader>
                        <CardTitle>Create a New Hive</CardTitle>
                        <CardDescription>
                            Start a private group for your apartment, society, or friends to shop together and save.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitted ? (
                             <div className="text-center space-y-4 py-8">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                                <h2 className="text-2xl font-bold">Your Hive is Ready!</h2>
                                <p className="text-muted-foreground">The Hive for <span className="font-bold text-foreground">"{groupName}"</span> has been created. Share the link with your neighbours!</p>
                                <div className="flex justify-center gap-4">
                                    <Button>Copy Invite Link</Button>
                                    <Button asChild variant="outline">
                                        <Link href="/store">Back to Store</Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="group-name">Hive Name</Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="group-name"
                                            type="text"
                                            placeholder="e.g., Prestige Falcon City Hive"
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
                                            Creating Hive...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="mr-2 h-5 w-5" />
                                            Create New Hive
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                <Separator/>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Your Active Hives</h2>
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
                                        <CardDescription className="flex items-center gap-2"><Users className="w-4 h-4"/>{hive.members} members</CardDescription>
                                    </div>
                                    <Button variant="secondary">View</Button>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Discover Hives Nearby</h2>
                     <div className="grid gap-4">
                        {discoverHives.map(hive => (
                            <Card key={hive.id} className="flex items-center gap-4 p-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={hive.image} alt={hive.name} data-ai-hint={hive.hint}/>
                                    <AvatarFallback>{hive.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <CardTitle className="text-lg">{hive.name}</CardTitle>
                                    <CardDescription className="flex items-center gap-2"><Globe className="w-4 h-4"/>Public Hive</CardDescription>
                                </div>
                                <Button>Join</Button>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Popular Hive Templates</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {hiveTemplates.map(template => (
                             <Card key={template.name} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="p-2 bg-primary/10 rounded-lg">{template.icon}</div>
                                <div>
                                    <h3 className="font-bold">{template.name}</h3>
                                    <p className="text-sm text-muted-foreground">{template.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    </div>
  );
}
