'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export function CommunityCta() {
  return (
    <Card className="my-6">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
                <h3 className="font-bold font-headline text-foreground">SparkHives</h3>
                <p className="text-sm text-muted-foreground">
                    Shop together with neighbours, save more!
                </p>
            </div>
        </div>
        <Button asChild>
          <Link href="/community">
            Explore Hives
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
