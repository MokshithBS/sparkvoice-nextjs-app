'use client';
import { useState, useMemo, useEffect } from 'react';
import { DiwaliBanner } from '@/components/store/diwali-banner';
import { LocationHeader } from '@/components/store/location-header';
import { SearchBar } from '@/components/store/search-bar';
import { CategoryGrid } from '@/components/store/category-grid';
import { ShoppingList } from '@/components/store/shopping-list';
import { ProductGrid } from '@/components/store/product-grid';
import { products, type Product } from '@/lib/products';
import { SparkVoiceCta } from '@/components/store/spark-voice-cta';
import { SparkSaverCta } from '@/components/store/spark-saver-cta';
import { suggestProducts } from '@/ai/flows/product-suggester-flow';
import { Loader2, ArrowLeft, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShopByRecipe } from '@/components/store/shop-by-recipe';
import { getIngredientsForDish } from '@/ai/flows/recipe-to-cart-flow';
import type { ListParserOutputItem } from '@/ai/schemas/list-parser-schemas';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';


export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isFetchingIngredients, setIsFetchingIngredients] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState<ListParserOutputItem[] | null>(null);
  const [recipeDishName, setRecipeDishName] = useState('');
  const [selectedRecipeItems, setSelectedRecipeItems] = useState<ListParserOutputItem[]>([]);

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

  const handleGetIngredients = async (dishName: string) => {
    setIsFetchingIngredients(true);
    setRecipeDishName(dishName);
    try {
        const result = await getIngredientsForDish({ dishName });
        if (result.items.length > 0) {
            setRecipeIngredients(result.items);
            setSelectedRecipeItems(result.items); // Select all by default
        } else {
            toast({
                variant: 'destructive',
                title: 'Could not find recipe',
                description: `We could not find any ingredients for "${dishName}". Please try another dish.`,
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
  
  const handleRecipeItemToggle = (item: ListParserOutputItem) => {
    setSelectedRecipeItems(prev =>
      prev.some(i => i.product === item.product)
        ? prev.filter(i => i.product !== item.product)
        : [...prev, item]
    );
  };

  const handleSelectAllRecipeItems = (checked: boolean) => {
    if (checked) {
      setSelectedRecipeItems(recipeIngredients || []);
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
      setRecipeIngredients(null);
      setSelectedRecipeItems([]);
      setRecipeDishName('');
    }
  };

  const closeRecipeDialog = () => {
      setRecipeIngredients(null);
      setSelectedRecipeItems([]);
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
              <DiwaliBanner />
              <ShopByRecipe onSubmit={handleGetIngredients} isLoading={isFetchingIngredients} />
              <CategoryGrid onSelectCategory={handleCategorySelect} />
            </>
          )}
        </main>
        <ShoppingList />
      </div>

       <Dialog open={!!recipeIngredients} onOpenChange={(isOpen) => !isOpen && closeRecipeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ingredients for {recipeDishName}</DialogTitle>
            <DialogDescription>
              Select the ingredients you need and add them to your cart.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pr-2 my-4">
             <div className="flex items-center space-x-3 border-b pb-2 mb-2">
                <Checkbox
                    id="select-all"
                    checked={recipeIngredients?.length === selectedRecipeItems.length && selectedRecipeItems.length > 0}
                    onCheckedChange={(checked) => handleSelectAllRecipeItems(!!checked)}
                />
                <Label htmlFor="select-all" className="font-medium text-sm">
                    Select All
                </Label>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-3">
                {recipeIngredients?.map((item, index) => (
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddToCartFromRecipe} disabled={selectedRecipeItems.length === 0}>
                Add {selectedRecipeItems.length} {selectedRecipeItems.length === 1 ? 'Item' : 'Items'} to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
