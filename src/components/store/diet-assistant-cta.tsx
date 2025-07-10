
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function DietAssistantCta() {
  const { t } = useLanguage();
  return (
    <Card className="my-6 bg-blue-500/10 border-blue-600/20">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-lg">
                <HeartPulse className="w-6 h-6 text-blue-700" />
            </div>
            <div>
                <h3 className="font-bold font-headline text-foreground">SparkDiet AI</h3>
                <p className="text-sm text-muted-foreground">
                    Get a personalized, healthy grocery cart.
                </p>
            </div>
        </div>
        <Button asChild variant="outline" className="border-blue-600/50 text-blue-700 hover:bg-blue-600/10 hover:text-blue-800">
          <Link href="/spark?tab=diet">
            Try Now
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
