
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Users } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function CommunityCta() {
  const { t } = useLanguage();
  return (
    <Card className="my-6">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
                <h3 className="font-bold font-headline text-foreground">{t('store.communityCta.title')}</h3>
                <p className="text-sm text-muted-foreground">
                    {t('store.communityCta.description')}
                </p>
            </div>
        </div>
        <Button asChild>
          <Link href="/community">
            {t('store.communityCta.button')}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
