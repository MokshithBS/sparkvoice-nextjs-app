'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import Link from 'next/link';

export function CommunityCta() {
  return (
    <Card className="my-6">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
                <h3 className="font-bold font-headline text-foreground">Community Buys</h3>
                <p className="text-sm text-muted-foreground">
                    Shop together with neighbours, save more!
                </p>
            </div>
        </div>
        <Button asChild>
          <Link href="/community">
            Start a Group
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
