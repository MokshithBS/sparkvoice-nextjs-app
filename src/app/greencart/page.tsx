
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Leaf, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart, type CartItem } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface SustainableSwap {
  originalId: number;
  originalName: string;
  originalImage: string;
  originalHint: string;
  swapId: number;
  swapName: string;
  swapImage: string;
  swapHint: string;
  quantity: number;
}

const sustainableSwaps: Record<number, number> = {
  16: 5,   // Fortune Sun Lite Oil -> Saffola Gold Oil
  25: 108, // Coca-Cola (750ml) -> Paper Boat Aamras
};

export default function GreenCartPage() {
  const { cartItems, updateQuantity, clearCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  const [swappedItems, setSwappedItems] = useState<number[]>([]);
  const [offsetAdded, setOffsetAdded] = useState(false);

  const potentialSwaps = cartItems
    .filter(item => sustainableSwaps[item.id])
    .map(item => {
        const swapProductId = sustainableSwaps[item.id];
        const swapProduct = cartItems.find(p => p.id === swapProductId);
        if (swapProduct) {
            return {
                originalId: item.id,
                originalName: item.name,
                originalImage: item.image,
                originalHint: item.hint,
                swapId: swapProduct.id,
                swapName: swapProduct.name,
                swapImage: swapProduct.image,
                swapHint: swapProduct.hint,
                quantity: item.cartQuantity
            }
        }
        return null;
    }).filter((item): item is SustainableSwap => item !== null);

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
  }
  
  const handleConfirm = () => {
     let swapsApplied = 0;
     swappedItems.forEach(originalId => {
        const swap = potentialSwaps.find(s => s.originalId === originalId);
        if (swap) {
            updateQuantity(swap.originalId, 0); // Remove original
            updateQuantity(swap.swapId, swap.quantity); // Add swap
            swapsApplied++;
        }
     });

     toast({
      title: t('cart.toast.orderPlaced.title'),
      description: `${t('cart.toast.orderPlaced.description')} ${swapsApplied} green swaps applied.`,
    });
    clearCart();
    router.push('/store');
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
                    {potentialSwaps.length > 0 ? potentialSwaps.map((swap) => {
                       const isSwapped = swappedItems.includes(swap.originalId);
                       return (
                         <div key={swap.originalId} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-3 rounded-lg border bg-muted/50">
                           {/* Original Item */}
                           <div className={`relative p-2 rounded-md ${isSwapped ? 'opacity-50' : 'bg-background'}`}>
                             <div className="flex items-center gap-2">
                               <Image src={swap.originalImage} alt={swap.originalName} width={40} height={40} className="rounded-md" data-ai-hint={swap.originalHint} />
                               <div>
                                 <p className="text-sm font-medium">{swap.originalName}</p>
                                 <p className="text-xs text-muted-foreground">{t('greenCart.quantity', {qty: swap.quantity.toString()})}</p>
                               </div>
                             </div>
                           </div>
                           
                           {/* Swap Button */}
                           <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleSwap(swap.originalId)}>
                             {isSwapped ? <CheckCircle className="text-green-600"/> : <RefreshCw />}
                           </Button>
                           
                           {/* Swapped Item */}
                           <div className={`relative p-2 rounded-md ${isSwapped ? 'bg-green-100 dark:bg-green-900/50' : 'opacity-50'}`}>
                              <div className="flex items-center gap-2">
                               <Image src={swap.swapImage} alt={swap.swapName} width={40} height={40} className="rounded-md" data-ai-hint={swap.swapHint} />
                               <div>
                                 <p className="text-sm font-medium">{swap.swapName}</p>
                                 <p className="text-xs text-green-700 dark:text-green-300 font-semibold">{t('greenCart.swap')}</p>
                               </div>
                             </div>
                           </div>
                         </div>
                       )
                    }) : (
                        <p className="text-muted-foreground text-center py-4">Your cart is already as green as it gets! Great job!</p>
                    )}

                    <Separator/>

                    <div className="space-y-4">
                        <h3 className="font-bold">{t('greenCart.offset.title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('greenCart.offset.description', { cost: '₹5.00'})}</p>
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-muted/50">
                            <Checkbox id="carbon-offset" checked={offsetAdded} onCheckedChange={(checked) => handleOffsetToggle(!!checked)} />
                            <Label htmlFor="carbon-offset" className="flex-1 cursor-pointer">
                               {t('greenCart.offset.label', { cost: '₹5.00'})}
                            </Label>
                        </div>
                    </div>

                     <Button size="lg" className="w-full mt-4" onClick={handleConfirm}>
                        {t('greenCart.confirmButton', { count: swappedItems.length.toString() })} &amp; Place Order
                    </Button>
                </CardContent>
            </Card>

        </div>
      </main>
    </div>
  );
}
