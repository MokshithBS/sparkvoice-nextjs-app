
'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { DiwaliBanner } from '@/components/store/diwali-banner';
import { LocationHeader } from '@/components/store/location-header';
import { SearchBar } from '@/components/store/search-bar';
import { CategoryGrid } from '@/components/store/category-grid';
import { ShoppingList } from '@/components/store/shopping-list';
import { ProductGrid } from '@/components/store/product-grid';
import { products, type Product } from '@/lib/products';
import { SparkVoiceCta } from '@/components/store/spark-voice-cta';
import { ContextualCartCta } from '@/components/store/contextual-cart-cta';
import { SparkSaverCta } from '@/components/store/spark-saver-cta';
import { PantryScanCta } from '@/components/store/pantry-scan-cta';
import { suggestProducts } from '@/ai/flows/product-suggester-flow';
import { Loader2, ArrowLeft, ChefHat, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShopByRecipe } from '@/components/store/shop-by-recipe';
import { getIngredientsForDish, type RecipeToCartOutput } from '@/ai/flows/recipe-to-cart-flow.ts';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CommunityCta } from '@/components/store/community-cta';
import { useLanguage } from '@/context/language-context';
import { SustainabilityCta } from '@/components/store/sustainability-cta';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RecipeInput {
  dishName: string;
  servingSize: string;
  specialRequests: string;
}

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isFetchingIngredients, setIsFetchingIngredients] = useState(false);

  const [sortOption, setSortOption] = useState<string>('relevance');
  const [filters, setFilters] = useState({ onSale: false, vegOnly: false });

  const [recipeResult, setRecipeResult] = useState<RecipeToCartOutput | null>(null);
  const [recipeDishName, setRecipeDishName] = useState('');
  const [selectedRecipeItems, setSelectedRecipeItems] = useState<RecipeToCartOutput['shoppableItems']>([]);
  const [recipeInput, setRecipeInput] = useState<RecipeInput>({
    dishName: '',
    servingSize: '4',
    specialRequests: '',
  });


  const { toast } = useToast();
  const { addToCartBatch } = useCart();
  const { t } = useLanguage();
  const availableProductsForAI = useMemo(() => products.map(({ id, name, category, price, salePrice, quantity }) => ({ id, name, category, price: salePrice || price, quantity })), []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedCategory(null);
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  }

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  }

  const handleFilterChange = (filterName: keyof typeof filters, checked: boolean) => {
    setFilters(prev => ({ ...prev, [filterName]: checked }));
  };

  const displayedProducts = useMemo(() => {
    let initialProducts: Product[] = [];
    if (searchQuery) {
        initialProducts = products.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    } else if (selectedCategory) {
        initialProducts = products.filter(p => p.category === selectedCategory);
    }

    if (!searchQuery && !selectedCategory) {
        return [];
    }

    let filtered = [...initialProducts];

    if (filters.onSale) {
        filtered = filtered.filter(p => p.salePrice);
    }
    if (filters.vegOnly) {
        filtered = filtered.filter(p => p.isVeg);
    }

    switch (sortOption) {
        case 'price_asc':
            filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
            break;
        case 'price_desc':
            filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
            break;
        case 'name_asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name_desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default: // 'relevance'
            break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, filters, sortOption]);
  
  useEffect(() => {
    if (!searchQuery) {
        setSuggestedProducts([]);
        return;
    }

    if (displayedProducts.length === 0 && !filters.onSale && !filters.vegOnly) {
      const getSuggestions = async () => {
        setIsSuggesting(true);
        setSuggestedProducts([]);
        try {
          const result = await suggestProducts({
            contextProducts: [searchQuery],
            availableProducts: availableProductsForAI.map(({ id, name, category }) => ({ id, name, category })),
          });
          
          if (result.suggestionIds && result.suggestionIds.length > 0) {
            const suggestions = products.filter(p => result.suggestionIds.includes(p.id));
            setSuggestedProducts(suggestions);
          }
        } catch (error) {
          console.error("Failed to get product suggestions:", error);
           if (error instanceof Error && (error.message.includes('503') || error.message.toLowerCase().includes('overloaded'))) {
             toast({
                variant: 'destructive',
                title: 'AI Service Unavailable',
                description: 'The AI model is currently busy. Please try again in a moment.',
            });
          }
        } finally {
          setIsSuggesting(false);
        }
      };
      
      const handler = setTimeout(() => {
        getSuggestions();
      }, 500);

      return () => {
        clearTimeout(handler);
      };

    } else {
        setSuggestedProducts([]);
    }
  }, [searchQuery, displayedProducts, availableProductsForAI, toast, filters.onSale, filters.vegOnly]);

  const handleRecipeInputChange = (field: keyof RecipeInput, value: string) => {
    setRecipeInput(prev => ({ ...prev, [field]: value }));
  };

  const handleGetIngredients = async () => {
    setIsFetchingIngredients(true);
    setRecipeDishName(recipeInput.dishName);
    try {
        const result = await getIngredientsForDish({
            dishName: recipeInput.dishName,
            servingSize: Number(recipeInput.servingSize) || 4,
            specialRequests: recipeInput.specialRequests,
            availableProducts: availableProductsForAI,
        });
        if (result.shoppableItems.length > 0) {
            setRecipeResult(result);
            setSelectedRecipeItems(result.shoppableItems); // Select all by default
        } else {
            toast({
                variant: 'destructive',
                title: t('store.recipe.toast.notFound.title'),
                description: t('store.recipe.toast.notFound.description', { dishName: recipeInput.dishName }),
            });
        }
    } catch (error) {
        console.error("Failed to get ingredients:", error);
        toast({
            variant: 'destructive',
            title: t('common.error.generic.title'),
            description: (error instanceof Error) ? error.message : t('common.error.generic.description'),
        });
    } finally {
        setIsFetchingIngredients(false);
    }
  };
  
  const handleRecipeItemToggle = (item: RecipeToCartOutput['shoppableItems'][0]) => {
    setSelectedRecipeItems(prev =>
      prev.some(i => i.product === item.product)
        ? prev.filter(i => i.product !== item.product)
        : [...prev, item]
    );
  };

  const handleSelectAllRecipeItems = (checked: boolean) => {
    if (checked) {
      setSelectedRecipeItems(recipeResult?.shoppableItems || []);
    } else {
      setSelectedRecipeItems([]);
    }
  };

  const handleAddToCartFromRecipe = () => {
    if (selectedRecipeItems.length > 0) {
      addToCartBatch(selectedRecipeItems);
      toast({
        title: t('store.recipe.toast.addedToCart.title'),
        description: t('store.recipe.toast.addedToCart.description', { count: selectedRecipeItems.length.toString(), dishName: recipeDishName }),
      });
      closeRecipeDialog();
    }
  };

  const closeRecipeDialog = () => {
      setRecipeResult(null);
      setSelectedRecipeItems([]);
      setRecipeDishName('');
  }

  return (
    <div className="mx-auto max-w-md bg-background font-sans">
      <div className="relative min-h-dvh">
        <LocationHeader />
        <main className="px-4 pb-44">
          <SearchBar 
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
          />
          {searchQuery || selectedCategory ? (
             <>
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="ghost" size="icon" className="-ml-2" onClick={clearFilters}>
                    <ArrowLeft />
                  </Button>
                  <h2 className="text-xl font-bold">{selectedCategory || `Search results for "${searchQuery}"`}</h2>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4 flex-wrap">
                        <h3 className="text-sm font-semibold mr-4">Filter By:</h3>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="veg-only" checked={filters.vegOnly} onCheckedChange={(checked) => handleFilterChange('vegOnly', !!checked)} />
                            <Label htmlFor="veg-only" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Veg Only
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="on-sale" checked={filters.onSale} onCheckedChange={(checked) => handleFilterChange('onSale', !!checked)} />
                            <Label htmlFor="on-sale" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                On Sale
                            </Label>
                        </div>
                    </div>
                    <div className="flex-grow hidden sm:block" />
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Label htmlFor="sort-by" className="text-sm font-semibold whitespace-nowrap">Sort By:</Label>
                        <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relevance">Relevance</SelectItem>
                            <SelectItem value="price_asc">Price: Low to High</SelectItem>
                            <SelectItem value="price_desc">Price: High to Low</SelectItem>
                            <SelectItem value="name_asc">Name: A-Z</SelectItem>
                            <SelectItem value="name_desc">Name: Z-A</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>

              {displayedProducts.length > 0 ? (
                <ProductGrid products={displayedProducts} />
             ) : (
               <div className="text-center py-10">
                   <p className="text-muted-foreground">{t('store.search.noProducts', { query: searchQuery })}</p>
                   {isSuggesting && (
                       <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
                           <Loader2 className="h-4 w-4 animate-spin" />
                           <span>{t('store.search.loadingAlternatives')}</span>
                       </div>
                   )}
                   {suggestedProducts.length > 0 && !isSuggesting && (
                        <div className="mt-6 text-left">
                           <h3 className="text-xl font-bold mb-4">{t('store.search.suggestionsTitle')}</h3>
                           <ProductGrid products={suggestedProducts} />
                       </div>
                   )}
                   {!isSuggesting && suggestedProducts.length === 0 && (
                       <p className="text-sm text-muted-foreground/80 mt-2">{t('store.search.tryDifferent')}</p>
                   )}
               </div>
             )}
           </>
          ) : (
            <>
              <SparkVoiceCta />
              <ContextualCartCta />
              <SparkSaverCta />
              <PantryScanCta />
              <CommunityCta />
              <SustainabilityCta />
              <DiwaliBanner />
              <ShopByRecipe 
                recipeInput={recipeInput}
                onRecipeInputChange={handleRecipeInputChange}
                onSubmit={handleGetIngredients} 
                isLoading={isFetchingIngredients} 
              />
              <CategoryGrid onSelectCategory={handleCategorySelect} />
            </>
          )}
        </main>
        <ShoppingList />
      </div>

       <Dialog open={!!recipeResult} onOpenChange={(isOpen) => !isOpen && closeRecipeDialog()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('store.recipe.modal.title', { dishName: recipeDishName })}</DialogTitle>
            <DialogDescription>
              {t('store.recipe.modal.description')}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="shopping-list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shopping-list">{t('store.recipe.modal.tabs.shoppingList', { count: selectedRecipeItems.length })}</TabsTrigger>
              <TabsTrigger value="recipe">{t('store.recipe.modal.tabs.recipe')}</TabsTrigger>
            </TabsList>
            <TabsContent value="shopping-list" className="mt-4">
              <div className="space-y-3 pr-2 my-4">
                <div className="flex items-center space-x-3 border-b pb-2 mb-2">
                    <Checkbox
                        id="select-all"
                        checked={!!recipeResult && recipeResult.shoppableItems.length === selectedRecipeItems.length && selectedRecipeItems.length > 0}
                        onCheckedChange={(checked) => handleSelectAllRecipeItems(!!checked)}
                    />
                    <Label htmlFor="select-all" className="font-medium text-sm">
                        {t('common.selectAll')}
                    </Label>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-3">
                    {recipeResult?.shoppableItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <Checkbox 
                            id={`item-${index}`} 
                            checked={selectedRecipeItems.some(selected => selected.product === item.product)}
                            onCheckedChange={() => handleRecipeItemToggle(item)}
                            className="mt-1"
                        />
                        <div className="grid gap-0.5">
                          <Label htmlFor={`item-${index}`} className="flex justify-between w-full text-sm font-normal cursor-pointer">
                              <span>{item.product}</span>
                              <span className="text-muted-foreground">Qty: {item.quantity}</span>
                          </Label>
                          {item.requestedText && (
                            <p className="text-xs text-muted-foreground -mt-1">
                                Fulfills recipe need for: <span className="font-semibold">{item.requestedText}</span>
                            </p>
                          )}
                        </div>
                    </div>
                    ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recipe" className="mt-4">
                <div className="max-h-[22rem] overflow-y-auto space-y-4 pr-4 text-sm">
                    <div>
                        <h4 className="font-semibold mb-2 text-base">{t('store.recipe.modal.ingredients')}</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {recipeResult?.ingredients.map((item, index) => (
                            <li key={index}><span className="font-medium text-foreground">{item.quantity}</span> {item.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-base">{t('store.recipe.modal.instructions')}</h4>
                        <div className="text-muted-foreground whitespace-pre-wrap prose prose-sm">
                          {recipeResult?.recipeInstructions.split('\n').map((line, index) => <p key={index}>{line}</p>)}
                        </div>
                    </div>
                </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="sm:justify-between gap-2 border-t pt-4">
            <div>
              {recipeResult?.youtubeVideoUrl && (
                <Button asChild variant="secondary">
                  <Link href={recipeResult.youtubeVideoUrl} target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2" />
                    {t('store.recipe.modal.watchVideo')}
                  </Link>
                </Button>
              )}
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">{t('common.cancel')}</Button>
                </DialogClose>
                <Button onClick={handleAddToCartFromRecipe} disabled={selectedRecipeItems.length === 0}>
                    {t('store.recipe.modal.addToCartButton', { count: selectedRecipeItems.length })}
                </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
