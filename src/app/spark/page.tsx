
'use client';

import { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Camera, FileText, Loader2, Mic, PiggyBank, Sparkles, StopCircle, Trash2, Video, Volume2, Receipt, AlertCircle, Globe } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { parseList } from '@/ai/flows/list-parser-flow';
import { parseVoiceList } from '@/ai/flows/voice-list-parser-flow';
import { parseTextList } from '@/ai/flows/text-list-parser-flow';
import { generateSpeech } from '@/ai/flows/tts-flow';
import { generateSparkSaverCart } from '@/ai/flows/spark-saver-flow';
import { compareBill } from '@/ai/flows/price-match-flow';
import { products } from '@/lib/products';
import { getIngredientsForDish } from '@/ai/flows/recipe-to-cart-flow';

import { type ListParserOutput, type ListParserOutputItem } from '@/ai/schemas/list-parser-schemas';
import { type PriceMatchOutput } from '@/ai/schemas/price-match-schemas';
import { type RecipeToCartOutput } from '@/ai/flows/recipe-to-cart-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/cart-context';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/context/language-context';
import type { Language } from '@/lib/translations';


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
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
  const [confirmationAudio, setConfirmationAudio] = useState<string | null>(null);
  const [confirmationText, setConfirmationText] = useState<string | null>(null);
  const [priceMatchResult, setPriceMatchResult] = useState<PriceMatchOutput | null>(null);
  const [recipeResult, setRecipeResult] = useState<RecipeToCartOutput | null>(null);


  // SparkSaver state
  const [budget, setBudget] = useState('');
  const [familySize, setFamilySize] = useState('');
  const [preference, setPreference] = useState<'Veg' | 'Non-Veg' | 'Jain'>('Veg');
  
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
    // Stop any existing stream when the camera is not supposed to be open.
    const cleanupStream = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
            mediaStreamRef.current = null;
        }
    };

    if (!isCameraOpen) {
      cleanupStream();
      return;
    }

    const getCameraPermission = async () => {
      setHasCameraPermission(null); // Reset permission state
      if (!navigator.mediaDevices?.getUserMedia) {
        console.error("Camera API not supported in this browser.");
        toast({ variant: "destructive", title: "Not Supported", description: "Your browser does not support camera access." });
        setHasCameraPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    // The main cleanup function for this effect.
    return () => {
        cleanupStream();
    };
  }, [isCameraOpen, toast]);


  const handleCloseCamera = useCallback(() => {
    setIsCameraOpen(false);
  }, []);

  const resetState = useCallback(() => {
    setParsedItems([]);
    setPhotoDataUri(null);
    setTextList('');
    setIsLoading(false);
    setIsGeneratingSpeech(false);
    setConfirmationAudio(null);
    setConfirmationText(null);
    setBudget('');
    setFamilySize('');
    setPreference('Veg');
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

  useEffect(() => {
    if (confirmationAudio && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed", e));
    }
  }, [confirmationAudio]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
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
    
    // After processing, check language for switch prompt
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

    setIsGeneratingSpeech(true);
    
    try {
      const audioUri = await generateSpeech(result.confirmationText);
      setConfirmationAudio(audioUri);
    } catch (error) {
      console.error('Error generating speech:', error);
      toast({
        variant: 'destructive',
        title: 'Audio Confirmation Failed',
        description: 'We could not generate the audio confirmation for your list.',
      });
    } finally {
      setIsGeneratingSpeech(false);
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
          dishName: `the dish in this image: ${photoDataUri}`, // A bit of a hack for image-based recipe
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
                    // To "speak" a recipe, we'll first transcribe the audio to text, then pass that text to the recipe flow.
                    // This is a simplified approach. A more advanced one would have a dedicated voice recipe flow.
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

  const handleSparkSaver = async () => {
    if (!budget || !familySize) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please enter a budget and family size.',
      });
      return;
    }
    setIsLoading(true);
    resetViewStates();
    try {
      const availableProductsForAI = products.map(({ id, name, category, price, quantity }) => ({ id, name, category, price, quantity }));
      const result = await generateSparkSaverCart({
        budget: Number(budget),
        familySize: Number(familySize),
        preference,
        availableProducts: availableProductsForAI,
      });

      if (!result || result.items.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Could Not Generate Cart',
          description: 'We could not generate a cart for your budget. Please try a different amount.',
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
      console.error('Error generating SparkSaver cart:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'We could not build your budget cart at this time. Please try again.',
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
        const availableProductsForAI = products.map(({ id, name, category, price, quantity }) => ({ id, name, category, price, quantity }));
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
    setConfirmationAudio(null);
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

  const CameraView = ({ onCapture, onClose }: { onCapture: () => void, onClose: () => void }) => (
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
                                <Volume2 className="text-primary flex-shrink-0" />
                                <p className="flex-1 text-sm text-secondary-foreground">{confirmationText}</p>
                                {confirmationAudio && <audio ref={audioRef} src={confirmationAudio} controls className="h-8" />}
                                {isGeneratingSpeech && (
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>...</span>
                                    </div>
                                )}
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
                             {/* The full recipe result view would go here, which can be complex.
                                 For now, let's just show the shoppable items and confirmation.
                                 This can be built out with tabs as requested in other steps.
                             */}
                             <div className="flex items-center gap-4 p-3 bg-secondary/20 rounded-lg">
                                <Volume2 className="text-primary flex-shrink-0" />
                                <p className="flex-1 text-sm text-secondary-foreground">{recipeResult.confirmationText}</p>
                                {confirmationAudio && <audio ref={audioRef} src={confirmationAudio} controls className="h-8" />}
                                {isGeneratingSpeech && (
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>...</span>
                                    </div>
                                )}
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
                <TabsTrigger value="saver" className="gap-2"><PiggyBank /> SparkSaver</TabsTrigger>
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
                  {isCameraOpen ? (
                     <CameraView onCapture={handleCapture} onClose={handleCloseCamera} />
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="list-photo">Upload from Device</Label>
                          <Input id="list-photo" type="file" accept="image/*" onChange={handleFileChange} className="file:text-foreground" disabled={isLoading}/>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label>Or Use Camera</Label>
                          <Button onClick={handleOpenCamera} variant="outline" disabled={isLoading} className="w-full"><Video className="mr-2" /> Open Camera</Button>
                        </div>
                      </div>
                      
                      {photoDataUri ? (
                        <div className="flex justify-center"><Image src={photoDataUri} alt="Shopping list preview" width={400} height={300} className="rounded-lg object-contain border"/></div>
                      ) : ( <div className="flex items-center justify-center h-48 bg-muted rounded-lg border-dashed border-2"><p className="text-muted-foreground">Image preview will appear here</p></div>)}

                      <Button onClick={handleParseList} disabled={isLoading || !photoDataUri} className="w-full" size="lg">
                        {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Parsing your list...</> ) : ( <><Sparkles className="mr-2 h-4 w-4" /> Spark It!</> )}
                      </Button>
                    </div>
                  )}
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
                  {isCameraOpen ? (
                      <CameraView onCapture={handleCapture} onClose={handleCloseCamera} />
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bill-photo">Upload Bill Photo</Label>
                          <Input id="bill-photo" type="file" accept="image/*" onChange={handleFileChange} className="file:text-foreground" disabled={isLoading}/>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label>Or Use Camera</Label>
                          <Button onClick={handleOpenCamera} variant="outline" disabled={isLoading} className="w-full"><Video className="mr-2" /> Open Camera</Button>
                        </div>
                      </div>
                      
                      {photoDataUri ? (
                        <div className="flex justify-center"><Image src={photoDataUri} alt="Bill preview" width={400} height={300} className="rounded-lg object-contain border"/></div>
                      ) : ( <div className="flex items-center justify-center h-48 bg-muted rounded-lg border-dashed border-2"><p className="text-muted-foreground">Bill preview will appear here</p></div>)}

                      <Button onClick={handlePriceMatch} disabled={isLoading || !photoDataUri} className="w-full" size="lg">
                        {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing your bill...</> ) : ( <><Sparkles className="mr-2 h-4 w-4" /> Compare Prices</> )}
                      </Button>
                    </div>
                  )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saver">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">SparkSaver</CardTitle>
                    <CardDescription>Let AI build the cheapest &amp; healthiest grocery cart for your weekly needs within your budget.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Your Weekly Budget (₹)</Label>
                        <Input id="budget" type="number" placeholder="e.g., 1500" value={budget} onChange={(e) => setBudget(e.target.value)} disabled={isLoading} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="family-size">Family Size</Label>
                        <Input id="family-size" type="number" placeholder="e.g., 4" value={familySize} onChange={(e) => setFamilySize(e.target.value)} disabled={isLoading} />
                      </div>
                      <div className="space-y-2">
                        <Label>Dietary Preference</Label>
                        <RadioGroup value={preference} onValueChange={(value: any) => setPreference(value)} className="flex gap-4 pt-1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Veg" id="veg" />
                            <Label htmlFor="veg">Veg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Non-Veg" id="non-veg" />
                            <Label htmlFor="non-veg">Non-Veg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Jain" id="jain" />
                            <Label htmlFor="jain">Jain</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Button onClick={handleSparkSaver} disabled={isLoading || !budget || !familySize} className="w-full" size="lg">
                      {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Building your cart...</>) : (<><Sparkles className="mr-2 h-4 w-4" /> Spark It!</>)}
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
                            <CardTitle className="flex items-center gap-2">Speak Your List</CardTitle>
                            <CardDescription>Press record, speak your shopping list in any language, and we'll build your cart.</CardDescription>
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

    