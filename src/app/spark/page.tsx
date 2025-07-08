
'use client';

import { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Camera, FileText, Loader2, Mic, Bot, Sparkles, StopCircle, Trash2, Video, Volume2, Receipt, AlertCircle, Globe } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { parseList } from '@/ai/flows/list-parser-flow';
import { parseVoiceList } from '@/ai/flows/voice-list-parser-flow';
import { parseTextList } from '@/ai/flows/text-list-parser-flow';
import { generateContextualCart } from '@/ai/flows/spark-saver-flow.ts';
import { compareBill } from '@/ai/flows/price-match-flow.ts';
import { products } from '@/lib/products';
import { getIngredientsForDish, type RecipeToCartOutput } from '@/ai/flows/recipe-to-cart-flow.ts';

import { type ListParserOutput, type ListParserOutputItem } from '@/ai/schemas/list-parser-schemas';
import { type PriceMatchOutput } from '@/ai/schemas/price-match-schemas';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import type { Language } from '@/lib/translations';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

const CameraView = ({ onCapture, onClose, videoRef, hasCameraPermission }: { onCapture: () => void, onClose: () => void, videoRef: React.RefObject<HTMLVideoElement>, hasCameraPermission: boolean | null }) => (
    <div className="space-y-4 text-center">
      <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
        {hasCameraPermission === false && (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-background/80">
            <Alert variant="destructive">
              <Camera className="h-4 w-4" />
              <AlertTitle>Camera Access Denied</AlertTitle>
              <AlertDescription>
                Please enable camera access in your browser settings to use this feature.
              </AlertDescription>
            </Alert>
          </div>
        )}
        {hasCameraPermission === null && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <Button onClick={onCapture} size="lg" disabled={!hasCameraPermission}>
          <Camera className="mr-2" /> Capture
        </Button>
        <Button onClick={onClose} variant="outline" size="lg">Cancel</Button>
      </div>
    </div>
  );

function SparkPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get('tab') || 'scan';
  const context = searchParams.get('context');

  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [textList, setTextList] = useState('');
  const [parsedItems, setParsedItems] = useState<ListParserOutput['items']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [confirmationText, setConfirmationText] = useState<string | null>(null);
  const [priceMatchResult, setPriceMatchResult] = useState<PriceMatchOutput | null>(null);
  const [recipeResult, setRecipeResult] = useState<RecipeToCartOutput | null>(null);

  // Context to Cart state
  const [contextualQuery, setContextualQuery] = useState('');
  
  const { toast } = useToast();
  const { addToCartBatch } = useCart();
  const { t, languageNames, setLanguage, language } = useLanguage();
  
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [languagePrompt, setLanguagePrompt] = useState<{ show: boolean, languageName: string, langCode: Language } | null>(null);

  useEffect(() => {
    const cleanupStream = () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        if(videoRef.current) videoRef.current.srcObject = null;
      }
    };

    if (isCameraOpen) {
      setHasCameraPermission(null);
      if (!navigator.mediaDevices?.getUserMedia) {
        console.error('Camera API not supported in this browser.');
        toast({ variant: 'destructive', title: 'Not Supported', description: 'Your browser does not support camera access.' });
        setHasCameraPermission(false);
        return;
      }
      
      let isCancelled = false;
      
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (isCancelled) {
            stream.getTracks().forEach(track => track.stop());
            return;
          }
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setHasCameraPermission(true);
        })
        .catch(error => {
          if (isCancelled) return;
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
        });

      return () => {
        isCancelled = true;
        cleanupStream();
      };
    } else {
        cleanupStream();
    }
  }, [isCameraOpen, toast]);


  const handleCloseCamera = useCallback(() => {
    setIsCameraOpen(false);
  }, []);

  const resetState = useCallback(() => {
    setParsedItems([]);
    setPhotoDataUri(null);
    setTextList('');
    setIsLoading(false);
    setConfirmationText(null);
    setContextualQuery('');
    setPriceMatchResult(null);
    setRecipeResult(null);
    setLanguagePrompt(null);
    if (isCameraOpen) handleCloseCamera();
  }, [isCameraOpen, handleCloseCamera]);

  useEffect(() => {
    const tabFromQuery = searchParams.get('tab');
    if (tabFromQuery) {
        setActiveTab(tabFromQuery);
        resetState();
    }
  }, [searchParams, resetState]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          setTextList(text);
        }
      };
      reader.onerror = (e) => {
        console.error("Error reading file:", e);
        toast({
            variant: 'destructive',
            title: 'File Read Error',
            description: 'Could not read the selected file.',
        });
      }
      reader.readAsText(file);
    }
  };

  const processAndConfirmList = async (result: ListParserOutput) => {
    if (!result || result.items.length === 0) {
        toast({
            variant: 'destructive',
            title: 'No items found',
            description: 'We could not find any items in your list. Please try again.',
        });
        setParsedItems([]);
        return;
    }

    setParsedItems(result.items);
    setConfirmationText(result.confirmationText);
    
    if (result.detectedLanguage) {
      const langCode = result.detectedLanguage.split('-')[0] as Language;
      if (langCode !== language && translations[langCode]) {
        setLanguagePrompt({
          show: true,
          languageName: languageNames[langCode] || langCode,
          langCode: langCode,
        });
      }
    }
  };

  const handleParseList = async () => {
    if (!photoDataUri) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload or capture a photo of your shopping list first.',
      });
      return;
    }

    setIsLoading(true);
    resetViewStates();

    try {
      if (context === 'recipe') {
        const availableProductsForAI = products.map(({ id, name, category, quantity }) => ({ id, name, category, quantity }));
        const result = await getIngredientsForDish({
          dishName: `the dish in this image: ${photoDataUri}`,
          servingSize: 4,
          specialRequests: '',
          availableProducts: availableProductsForAI,
        });
        setRecipeResult(result);
      } else {
        const result = await parseList({ photoDataUri });
        await processAndConfirmList(result);
      }
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

  const handleParseTextList = async () => {
    if (!textList.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty List',
        description: 'Please type or paste your shopping list first.',
      });
      return;
    }

    setIsLoading(true);
    resetViewStates();
    try {
      const result = await parseTextList({ textList });
      await processAndConfirmList(result);
    } catch (error) {
      console.error('Error parsing text list:', error);
      toast({
        variant: 'destructive',
        title: 'Parsing Failed',
        description: 'Could not read the shopping list. Please check the format.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64data = reader.result as string;
            if (context === 'recipe') {
                setIsLoading(true);
                resetViewStates();
                try {
                    const availableProductsForAI = products.map(({ id, name, category, quantity }) => ({ id, name, category, quantity }));
                    const voiceTextResult = await parseVoiceList({ audioDataUri: base64data });
                    const dishName = voiceTextResult.items.map(i => `${i.product} ${i.quantity}`).join(' ');

                    if (!dishName) {
                        toast({ variant: 'destructive', title: 'Could not understand dish name', description: 'Please try speaking the name of the dish again.' });
                        setIsLoading(false);
                        return;
                    }

                    const result = await getIngredientsForDish({
                        dishName: dishName,
                        servingSize: 4,
                        specialRequests: '',
                        availableProducts: availableProductsForAI,
                    });
                    setRecipeResult(result);
                } catch (error) {
                    console.error("Error getting recipe from voice:", error);
                    toast({ variant: 'destructive', title: 'Recipe Not Found', description: 'We could not find a recipe for what you said.' });
                } finally {
                    setIsLoading(false);
                }
            } else {
                handleParseVoiceList(base64data);
            }
          };
          audioChunksRef.current = [];
          stream.getTracks().forEach(track => track.stop());
        };
        audioChunksRef.current = [];
        mediaRecorderRef.current.start();
      } catch (err) {
        console.error('Error accessing microphone:', err);
        toast({ variant: 'destructive', title: 'Microphone Access Denied', description: 'Please allow microphone access to use this feature.' });
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleParseVoiceList = async (audioDataUri: string) => {
    setIsLoading(true);
    resetViewStates();
    try {
      const result = await parseVoiceList({ audioDataUri });
      await processAndConfirmList(result);
    } catch (error) {
      console.error('Error parsing voice list:', error);
      toast({ variant: 'destructive', title: 'Parsing Failed', description: 'Could not understand the shopping list. Please try speaking clearly.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContextToCart = async () => {
    if (!contextualQuery.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please describe what you need.',
      });
      return;
    }
    setIsLoading(true);
    resetViewStates();
    try {
      const availableProductsForAI = products.map(({ id, name, category, price, quantity }) => ({ id, name, category, price, salePrice: price, quantity }));
      const result = await generateContextualCart({
        query: contextualQuery,
        availableProducts: availableProductsForAI,
      });

      if (!result || result.items.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Could Not Generate Cart',
          description: "We couldn't generate a cart for your request. Please try being more specific.",
        });
        setParsedItems([]);
        return;
      }
      
      await processAndConfirmList({
        items: result.items,
        detectedLanguage: 'en-IN',
        confirmationText: result.summaryText,
      });

    } catch (error) {
      console.error('Error generating contextual cart:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'We could not build your cart at this time. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePriceMatch = async () => {
    if (!photoDataUri) {
        toast({ variant: 'destructive', title: 'No Bill Photo', description: 'Please upload or capture a photo of your bill first.' });
        return;
    }
    setIsLoading(true);
    resetViewStates();
    try {
        const availableProductsForAI = products.map(({ id, name, category, price, quantity }) => ({ id, name, category, price, salePrice: price, quantity }));
        const result = await compareBill({
            billPhotoDataUri: photoDataUri,
            availableProducts: availableProductsForAI
        });
        
        if (!result || !result.comparisonItems) {
            toast({ variant: 'destructive', title: 'Analysis Failed', description: 'We could not analyze your bill. Please try a clearer photo.' });
            return;
        }

        setPriceMatchResult(result);

    } catch (error) {
        console.error("Error comparing bill:", error);
        toast({ variant: 'destructive', title: 'Analysis Failed', description: 'An error occurred while comparing prices. Please try again.' });
    } finally {
        setIsLoading(false);
    }
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
    setPhotoDataUri(null);
  };

  const handleCapture = () => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/png');
        if (dataUri && dataUri !== 'data:,') {
          setPhotoDataUri(dataUri);
          handleCloseCamera();
        } else {
          toast({
            variant: 'destructive',
            title: 'Capture Failed',
            description: 'Could not capture image from camera. Please try again.',
          });
        }
      }
    } else {
        toast({
            variant: 'destructive',
            title: 'Camera Not Ready',
            description: 'Please wait a moment for the camera to initialize.',
        });
    }
  };

  const handleItemChange = (index: number, field: keyof ListParserOutputItem, value: string) => {
    const newItems = [...parsedItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setParsedItems(newItems);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = parsedItems.filter((_, i) => i !== index);
    setParsedItems(newItems);
  };
  
  const handleConfirmList = () => {
    addToCartBatch(parsedItems);
    router.push('/cart');
  };

  const handleTabChange = (tab: string) => {
    resetState();
    setActiveTab(tab);
  };

  const resetViewStates = () => {
    setParsedItems([]);
    setConfirmationText(null);
    setPriceMatchResult(null);
    setRecipeResult(null);
    setLanguagePrompt(null);
  }

  const startOver = () => {
    resetViewStates();
    setPhotoDataUri(null);
  }

  const handleLanguageSwitch = () => {
    if (languagePrompt) {
      setLanguage(languagePrompt.langCode);
      toast({
        title: "Language Switched!",
        description: `The app is now in ${languagePrompt.languageName}.`,
      });
      setLanguagePrompt(null);
    }
  };

  const hasParsedListResult = parsedItems.length > 0;
  const hasPriceMatchResult = !!priceMatchResult;
  const hasRecipeResult = !!recipeResult;
  const showResultPage = hasParsedListResult || hasPriceMatchResult || hasRecipeResult;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/store">
              <ArrowLeft />
              <span className="sr-only">Back to Store</span>
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
          {showResultPage ? (
            <div>
              <Card>
                {hasParsedListResult && (
                    <>
                    <CardHeader>
                        <CardTitle>Confirm Your List</CardTitle>
                        <CardDescription>We've parsed your list. Please review and make any edits below before adding items to your cart.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {languagePrompt?.show && (
                            <Alert className="mb-4">
                                <Globe className="h-4 w-4" />
                                <AlertTitle>{t('language.switch.prompt.title')}</AlertTitle>
                                <AlertDescription>
                                    {t('language.switch.prompt.description', { language: languagePrompt.languageName })}
                                </AlertDescription>
                                <div className="flex gap-4 mt-4">
                                    <Button onClick={handleLanguageSwitch}>
                                        {t('language.switch.prompt.yes')}
                                    </Button>
                                    <Button variant="ghost" onClick={() => setLanguagePrompt(null)}>
                                        {t('language.switch.prompt.no')}
                                    </Button>
                                </div>
                            </Alert>
                        )}
                        {confirmationText && (
                            <div className="flex items-center gap-4 p-3 bg-secondary/20 rounded-lg">
                                {/* <Volume2 className="text-primary flex-shrink-0" /> */}
                                <p className="flex-1 text-sm text-secondary-foreground">{confirmationText}</p>
                            </div>
                        )}
                        <div className="space-y-3">
                            <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center text-sm font-medium text-muted-foreground px-2">
                                <span>Product</span>
                                <span>Quantity</span>
                                <span className="w-8"></span>
                            </div>
                            {parsedItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                                <Input value={item.product} onChange={(e) => handleItemChange(index, 'product', e.target.value)} className="w-full" aria-label="Product" />
                                <Input value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} className="w-24" aria-label="Quantity" />
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(index)} aria-label="Delete item"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <Button variant="outline" onClick={startOver}>Start Over</Button>
                            <Button onClick={handleConfirmList} size="lg">Confirm & Add to Cart</Button>
                        </div>
                    </CardContent>
                    </>
                )}
                 {hasPriceMatchResult && priceMatchResult && (
                    <>
                    <CardHeader>
                        <CardTitle>Price Match Results</CardTitle>
                        <CardDescription>Here's how our prices stack up against your local store bill.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Alert variant={priceMatchResult.totalSavings > 0 ? 'default' : 'default'} className={priceMatchResult.totalSavings > 0 ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300" : ""}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Summary</AlertTitle>
                            <AlertDescription>{priceMatchResult.summaryText}</AlertDescription>
                        </Alert>

                        {priceMatchResult.couponCode && (
                            <div className="text-center p-4 border-2 border-dashed border-primary rounded-lg">
                                <p className="text-muted-foreground">Your Coupon Code</p>
                                <p className="text-2xl font-bold text-primary tracking-widest">{priceMatchResult.couponCode}</p>
                            </div>
                        )}
                
                        <div className="space-y-3">
                            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center text-sm font-medium text-muted-foreground px-2">
                                <span>Item</span>
                                <span className="text-right">Store Price</span>
                                <span className="text-right">Our Price</span>
                                <span className="text-right">You Save</span>
                            </div>
                            {priceMatchResult.comparisonItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center text-sm p-2 rounded-md bg-secondary/50">
                                <span className="font-medium truncate">{item.productName}</span>
                                <span className="text-right text-muted-foreground">₹{item.offlinePrice.toFixed(2)}</span>
                                <span className="text-right font-semibold">₹{item.onlinePrice.toFixed(2)}</span>
                                <span className={`text-right font-bold ${item.saving > 0 ? 'text-green-600' : ''}`}>₹{item.saving.toFixed(2)}</span>
                            </div>
                            ))}
                              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center text-sm font-bold text-foreground px-2 border-t pt-2 mt-2">
                                <span>Total</span>
                                <span className="text-right">₹{priceMatchResult.totalOfflineCost.toFixed(2)}</span>
                                <span className="text-right">₹{priceMatchResult.totalOnlineCost.toFixed(2)}</span>
                                <span className="text-right text-green-600">₹{priceMatchResult.totalSavings.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <Button variant="outline" onClick={startOver}>Start Over</Button>
                            <Button onClick={() => router.push('/store')} size="lg">Shop Now & Save</Button>
                        </div>
                    </CardContent>
                    </>
                )}
                 {hasRecipeResult && recipeResult && (
                    <>
                        <CardHeader>
                            <CardTitle>Your Recipe & Shopping List</CardTitle>
                            <CardDescription>
                                We've generated your recipe and a practical shopping list. Review and add to cart!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="flex items-center gap-4 p-3 bg-secondary/20 rounded-lg">
                                <Volume2 className="text-primary flex-shrink-0" />
                                <p className="flex-1 text-sm text-secondary-foreground">{recipeResult.confirmationText}</p>
                            </div>
                            <div className="space-y-3 mt-4">
                                <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center text-sm font-medium text-muted-foreground px-2">
                                    <span>Product</span>
                                    <span>Quantity</span>
                                    <span className="w-8"></span>
                                </div>
                                {recipeResult.shoppableItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                                    <Input defaultValue={item.product} className="w-full" aria-label="Product" />
                                    <Input defaultValue={item.quantity} className="w-24" aria-label="Quantity" />
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(index)} aria-label="Delete item"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-4 border-t">
                                <Button variant="outline" onClick={startOver}>Start Over</Button>
                                <Button onClick={() => handleConfirmList()} size="lg">Add to Cart</Button>
                            </div>
                        </CardContent>
                    </>
                 )}
              </Card>
            </div>
          ) : (
            <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="scan" className="gap-2"><Camera /> Scan</TabsTrigger>
                <TabsTrigger value="context" className="gap-2"><Bot /> AI Assistant</TabsTrigger>
                <TabsTrigger value="match" className="gap-2"><Receipt /> Price Match</TabsTrigger>
                <TabsTrigger value="speak" className="gap-2"><Mic /> Speak</TabsTrigger>
                <TabsTrigger value="type" className="gap-2"><FileText /> Type</TabsTrigger>
              </TabsList>
              
              <TabsContent value="scan">
                <Card>
                  <CardHeader>
                    {context === 'recipe' ? (
                        <>
                            <CardTitle className="flex items-center gap-2">Scan Your Recipe</CardTitle>
                            <CardDescription>Capture a photo of a recipe from a cookbook or website to get all the ingredients.</CardDescription>
                        </>
                    ) : (
                        <>
                            <CardTitle className="flex items-center gap-2">Scan Your List</CardTitle>
                            <CardDescription>Capture a photo of your handwritten list or upload an image to build your cart instantly.</CardDescription>
                        </>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className={cn("space-y-6", isCameraOpen && "hidden")}>
                        <div className="relative aspect-video w-full flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                        {photoDataUri ? (
                            <Image src={photoDataUri} alt="Preview" fill className="object-contain rounded-lg" />
                        ) : (
                            <p className="text-muted-foreground">Image preview will appear here</p>
                        )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="list-photo" className="sr-only">Upload from Device</Label>
                            <Button asChild variant="outline" className="w-full">
                                <label htmlFor="list-photo-scan" className="cursor-pointer">
                                    <FileText className="mr-2" /> Upload Photo
                                </label>
                            </Button>
                            <Input id="list-photo-scan" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} disabled={isLoading}/>
                        </div>
                        <Button onClick={handleOpenCamera} variant="outline" disabled={isLoading}>
                            <Camera className="mr-2" /> Open Camera
                        </Button>
                        </div>
                        <Button onClick={handleParseList} disabled={isLoading || !photoDataUri} className="w-full" size="lg">
                            {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Parsing your list...</> ) : ( <><Sparkles className="mr-2 h-4 w-4" /> Spark It!</> )}
                        </Button>
                    </div>

                    <div className={cn(isCameraOpen ? "block" : "hidden", "space-y-4 text-center")}>
                        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                            {hasCameraPermission === false && (
                            <div className="absolute inset-0 flex items-center justify-center p-4 bg-background/80">
                                <Alert variant="destructive">
                                <Camera className="h-4 w-4" />
                                <AlertTitle>Camera Access Denied</AlertTitle>
                                <AlertDescription>
                                    Please enable camera access in your browser settings to use this feature.
                                </AlertDescription>
                                </Alert>
                            </div>
                            )}
                            {hasCameraPermission === null && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                            )}
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button onClick={handleCapture} size="lg" disabled={!hasCameraPermission}>
                            <Camera className="mr-2" /> Capture
                            </Button>
                            <Button onClick={handleCloseCamera} variant="outline" size="lg">Cancel</Button>
                        </div>
                        </div>

                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="match">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">Price Match Your Bill</CardTitle>
                    <CardDescription>Upload a photo of a recent grocery bill to see if you could have saved money with us.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className={cn("space-y-6", isCameraOpen && "hidden")}>
                        <div className="relative aspect-video w-full flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                        {photoDataUri ? (
                            <Image src={photoDataUri} alt="Bill preview" fill className="object-contain rounded-lg" />
                        ) : (
                            <p className="text-muted-foreground">Bill preview will appear here</p>
                        )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                             <Label htmlFor="bill-photo" className="sr-only">Upload Bill Photo</Label>
                            <Button asChild variant="outline" className="w-full">
                                <label htmlFor="bill-photo-upload" className="cursor-pointer">
                                    <FileText className="mr-2" /> Upload Photo
                                </label>
                            </Button>
                            <Input id="bill-photo-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} disabled={isLoading}/>
                        </div>
                        <Button onClick={handleOpenCamera} variant="outline" disabled={isLoading}>
                            <Camera className="mr-2" /> Open Camera
                        </Button>
                        </div>
                        <Button onClick={handlePriceMatch} disabled={isLoading || !photoDataUri} className="w-full" size="lg">
                            {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing your bill...</> ) : ( <><Sparkles className="mr-2 h-4 w-4" /> Compare Prices</> )}
                        </Button>
                    </div>
                     <div className={cn(isCameraOpen ? "block" : "hidden", "space-y-4 text-center")}>
                        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                            {hasCameraPermission === false && (
                            <div className="absolute inset-0 flex items-center justify-center p-4 bg-background/80">
                                <Alert variant="destructive">
                                <Camera className="h-4 w-4" />
                                <AlertTitle>Camera Access Denied</AlertTitle>
                                <AlertDescription>
                                    Please enable camera access in your browser settings to use this feature.
                                </AlertDescription>
                                </Alert>
                            </div>
                            )}
                            {hasCameraPermission === null && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                            )}
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button onClick={handleCapture} size="lg" disabled={!hasCameraPermission}>
                            <Camera className="mr-2" /> Capture
                            </Button>
                            <Button onClick={handleCloseCamera} variant="outline" size="lg">Cancel</Button>
                        </div>
                        </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="context">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">AI Shopping Assistant</CardTitle>
                    <CardDescription>Describe a scenario (e.g., "weekend party," "healthy snacks for kids") and let our AI build a cart for you.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <Label htmlFor="context-query">What do you need?</Label>
                       <Textarea id="context-query" placeholder="e.g.&#10;Planning a birthday party for 8 people&#10;Need healthy brain food for kids' exams&#10;It's raining, I want comfort food" value={contextualQuery} onChange={(e) => setContextualQuery(e.target.value)} className="min-h-[150px]" disabled={isLoading}/>
                    </div>
                    <Button onClick={handleContextToCart} disabled={isLoading || !contextualQuery.trim()} className="w-full" size="lg">
                      {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Building your cart...</>) : (<><Sparkles className="mr-2 h-4 w-4" /> Generate Cart</>)}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="speak">
                <Card>
                  <CardHeader>
                    {context === 'recipe' ? (
                        <>
                            <CardTitle className="flex items-center gap-2">Speak Your Recipe</CardTitle>
                            <CardDescription>Press record, speak the name of the dish you want to cook, and we'll find the ingredients.</CardDescription>
                        </>
                    ) : (
                        <>
                            <CardTitle className="flex items-center gap-2">Voice Shopping Assistant</CardTitle>
                            <CardDescription>Press record and speak your order. Try saying "Refill my last order" or "Add 5kg atta and 1 liter milk."</CardDescription>
                        </>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6 flex flex-col items-center">
                    <Button onClick={isRecording ? handleStopRecording : handleStartRecording} disabled={isLoading} className="w-48 h-16 text-lg" variant={isRecording ? 'destructive' : 'default'} size="lg">
                      {isRecording ? ( <><StopCircle className="mr-2 h-6 w-6" /> Stop</> ) : ( <><Mic className="mr-2 h-6 w-6" /> Record</> )}
                    </Button>
                    {isRecording && <p className="text-sm text-muted-foreground animate-pulse">Recording... speak now!</p>}
                    {isLoading && <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Processing your voice...</p>}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="type">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">Type or Import Your List</CardTitle>
                    <CardDescription>Type your list, paste from your notes, or upload a text file directly.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="notes-file">Import from Notes (.txt)</Label>
                      <Input id="notes-file" type="file" accept="text/plain" onChange={handleTextFileChange} className="file:text-foreground" disabled={isLoading}/>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text-list">Type or Paste Your List</Label>
                      <Textarea id="text-list" placeholder="e.g.&#10;2 kg Onions&#10;1 dozen Eggs&#10;Milk" value={textList} onChange={(e) => setTextList(e.target.value)} className="min-h-[150px]" disabled={isLoading}/>
                    </div>
                    <Button onClick={handleParseTextList} disabled={isLoading || !textList.trim()} className="w-full" size="lg">
                       {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Parsing...</> ) : ( <><Sparkles className="mr-2 h-4 w-4" /> Spark It!</> )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SparkPage() {
  return (
    <Suspense>
      <SparkPageComponent />
    </Suspense>
  )
}
