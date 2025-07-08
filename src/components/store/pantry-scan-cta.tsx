'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScanSearch } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function PantryScanCta() {
  const { t } = useLanguage();
  return (
    <Card className="my-6">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <ScanSearch className="w-8 h-8 text-primary" />
            <div>
                <h3 className="font-bold font-headline text-foreground">{t('store.essentialsCta.title')}</h3>
                <p className="text-sm text-muted-foreground">
                    {t('store.essentialsCta.description')}
                </p>
            </div>
        </div>
        <Button asChild>
          <Link href="/spark?tab=pantry">
            {t('store.essentialsCta.button')}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
