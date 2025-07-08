
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
import { SparkSaverCta } from '@/components/store/spark-saver-cta';
import { RefillReminderCta } from '@/components/store/refill-reminder-cta';
import { suggestProducts } from '@/ai/flows/product-suggester-flow';
import { Loader2, ArrowLeft, ChefHat, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShopByRecipe } from '@/components/store/shop-by-recipe';
import { getIngredientsForDish, type RecipeToCartOutput } from '@/ai/flows/recipe-to-cart-flow';
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

  const filteredProducts = useMemo(() => {
    if (searchQuery) {
        return products.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    if (selectedCategory) {
        return products.filter(p => p.category === selectedCategory);
    }
    return [];
  }, [searchQuery, selectedCategory]);
  
  useEffect(() => {
    if (!searchQuery) {
        setSuggestedProducts([]);
        return;
    }

    if (filteredProducts.length === 0) {
      const getSuggestions = async () => {
        setIsSuggesting(true);
        setSuggestedProducts([]);
        try {
          const availableProductsForAI = products.map(({ id, name, category }) => ({ id, name, category }));
          const result = await suggestProducts({
            contextProducts: [searchQuery],
            availableProducts: availableProductsForAI,
          });
          
          if (result.suggestionIds && result.suggestionIds.length > 0) {
            const suggestions = products.filter(p => result.suggestionIds.includes(p.id));
            setSuggestedProducts(suggestions);
          }
        } catch (error) {
          console.error("Failed to get product suggestions:", error);
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
  }, [searchQuery, filteredProducts]);

  const handleRecipeInputChange = (field: keyof RecipeInput, value: string) => {
    setRecipeInput(prev => ({ ...prev, [field]: value }));
  };

  const handleGetIngredients = async () => {
    setIsFetchingIngredients(true);
    setRecipeDishName(recipeInput.dishName);
    try {
        const availableProductsForAI = products.map(({ id, name, category, quantity }) => ({ id, name, category, quantity }));
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
                title: 'Could not find recipe',
                description: `We could not find any ingredients for "${recipeInput.dishName}". Please try another dish.`,
            });
        }
    } catch (error) {
        console.error("Failed to get ingredients:", error);
        toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: 'We could not get ingredients at this time. Please try again later.',
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
        title: 'Ingredients Added!',
        description: `We've added ${selectedRecipeItems.length} items for ${recipeDishName} to your cart.`,
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
              {selectedCategory && (
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="ghost" size="icon" className="-ml-2" onClick={clearFilters}>
                    <ArrowLeft />
                  </Button>
                  <h2 className="text-xl font-bold">{selectedCategory}</h2>
                </div>
              )}
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
             ) : (
               <div className="text-center py-10">
                   <p className="text-muted-foreground">No products found for "{searchQuery}".</p>
                   {isSuggesting && (
                       <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
                           <Loader2 className="h-4 w-4 animate-spin" />
                           <span>Looking for alternatives...</span>
                       </div>
                   )}
                   {suggestedProducts.length > 0 && !isSuggesting && (
                        <div className="mt-6 text-left">
                           <h3 className="text-xl font-bold mb-4">Similar Products You Might Like</h3>
                           <ProductGrid products={suggestedProducts} />
                       </div>
                   )}
                   {!isSuggesting && suggestedProducts.length === 0 && (
                       <p className="text-sm text-muted-foreground/80 mt-2">Try a different search term.</p>
                   )}
               </div>
             )}
           </>
          ) : (
            <>
              <SparkVoiceCta />
              <SparkSaverCta />
              <RefillReminderCta />
              <CommunityCta />
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
            <DialogTitle>Recipe for {recipeDishName}</DialogTitle>
            <DialogDescription>
              Review your shopping list and the recipe instructions below.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="shopping-list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shopping-list">Shopping List ({selectedRecipeItems.length})</TabsTrigger>
              <TabsTrigger value="recipe">Recipe</TabsTrigger>
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
                        Select All
                    </Label>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-3">
                    {recipeResult?.shoppableItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <Checkbox 
                            id={`item-${index}`} 
                            checked={selectedRecipeItems.some(selected => selected.product === item.product)}
                            onCheckedChange={() => handleRecipeItemToggle(item)}
                        />
                        <Label htmlFor={`item-${index}`} className="flex justify-between w-full text-sm font-normal cursor-pointer">
                            <span>{item.product}</span>
                            <span className="text-muted-foreground">{item.quantity}</span>
                        </Label>
                    </div>
                    ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recipe" className="mt-4">
                <div className="max-h-[22rem] overflow-y-auto space-y-4 pr-4 text-sm">
                    <div>
                        <h4 className="font-semibold mb-2 text-base">Ingredients</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {recipeResult?.ingredients.map((item, index) => (
                            <li key={index}><span className="font-medium text-foreground">{item.quantity}</span> {item.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-base">Instructions</h4>
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
                    Watch Recipe Video
                  </Link>
                </Button>
              )}
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddToCartFromRecipe} disabled={selectedRecipeItems.length === 0}>
                    Add {selectedRecipeItems.length} {selectedRecipeItems.length === 1 ? 'Item' : 'Items'} to Cart
                </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
