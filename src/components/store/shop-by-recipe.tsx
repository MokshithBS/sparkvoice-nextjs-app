'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChefHat, Loader2, Mic, Camera } from 'lucide-react';
import Link from 'next/link';

interface ShopByRecipeProps {
  onSubmit: (dishName: string) => void;
  isLoading: boolean;
}

export function ShopByRecipe({ onSubmit, isLoading }: ShopByRecipeProps) {
  const [dishName, setDishName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dishName.trim()) {
      onSubmit(dishName);
    }
  };

  return (
    <Card className="my-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-lg">Shop by Recipe</CardTitle>
                <CardDescription>Tell us what you're cooking!</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex h-10 w-full items-center rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring">
            <Input
                placeholder="e.g., Paneer Butter Masala"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                disabled={isLoading}
                className="h-full w-full border-0 bg-transparent pl-3 pr-2 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm"
            />
            <div className="flex items-center gap-1 pr-2">
                <Button asChild variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 rounded-full" disabled={isLoading}>
                    <Link href="/spark?tab=speak">
                        <Mic className="h-4 w-4" />
                        <span className="sr-only">Speak dish name</span>
                    </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 rounded-full" disabled={isLoading}>
                    <Link href="/spark?tab=scan">
                        <Camera className="h-4 w-4" />
                        <span className="sr-only">Scan recipe list</span>
                    </Link>
                </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || !dishName.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Getting Ingredients...</span>
              </>
            ) : (
              'Get Ingredients'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
