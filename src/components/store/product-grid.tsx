import Image from 'next/image';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ProductGrid({ products }: { products: Product[] }) {
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
      {products.map((product) => (
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
            <div className="p-2 space-y-2">
                <h3 className="text-sm font-medium truncate">{product.name}</h3>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">{product.quantity}</p>
                    <p className="font-bold text-sm">₹{product.price}</p>
                </div>
                <Button size="sm" className="w-full">Add</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
