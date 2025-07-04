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
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

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
              <CategoryGrid onSelectCategory={handleCategorySelect} />
            </>
          )}
        </main>
        <ShoppingList />
      </div>
    </div>
  );
}
