
'use client';
import { ProductGrid } from '@/components/store/product-grid';
import { products, type Product } from '@/lib/products';
import { ArrowLeft, Sparkles, Loader2, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useMemo, useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generatePersonalizedSale } from '@/ai/flows/personalized-sale-flow';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function SalePage() {
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [profession, setProfession] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState<Product[]>([]);
  const [otherSaleItems, setOtherSaleItems] = useState<Product[]>([]);
  const [summaryText, setSummaryText] = useState('');

  const allSaleProducts = useMemo(() => {
    return products.filter(p => p.salePrice);
  }, []);

  useEffect(() => {
    // Initially, show all sale items until personalization happens
    setOtherSaleItems(allSaleProducts);
  }, [allSaleProducts]);
  

  const handlePersonalize = async () => {
    if (!profession.trim()) {
      toast({
        variant: 'destructive',
        title: 'Profession Required',
        description: 'Please enter your profession to get personalized deals.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const availableProductsForAI = allSaleProducts.map(({ id, name, category, price, salePrice }) => ({ id, name, category, price: salePrice || price }));
      
      const result = await generatePersonalizedSale({
        profession,
        availableProducts: availableProductsForAI,
      });

      if (result.suggestionIds && result.suggestionIds.length > 0) {
        const suggestions = allSaleProducts.filter(p => result.suggestionIds.includes(p.id));
        const restOfItems = allSaleProducts.filter(p => !result.suggestionIds.includes(p.id));
        setPersonalizedSuggestions(suggestions);
        setOtherSaleItems(restOfItems);
        setSummaryText(result.summaryText);
      } else {
         setPersonalizedSuggestions([]);
         setOtherSaleItems(allSaleProducts);
         toast({
            title: "No specific deals found",
            description: "We couldn't find special deals for your profession, but here are all our great offers!",
        });
      }
      setIsModalOpen(false);

    } catch (error) {
      console.error("Failed to get personalized sale:", error);
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'We could not get personalized deals at this time. Please try again.',
      });
      setIsModalOpen(false); // Close modal on error to show all deals
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    setIsModalOpen(false);
    setPersonalizedSuggestions([]);
    setOtherSaleItems(allSaleProducts);
  };
  
  return (
    <>
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/30 backdrop-blur-lg">
          <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/store">
                <ArrowLeft />
                <span className="sr-only">Back to Store</span>
              </Link>
            </Button>
            <h1 className="text-xl font-bold font-headline flex items-center gap-2 text-accent">
              <Sparkles className="w-6 h-6 text-accent" />
              <span>Grand Sparkathon Sale</span>
              <Sparkles className="w-6 h-6 text-accent" />
            </h1>
            <div className="w-8"></div>
          </div>
        </header>

        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground drop-shadow-md">Unbeatable Deals!</h2>
                <p className="mt-2 text-lg text-muted-foreground">Grab them before they're gone. Up to 50% OFF on your favorite brands.</p>
            </div>

            {summaryText && (
                <Alert className="mb-8">
                  <Award className="h-5 w-5 text-primary" />
                  <AlertTitle className="font-bold">Deals Curated For You!</AlertTitle>
                  <AlertDescription>
                    {summaryText}
                  </AlertDescription>
                </Alert>
            )}
            
            {personalizedSuggestions.length > 0 && (
                <>
                    <h3 className="text-2xl font-bold mb-4">Your Personalized Deals</h3>
                    <ProductGrid products={personalizedSuggestions} />
                    <Separator className="my-8 bg-border" />
                    <h3 className="text-2xl font-bold mb-4">All Sale Items</h3>
                </>
            )}
            
            <ProductGrid products={otherSaleItems} />

          </div>
        </main>
      </div>

       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> Personalize Your Sale!</DialogTitle>
            <DialogDescription>
              Tell us your profession and we'll curate the best deals for you.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profession" className="text-right">
                I'm a...
              </Label>
              <Input
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="e.g., Student, Doctor"
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={handleSkip} disabled={isLoading}>Skip</Button>
            <Button onClick={handlePersonalize} disabled={isLoading || !profession.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Deals...
                </>
              ) : "Find My Deals"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
