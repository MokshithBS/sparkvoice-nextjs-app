import Image from 'next/image';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { Plus, Minus } from 'lucide-react';

export function ProductGrid({ products }: { products: Product[] }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  if (products.length === 0) {
    return (
        <div className="text-center py-10">
            <p className="text-muted-foreground">No products found.</p>
            <p className="text-sm text-muted-foreground/80">Try a different search term.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 my-6">
      {products.map((product) => {
        const cartItem = cartItems.find(item => item.id === product.id);

        return (
            <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0 text-center">
                <div className="relative w-full aspect-square bg-card/80">
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover"
                    data-ai-hint={product.hint}
                />
                </div>
                <div className="p-2 space-y-2 flex flex-col h-28 justify-between">
                    <h3 className="text-sm font-medium truncate">{product.name}</h3>
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">{product.quantity}</p>
                        <p className="font-bold text-sm">₹{product.price}</p>
                    </div>
                    {cartItem ? (
                        <div className="flex items-center justify-center gap-2">
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(product.id, cartItem.cartQuantity - 1)}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold w-8 text-center">{cartItem.cartQuantity}</span>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(product.id, cartItem.cartQuantity + 1)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <Button size="sm" className="w-full" onClick={() => addToCart(product)}>Add</Button>
                    )}
                </div>
            </CardContent>
            </Card>
        );
        })}
    </div>
  );
}
