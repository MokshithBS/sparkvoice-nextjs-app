'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScanSearch } from 'lucide-react';
import Link from 'next/link';

export function PantryScanCta() {
  return (
    <Card className="my-6">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <ScanSearch className="w-8 h-8 text-primary" />
            <div>
                <h3 className="font-bold font-headline text-foreground">Pantry Scan</h3>
                <p className="text-sm text-muted-foreground">
                    Running low? Let AI check your pantry.
                </p>
            </div>
        </div>
        <Button asChild>
          <Link href="/spark?tab=pantry">
            Scan Pantry
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
