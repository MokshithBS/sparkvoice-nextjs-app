
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Leaf, CheckCircle, Recycle, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const mockCart = [
    { id: 25, name: 'Coca-Cola (750 ml)', price: 40, quantity: 2, image: 'https://storage.googleapis.com/aip-dev-images-public/product-coke.png', hint: 'soda bottle', greenChoice: { name: 'Glass Bottle Version', reason: 'Less plastic waste', swapped: false } },
    { id: 10, name: 'Surf Excel Detergent (1 kg)', price: 99, quantity: 1, image: 'https://storage.googleapis.com/aip-dev-images-public/product-detergent.png', hint: 'detergent box', greenChoice: { name: 'Eco-friendly Refill Pouch', reason: 'Reduces packaging by 80%', swapped: false } },
    { id: 88, name: 'Paper Plates (Pack of 50)', price: 100, quantity: 1, image: 'https://storage.googleapis.com/aip-dev-images-public/product-paper-plates.png', hint: 'paper plates', greenChoice: { name: 'Areca Leaf Plates', reason: '100% biodegradable', swapped: false } },
];

export default function GreenCartPage() {
    const { toast } = useToast();
    const { t } = useLanguage();
    const [cartItems, setCartItems] = useState(mockCart);
    const [carbonOffset, setCarbonOffset] = useState(false);

    const handleSwap = (itemId: number) => {
        setCartItems(items => items.map(item =>
            item.id === itemId ? { ...item, greenChoice: { ...item.greenChoice, swapped: !item.greenChoice.swapped } } : item
        ));
    };
    
    const handleAddCarbonOffset = (checked: boolean) => {
        setCarbonOffset(checked);
        toast({
            title: checked ? t('greenCart.toast.offsetAdded.title') : t('greenCart.toast.offsetRemoved.title'),
            description: t('greenCart.toast.offsetAdded.description'),
        });
    }

    const totalSwaps = cartItems.filter(item => item.greenChoice.swapped).length;

    return (
    <div className="flex flex-col min-h-dvh bg-muted/40">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/store">
              <ArrowLeft />
              <span className="sr-only">{t('common.backToStore')}</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold font-headline flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            <span>{t('greenCart.title')}</span>
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-2xl space-y-6">
            <Card className="border-green-600/20 bg-green-500/5">
                <CardHeader>
                    <CardTitle className="text-green-800">{t('greenCart.hero.title')}</CardTitle>
                    <CardDescription>{t('greenCart.hero.description')}</CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('greenCart.review.title')}</CardTitle>
                    <CardDescription>{t('greenCart.review.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id}>
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden border bg-white flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.hint} />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{t('greenCart.quantity', { qty: item.quantity })}</p>
                                </div>
                                <p className="font-semibold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="mt-2 ml-4 pl-4 border-l-2 border-dashed border-green-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-green-500/10 p-3 rounded-md">
                                <div className="flex items-center gap-3">
                                    <Recycle className="h-6 w-6 text-green-600 flex-shrink-0"/>
                                    <div>
                                        <p className="font-semibold text-green-800">{item.greenChoice.name}</p>
                                        <p className="text-xs text-green-700/80">{item.greenChoice.reason}</p>
                                    </div>
                                </div>
                                <Button size="sm" variant={item.greenChoice.swapped ? "default" : "outline"} onClick={() => handleSwap(item.id)} className={item.greenChoice.swapped ? "bg-green-600 hover:bg-green-700" : "border-green-600/50 text-green-700"}>
                                    {item.greenChoice.swapped ? <CheckCircle className="mr-2" /> : <Sprout className="mr-2"/>}
                                    {item.greenChoice.swapped ? t('greenCart.swapped') : t('greenCart.swap')}
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('greenCart.offset.title')}</CardTitle>
                    <CardDescription>{t('greenCart.offset.description', { cost: '₹5' })}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <Label htmlFor="carbon-offset" className="font-medium text-foreground">{t('greenCart.offset.label', { cost: '₹5' })}</Label>
                    <Switch id="carbon-offset" checked={carbonOffset} onCheckedChange={handleAddCarbonOffset} />
                </CardContent>
            </Card>

            <div className="text-center">
                <Button size="lg" className="w-full max-w-sm">
                    {t('greenCart.confirmButton', { count: totalSwaps })}
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
