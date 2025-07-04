'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Mic, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function SparkVoiceCta() {
  return (
    <Card className="my-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold font-headline text-foreground">Can't find it? Just Spark It.</h3>
        </div>
        <p className="text-sm text-muted-foreground">
            Build your cart in seconds. Say it, snap a handwritten list, or paste your notes.
        </p>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="flex-col h-auto py-2" asChild>
            <Link href="/spark?tab=scan">
              <Camera className="w-5 h-5 mb-1" />
              <span className="text-xs">Scan List</span>
            </Link>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-2" asChild>
             <Link href="/spark?tab=speak">
              <Mic className="w-5 h-5 mb-1" />
              <span className="text-xs">Speak List</span>
             </Link>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-2" asChild>
             <Link href="/spark?tab=type">
              <FileText className="w-5 h-5 mb-1" />
              <span className="text-xs">Type List</span>
             </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
