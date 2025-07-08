
'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export function ShoppingList() {
    const { itemCount, cartTotal } = useCart();
    const { t } = useLanguage();

    if (itemCount === 0) {
        return null;
    }

  return (
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background via-background to-transparent">
      <div className="p-4 rounded-xl bg-primary backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between text-primary-foreground">
        <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6" />
            <div>
                <p className="font-bold text-sm">{t('store.shoppingList.items', { count: itemCount })}</p>
                <p className="text-sm font-bold">₹{cartTotal.toFixed(2)}</p>
            </div>
        </div>
        <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold">
            <Link href="/cart">
                {t('store.shoppingList.viewCart')}
            </Link>
        </Button>
      </div>
    </div>
  );
}
