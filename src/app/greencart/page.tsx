
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Leaf, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/products';

interface SustainableSwap {
  originalId: number;
  originalName: string;
  originalImage: string;
  originalHint: string;
  originalPackaging: string;
  swapImage: string;
  swapHint: string;
  swapPackaging: string;
  quantity: number;
}

// Map of original product ID to its sustainable alternative's details
const sustainableSwaps: Record<number, Partial<SustainableSwap>> = {
  // Sona Masoori Rice (5 kg) [plastic bag] -> [jute bag]
  59: { 
    swapImage: 'https://storage.googleapis.com/aip-dev-images-public/jute-bag.png', 
    swapHint: 'jute bag', 
    swapPackaging: 'Jute Bag' 
  },
  // Parachute Coconut Oil (500 ml) [plastic bottle] -> [glass bottle]
  62: { 
    swapImage: 'https://storage.googleapis.com/aip-dev-images-public/glass-bottle.png', 
    swapHint: 'glass bottle', 
    swapPackaging: 'Glass Bottle' 
  },
   // Amul Gold Milk (500 ml) -> Nandini Goodlife (better packaging)
  65: {
    swapImage: 'https://storage.googleapis.com/aip-dev-images-public/goodlife.png',
    swapHint: 'milk carton',
    swapPackaging: 'Tetra Pak Carton',
  },
  // Surf Excel Detergent -> Refill Carton
  10: { 
    swapImage: 'https://storage.googleapis.com/aip-dev-images-public/product-detergent.png', // Using same image as it's a box
    swapHint: 'detergent box', 
    swapPackaging: 'Refill Carton' 
  },
};


export default function GreenCartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  const [swappedItems, setSwappedItems] = useState<number[]>([]);
  const [offsetAdded, setOffsetAdded] = useState(false);

  const potentialSwaps: SustainableSwap[] = cartItems
    .filter(item => sustainableSwaps[item.id])
    .map(item => {
      const swapDetails = sustainableSwaps[item.id];
      return {
        originalId: item.id,
        originalName: item.name,
        originalImage: item.image,
        originalHint: item.hint,
        originalPackaging: item.packaging,
        swapImage: swapDetails.swapImage!,
        swapHint: swapDetails.swapHint!,
        swapPackaging: swapDetails.swapPackaging!,
        quantity: item.cartQuantity,
      };
    })
    .filter((item): item is SustainableSwap => !!item);

  const handleSwap = (originalId: number) => {
    setSwappedItems(prev =>
      prev.includes(originalId)
        ? prev.filter(id => id !== originalId)
        : [...prev, originalId]
    );
  };

  const handleOffsetToggle = (checked: boolean) => {
    setOffsetAdded(checked);
    toast({
      title: checked ? t('greenCart.toast.offsetAdded.title') : t('greenCart.toast.offsetRemoved.title'),
      description: checked ? t('greenCart.toast.offsetAdded.description') : undefined,
    });
  };

  const handleConfirm = () => {
    toast({
      title: t('cart.toast.orderPlaced.title'),
      description: `${t('cart.toast.orderPlaced.description')} ${swappedItems.length > 0 ? `with ${swappedItems.length} green swap(s) applied.` : ''}`,
    });
    
    // In a real app, you would send the swap information to the backend.
    // For this prototype, we will just show a toast and navigate.
    router.push('/cart');
  };

  return (
    <div className="flex flex-col min-h-dvh bg-muted/40">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ArrowLeft />
              <span className="sr-only">{t('common.backToStore')}</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold font-headline flex items-center gap-2 text-green-700">
            <Leaf className="w-6 h-6" />
            <span>{t('greenCart.title')}</span>
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground drop-shadow-md">{t('greenCart.hero.title')}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{t('greenCart.hero.description')}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('greenCart.review.title')}</CardTitle>
              <CardDescription>{t('greenCart.review.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {potentialSwaps.length > 0 ? (
                potentialSwaps.map(swap => {
                  const isSwapped = swappedItems.includes(swap.originalId);
                  return (
                    <div key={swap.originalId} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-3 rounded-lg border bg-muted/50">
                      {/* Original Item */}
                      <div className={`relative p-2 rounded-md text-center ${isSwapped ? 'opacity-50' : 'bg-background'}`}>
                        <div className="flex items-center gap-2">
                          <Image src={swap.originalImage} alt={swap.originalName} width={40} height={40} className="rounded-md" data-ai-hint={swap.originalHint} />
                          <div>
                            <p className="text-sm font-medium text-left">{swap.originalName}</p>
                            <p className="text-xs text-muted-foreground text-left">{t('greenCart.quantity', { qty: swap.quantity.toString() })}</p>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-destructive/80 mt-1">{swap.originalPackaging}</p>
                      </div>

                      {/* Swap Button */}
                      <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleSwap(swap.originalId)}>
                        {isSwapped ? <CheckCircle className="text-green-600" /> : <RefreshCw />}
                      </Button>

                      {/* Swapped Item */}
                      <div className={`relative p-2 rounded-md text-center ${isSwapped ? 'bg-green-100 dark:bg-green-900/50' : 'opacity-50'}`}>
                         <div className="flex items-center gap-2">
                          <Image src={swap.swapImage} alt={swap.swapPackaging} width={40} height={40} className="rounded-md" data-ai-hint={swap.swapHint} />
                          <div>
                            <p className="text-sm font-medium text-left">{swap.originalName}</p>
                            <p className="text-xs text-green-700 dark:text-green-300 font-semibold text-left">{t('greenCart.swap')}</p>
                          </div>
                        </div>
                         <p className="text-xs font-semibold text-green-700 dark:text-green-300 mt-1">{swap.swapPackaging}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted-foreground text-center py-4">Your cart is already as green as it gets! Great job!</p>
              )}

              <Separator />

              <div className="space-y-4">
                <h3 className="font-bold">{t('greenCart.offset.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('greenCart.offset.description', { cost: '₹5.00' })}</p>
                <div className="flex items-center space-x-2 p-3 rounded-md bg-muted/50">
                  <Checkbox id="carbon-offset" checked={offsetAdded} onCheckedChange={checked => handleOffsetToggle(!!checked)} />
                  <Label htmlFor="carbon-offset" className="flex-1 cursor-pointer">
                    {t('greenCart.offset.label', { cost: '₹5.00' })}
                  </Label>
                </div>
              </div>

              <Button size="lg" className="w-full mt-4" onClick={handleConfirm} disabled={potentialSwaps.length === 0 && !offsetAdded}>
                {t('greenCart.confirmButton', { count: swappedItems.length.toString() })} &amp; Go to Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
