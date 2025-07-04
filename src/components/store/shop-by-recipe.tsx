'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChefHat, Loader2 } from 'lucide-react';

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
          <Input
            placeholder="e.g., Paneer Butter Masala"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            disabled={isLoading}
          />
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
