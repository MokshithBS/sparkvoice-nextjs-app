
'use client';
import { ProductGrid } from '@/components/store/product-grid';
import { products, type Product } from '@/lib/products';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';

export default function SalePage() {
  const saleProducts = useMemo(() => {
    return products.filter(p => p.salePrice);
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-gradient-to-br from-gray-900 via-red-900 to-yellow-800 text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild className="hover:bg-white/10">
            <Link href="/store">
              <ArrowLeft />
              <span className="sr-only">Back to Store</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold font-headline flex items-center gap-2 text-yellow-300">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <span>Grand Sparkathon Sale</span>
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">Unbeatable Diwali Deals!</h2>
              <p className="mt-2 text-lg text-yellow-200/80">Grab them before they're gone. Up to 50% OFF on your favorite brands.</p>
          </div>
          <ProductGrid products={saleProducts} />
        </div>
      </main>
    </div>
  );
}
