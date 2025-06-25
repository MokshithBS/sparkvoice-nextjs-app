'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Camera, Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { parseList } from '@/ai/flows/list-parser-flow';
import { type ListParserOutput } from '@/ai/schemas/list-parser-schemas';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SparkPage() {
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [parsedItems, setParsedItems] = useState<ListParserOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string);
        setParsedItems(null); // Reset previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const handleParseList = async () => {
    if (!photoDataUri) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload a photo of your shopping list first.',
      });
      return;
    }

    setIsLoading(true);
    setParsedItems(null);

    try {
      const result = await parseList({ photoDataUri });
      setParsedItems(result);
    } catch (error) {
      console.error('Error parsing list:', error);
      toast({
        variant: 'destructive',
        title: 'Parsing Failed',
        description: 'Could not read the shopping list. Please try a clearer image.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Back to Home</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold font-headline flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span>Try SparkVoice</span>
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Camera /> Scan Your List</CardTitle>
              <CardDescription>Upload a picture of your handwritten shopping list and let our AI build your cart instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="list-photo">Upload Photo</Label>
                <Input id="list-photo" type="file" accept="image/*" onChange={handleFileChange} className="file:text-foreground"/>
              </div>

              {photoDataUri && (
                <div className="flex justify-center">
                  <Image
                    src={photoDataUri}
                    alt="Shopping list preview"
                    width={400}
                    height={300}
                    className="rounded-lg object-contain border"
                  />
                </div>
              )}

              <Button onClick={handleParseList} disabled={isLoading || !photoDataUri} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Parsing your list...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Spark It!
                  </>
                )}
              </Button>

              {parsedItems && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Here's what we found:</h3>
                  {parsedItems.items.length > 0 ? (
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parsedItems.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.product}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                   ) : (
                    <p className="text-muted-foreground text-center py-4">We couldn't find any items on your list. Please try another image.</p>
                   )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
