'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export function ContextualCartCta() {
  return (
    <Card className="my-6">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            <div>
                <h3 className="font-bold font-headline text-foreground">AI Shopping Assistant</h3>
                <p className="text-sm text-muted-foreground">
                    Describe what you need, we'll build the cart.
                </p>
            </div>
        </div>
        <Button asChild>
          <Link href="/spark?tab=context">
            Try Now
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
