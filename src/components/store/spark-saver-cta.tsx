'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiggyBank } from 'lucide-react';
import Link from 'next/link';

export function SparkSaverCta() {
  return (
    <Card className="my-6">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <PiggyBank className="w-8 h-8 text-primary" />
            <div>
                <h3 className="font-bold font-headline text-foreground">Shop on a Budget</h3>
                <p className="text-sm text-muted-foreground">
                    Let our AI build the best cart for you.
                </p>
            </div>
        </div>
        <Button asChild>
          <Link href="/spark?tab=saver">
            Try SparkSaver
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
