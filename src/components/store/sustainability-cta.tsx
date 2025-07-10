
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function SustainabilityCta() {
  const { t } = useLanguage();
  return (
    <Card className="my-6 bg-green-500/10 border-green-600/20">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600/10 rounded-lg">
                <Leaf className="w-6 h-6 text-green-700" />
            </div>
            <div>
                <h3 className="font-bold font-headline text-foreground">{t('store.sustainabilityCta.title')}</h3>
                <p className="text-sm text-muted-foreground">
                    {t('store.sustainabilityCta.description')}
                </p>
            </div>
        </div>
        <Button asChild variant="outline" className="border-green-600/50 text-green-700 hover:bg-green-600/10 hover:text-green-800">
          <Link href="/cart">
            {t('store.sustainabilityCta.button')}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
