
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingCart, Loader2, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/products';
import { products } from '@/lib/products';
import { suggestProducts } from '@/ai/flows/product-suggester-flow';
import { ProductGrid } from '@/components/store/product-grid';
import { useLanguage } from '@/context/language-context';


export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (cartItems.length > 0) {
      const handler = setTimeout(() => {
        const getSuggestions = async () => {
            setIsSuggesting(true);
            try {
                const cartItemNames = cartItems.map(item => item.name);
                const availableProductsForAI = products
                    .filter(p => !cartItems.some(ci => ci.id === p.id))
                    .map(({ id, name, category }) => ({ id, name, category }));

                const result = await suggestProducts({
                    contextProducts: cartItemNames,
                    availableProducts: availableProductsForAI,
                });
                
                if (result.suggestionIds && result.suggestionIds.length > 0) {
                    const suggestions = products.filter(p => result.suggestionIds.includes(p.id));
                    setSuggestedProducts(suggestions);
                } else {
                    setSuggestedProducts([]);
                }
            } catch (error) {
                console.error("Failed to get product suggestions:", error);
                 if (error instanceof Error && (error.message.includes('503') || error.message.toLowerCase().includes('overloaded'))) {
                    toast({
                        variant: 'destructive',
                        title: 'AI Service Unavailable',
                        description: 'The AI model is currently busy. Please try again in a moment.',
                    });
                } else if (error instanceof Error && error.message.includes('429')) {
                    toast({
                        variant: 'destructive',
                        title: 'Suggestion service is busy',
                        description: 'Too many requests were made. Please wait a moment before trying again.',
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Suggestion Failed',
                        description: 'Could not fetch product suggestions at this time.',
                    });
                }
                setSuggestedProducts([]);
            } finally {
                setIsSuggesting(false);
            }
        };
        getSuggestions();
      }, 500); // Debounce API call by 500ms

      return () => {
        clearTimeout(handler);
      };
    } else {
      setSuggestedProducts([]);
    }
  }, [cartItems, toast]);

  const handleCheckout = () => {
    toast({
      title: t('cart.toast.orderPlaced.title'),
      description: t('cart.toast.orderPlaced.description'),
    });
    clearCart();
    router.push('/store');
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
            <ShoppingCart className="w-6 h-6 text-primary" />
            <span>{t('cart.title')}</span>
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {itemCount === 0 ? (
            <div className="text-center space-y-4 py-16">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
              <h2 className="text-2xl font-bold">{t('cart.empty.title')}</h2>
              <p className="text-muted-foreground">{t('cart.empty.description')}</p>
              <Button asChild>
                <Link href="/store">{t('cart.empty.button')}</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t('cart.itemsTitle', { count: itemCount })}</h2>
                {cartItems.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4 flex gap-4 items-center">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow grid gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                          </div>
                          <p className="font-bold text-lg">₹{(item.price * item.cartQuantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold w-8 text-center">{item.cartQuantity}</span>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="mt-12">
                    {isSuggesting && (
                        <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>{t('common.loadingSuggestions')}</span>
                        </div>
                    )}
                    {suggestedProducts.length > 0 && !isSuggesting && (
                        <>
                            <h2 className="text-xl font-bold mb-4 mt-8 pt-8 border-t">{t('common.youMightAlsoLike')}</h2>
                            <ProductGrid products={suggestedProducts} />
                        </>
                    )}
                </div>

              </div>
              <div className="space-y-4 sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('cart.summary.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t('cart.summary.subtotal', { count: itemCount })}</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t('cart.summary.deliveryFee')}</span>
                      <span className="text-primary font-medium">{t('cart.summary.free')}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>{t('cart.summary.total')}</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="grid gap-2">
                       <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                          <Link href="/greencart">
                            <Leaf className="mr-2 h-5 w-5"/>
                            {t('greenCart.reviewButton')}
                          </Link>
                        </Button>
                        <Button className="w-full" size="lg" onClick={handleCheckout}>
                        {t('cart.summary.placeOrder')}
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
