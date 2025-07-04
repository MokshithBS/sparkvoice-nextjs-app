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
import { suggestProducts } from '@/ai/flows/product-suggester-flow';
import { Loader2, ArrowLeft, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShopByRecipe } from '@/components/store/shop-by-recipe';
import { getIngredientsForDish } from '@/ai/flows/recipe-to-cart-flow';
import type { ListParserOutputItem } from '@/ai/schemas/list-parser-schemas';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';


export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isFetchingIngredients, setIsFetchingIngredients] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState<ListParserOutputItem[] | null>(null);
  const [recipeDishName, setRecipeDishName] = useState('');

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

  const handleAddToCartFromRecipe = () => {
    if (recipeIngredients) {
      addToCartBatch(recipeIngredients);
      toast({
        title: 'Ingredients Added!',
        description: `We've added the items for ${recipeDishName} to your cart.`,
      });
      setRecipeIngredients(null);
      setRecipeDishName('');
    }
  };

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
              <DiwaliBanner />
              <ShopByRecipe onSubmit={handleGetIngredients} isLoading={isFetchingIngredients} />
              <CategoryGrid onSelectCategory={handleCategorySelect} />
            </>
          )}
        </main>
        <ShoppingList />
      </div>

       <AlertDialog open={!!recipeIngredients} onOpenChange={(isOpen) => !isOpen && setRecipeIngredients(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ingredients for {recipeDishName}</AlertDialogTitle>
            <AlertDialogDescription>
              Here is a suggested list of ingredients. Add them all to your cart or cancel.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="max-h-60 overflow-y-auto pr-2 space-y-2 my-4">
            {recipeIngredients?.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-muted/50 p-2 rounded-md text-sm">
                <span className="font-medium">{item.product}</span>
                <span className="text-muted-foreground">{item.quantity}</span>
              </div>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddToCartFromRecipe}>Add All to Cart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
