'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const handleCheckout = () => {
    toast({
      title: 'Order Placed!',
      description: 'Thank you for your purchase. Your items are on their way!',
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
              <span className="sr-only">Back to Store</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold font-headline flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <span>Your Cart</span>
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {itemCount === 0 ? (
            <div className="text-center space-y-4 py-16">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
              <h2 className="text-2xl font-bold">Your cart is empty</h2>
              <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild>
                <Link href="/store">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Cart Items ({itemCount})</h2>
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
                            <p className="text-sm text-muted-foreground">{item.quantity}</p>
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
              </div>
              <div className="space-y-4 sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span className="text-primary font-medium">FREE</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      Place Order
                    </Button>
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
