
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChefHat, Loader2, Mic, Camera } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/language-context';

interface RecipeInput {
  dishName: string;
  servingSize: string;
  specialRequests: string;
}

interface ShopByRecipeProps {
  recipeInput: RecipeInput;
  onRecipeInputChange: (field: keyof RecipeInput, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function ShopByRecipe({ recipeInput, onRecipeInputChange, onSubmit, isLoading }: ShopByRecipeProps) {
  const { t } = useLanguage();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipeInput.dishName.trim()) {
      onSubmit();
    }
  };

  return (
    <Card className="my-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <ChefHat className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-lg">{t('store.shopByRecipe.title')}</CardTitle>
            <CardDescription>{t('store.shopByRecipe.description')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <div className="space-y-2">
              <Label htmlFor="dish-name">{t('store.shopByRecipe.dishNameLabel')}</Label>
              <div className="relative flex h-10 w-full items-center rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring">
                <Input
                  id="dish-name"
                  placeholder={t('store.shopByRecipe.dishNamePlaceholder')}
                  value={recipeInput.dishName}
                  onChange={(e) => onRecipeInputChange('dishName', e.target.value)}
                  disabled={isLoading}
                  className="h-full w-full border-0 bg-transparent pl-3 pr-2 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm"
                />
                <div className="flex items-center gap-1 pr-2">
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 rounded-full" disabled={isLoading}>
                    <Link href="/spark?tab=speak&context=recipe">
                      <Mic className="h-4 w-4" />
                      <span className="sr-only">{t('common.speak')}</span>
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 rounded-full" disabled={isLoading}>
                    <Link href="/spark?tab=scan&context=recipe">
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">{t('common.scan')}</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serving-size">{t('store.shopByRecipe.servingsLabel')}</Label>
              <Input
                id="serving-size"
                type="number"
                min="1"
                placeholder={t('store.shopByRecipe.servingsPlaceholder')}
                value={recipeInput.servingSize}
                onChange={(e) => onRecipeInputChange('servingSize', e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="special-requests">{t('store.shopByRecipe.specialRequestsLabel')}</Label>
            <Input
              id="special-requests"
              placeholder={t('store.shopByRecipe.specialRequestsPlaceholder')}
              value={recipeInput.specialRequests}
              onChange={(e) => onRecipeInputChange('specialRequests', e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || !recipeInput.dishName.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>{t('store.shopByRecipe.buttonLoading')}</span>
              </>
            ) : (
              t('store.shopByRecipe.button')
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
