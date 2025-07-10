
'use client';

import { Suspense, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Camera, FileText, Loader2, Mic, Bot, Sparkles, StopCircle, Trash2, Video, Volume2, Receipt, AlertCircle, Globe, PiggyBank, ScanSearch, Bell, Repeat, HeartPulse } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { parseList } from '@/ai/flows/list-parser-flow';
import { parseVoiceList } from '@/ai/flows/voice-list-parser-flow';
import { parseTextList } from '@/ai/flows/text-list-parser-flow';
import { generateContextualCart } from '@/ai/flows/contextual-cart-flow';
import { generateSparkSaverCart } from '@/ai/flows/spark-saver-flow';
import { compareBill } from '@/ai/flows/price-match-flow.ts';
import { products, type Product } from '@/lib/products';
import { getIngredientsForDish, type RecipeToCartOutput } from '@/ai/flows/recipe-to-cart-flow.ts';
import { generateDietCart } from '@/ai/flows/diet-assistant-flow.ts';
import type { DietAssistantOutput } from '@/ai/schemas/diet-assistant-schemas';
import { generateSpeech } from '@/ai/flows/tts-flow';
import { translations, type Language } from '@/lib/translations';
import { checkPantry } from '@/ai/flows/pantry-checker-flow';
import { ProductGrid } from '@/components/store/product-grid';

import { type ListParserOutput, type ListParserOutputItem } from '@/ai/schemas/list-parser-schemas';
import { type PriceMatchOutput } from '@/ai/schemas/price-match-schemas';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"


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
  const [audioConfirmationUrl, setAudioConfirmationUrl] = useState<string | null>(null);
  const [dietResult, setDietResult] = useState<DietAssistantOutput | null>(null);

  // Pantry check state
  const [pantrySuggestions, setPantrySuggestions] = useState<Product[]>([]);
  const [pantryConfirmation, setPantryConfirmation] = useState<string | null>(null);

  // Context to Cart state
  const [contextualQuery, setContextualQuery] = useState('');
  const [sparkSaverInput, setSparkSaverInput] = useState({ budget: '', familySize: '', preferences: '' });
  const [dietAssistantInput, setDietAssistantInput] = useState({ goal: '', medicalCondition: '', familySize: '', budget: '' });

  const { toast } = useToast();
  const { addToCartBatch } = useCart();
  const { t, languageNames, setLanguage, language } = useLanguage();
  
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [languagePrompt, setLanguagePrompt] = useState<{ show: boolean, languageName: string, langCode: Language } | null>(null);

  const availableProductsForAI = useMemo(() => products.map(({ id, name, price, salePrice, quantity, category }) => ({ id, name, price: salePrice || price, quantity, category })), []);
  const availableProductsForPantryCheck = useMemo(() => products.map(({ id, name, category }) => ({ id, name, category })), []);

  const dietChartData = useMemo(() => {
    if (!dietResult) return [];
    return Object.entries(dietResult.daily_nutrition_summary).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: parseFloat(value) || 0,
    }));
  }, [dietResult]);

  const dietChartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    // This effect handles the camera stream lifecycle.
    if (!isCameraOpen) {
      // Ensure any existing stream is cleaned up when the camera is closed.
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      return;
    }

    const getCameraPermission = async () => {
      setHasCameraPermission(null); // Reset permission state to show a loader.

      if (!navigator.mediaDevices?.getUserMedia) {
        console.error('Camera API not supported in this browser.');
        toast({ variant: 'destructive', title: 'Not Supported', description: 'Your browser does not support camera access.' });
        setHasCameraPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        mediaStreamRef.current = stream; // Store stream in ref to manage its lifecycle.

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    // The cleanup function for this effect, which runs when `isCameraOpen` changes or the component unmounts.
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, [isCameraOpen, toast]);

  const handleAIError = (error: unknown, title: string, description: string) => {
    console.error(`Error in ${title}:`, error);
    if (error instanceof Error && (error.message.includes('503') || error.message.toLowerCase().includes('overloaded'))) {
      toast({
        variant: 'destructive',
        title: 'AI Service Unavailable',
        description: 'The AI model is currently busy. Please try again in a few moments.',
      });
    } else {
      toast({
        variant: 'destructive',
        title,
        description,
      });
    }
  };

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
    setSparkSaverInput({ budget: '', familySize: '', preferences: '' });
    setPriceMatchResult(null);
    setRecipeResult(null);
    setLanguagePrompt(null);
    setAudioConfirmationUrl(null);
    setPantrySuggestions([]);
    setPantryConfirmation(null);
    setDietResult(null);
    setDietAssistantInput({ goal: '', medicalCondition: '', familySize: '', budget: '' });
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

  const generateConfirmationAudio = async (text: string | undefined) => {
    if (!text) return;
    try {
        const audioData = await generateSpeech(text);
        setAudioConfirmationUrl(audioData);
    } catch (ttsError) {
        console.error("TTS generation failed:", ttsError);
        // Non-critical error, so we don't show a toast.
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
    await generateConfirmationAudio(result.confirmationText);
    
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
        const result = await getIngredientsForDish({
          dishName: `the dish in this image: ${photoDataUri}`,
          servingSize: 4,
          specialRequests: '',
          availableProducts: availableProductsForAI,
        });
        setRecipeResult(result);
        setParsedItems(result.shoppableItems); // Use parsedItems to display results
        await generateConfirmationAudio(result.confirmationText);
      } else {
        const result = await parseList({ photoDataUri, availableProducts: availableProductsForAI });
        await processAndConfirmList(result);
      }
    } catch (error) {
      handleAIError(error, 'Parsing Failed', 'Could not read the shopping list. Please try a clearer image.');
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
      const result = await parseTextList({ textList, availableProducts: availableProductsForAI });
      await processAndConfirmList(result);
    } catch (error) {
      handleAIError(error, 'Parsing Failed', 'Could not read the shopping list. Please check the format.');
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
        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64data = reader.result as string;
            if (context === 'recipe') {
                setIsLoading(true);
                resetViewStates();
                try {
                    const voiceTextResult = await parseVoiceList({ audioDataUri: base64data, availableProducts: availableProductsForAI });
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
                    setParsedItems(result.shoppableItems);
                    await generateConfirmationAudio(result.confirmationText);
                } catch (error) {
                    handleAIError(error, 'Recipe Not Found', 'We could not find a recipe for what you said.');
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
      const result = await parseVoiceList({ audioDataUri, availableProducts: availableProductsForAI });
      await processAndConfirmList(result);
    } catch (error) {
      handleAIError(error, 'Parsing Failed', 'Could not understand the shopping list. Please try speaking clearly.');
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
      handleAIError(error, 'Generation Failed', 'We could not build your cart at this time. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSparkSaver = async () => {
    const budget = parseFloat(sparkSaverInput.budget);
    const familySize = parseInt(sparkSaverInput.familySize, 10);
    if (isNaN(budget) || budget <= 0 || isNaN(familySize) || familySize <= 0) {
        toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid budget and family size.' });
        return;
    }
    setIsLoading(true);
    resetViewStates();
    try {
        const result = await generateSparkSaverCart({
            budget,
            familySize,
            preferences: sparkSaverInput.preferences,
            availableProducts: availableProductsForAI,
        });

        if (!result || result.items.length === 0) {
            toast({ variant: 'destructive', title: 'Could Not Generate Cart', description: "We couldn't generate a cart for your budget. Please try a different amount." });
            setParsedItems([]);
            return;
        }

        await processAndConfirmList({
            items: result.items,
            detectedLanguage: 'en-IN',
            confirmationText: result.summaryText,
        });
    } catch (error) {
      handleAIError(error, 'Generation Failed', 'We could not build your cart at this time. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleDietAssistant = async () => {
    const budget = parseFloat(dietAssistantInput.budget);
    const familySize = parseInt(dietAssistantInput.familySize, 10);
    if (isNaN(budget) || budget <= 0 || isNaN(familySize) || familySize <= 0 || !dietAssistantInput.goal) {
        toast({ variant: 'destructive', title: 'Invalid Input', description: 'Please enter a valid goal, budget, and family size.' });
        return;
    }
    setIsLoading(true);
    resetViewStates();
    try {
        const result = await generateDietCart({
            goal: dietAssistantInput.goal,
            medicalCondition: dietAssistantInput.medicalCondition,
            budget,
            familySize,
            availableProducts: availableProductsForAI,
        });

        if (!result || result.cart.length === 0) {
            toast({ variant: 'destructive', title: 'Could Not Generate Cart', description: "We couldn't generate a diet plan for your request. Please try different parameters." });
            return;
        }

        setDietResult(result);
    } catch (error) {
      handleAIError(error, 'Generation Failed', 'We could not build your diet cart at this time. Please try again.');
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
        handleAIError(error, 'Analysis Failed', 'An error occurred while comparing prices. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  const handlePantryCheck = async () => {
    if (!photoDataUri) {
        toast({ variant: 'destructive', title: 'No Pantry Photo', description: 'Please upload or capture a photo of your pantry first.' });
        return;
    }
    setIsLoading(true);
    resetViewStates();
    try {
        const result = await checkPantry({
            photoDataUri: photoDataUri,
            availableProducts: availableProductsForPantryCheck
        });

        if (!result || !result.suggestionIds || result.suggestionIds.length === 0) {
            toast({ variant: 'destructive', title: 'No Suggestions', description: 'We could not find any items to suggest from your photo.' });
            return;
        }

        const suggested = products.filter(p => result.suggestionIds.includes(p.id));
        setPantrySuggestions(suggested);
        setPantryConfirmation(result.confirmationText);

    } catch (error) {
      handleAIError(error, 'Analysis Failed', 'An error occurred while analyzing your pantry. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
    setPhotoDataUri(null);
  };

  const handleCapture = () => {
    if (videoRef.current && hasCameraPermission) {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUri = canvas.toDataURL('image/png');
            setPhotoDataUri(dataUri);
        }
        handleCloseCamera();
    } else {
        toast({
            variant: 'destructive',
            title: 'Camera Not Ready',
            description: 'Please wait for the camera to initialize or grant permission.',
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
    if (parsedItems.length > 0) {
        addToCartBatch(parsedItems);
        router.push('/cart');
    }
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
    setAudioConfirmationUrl(null);
    setPantrySuggestions([]);
    setPantryConfirmation(null);
    setDietResult(null);
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

  const handleNotImplemented = (feature: string) => {
    toast({
      title: t('spark.essentials.toast.notImplemented.title', { feature }),
      description: t('spark.essentials.toast.notImplemented.description'),
    });
  };

  const hasParsedListResult = parsedItems.length > 0;
  const hasPriceMatchResult = !!priceMatchResult;
  const hasRecipeResult = !!recipeResult;
  const hasPantryResult = pantrySuggestions.length > 0;
  const hasDietResult = !!dietResult;
  const showResultPage = hasParsedListResult || hasPriceMatchResult || hasPantryResult || hasDietResult;

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
            <div className="space-y-6">
              <Card>
                {hasDietResult && dietResult && (
                   <>
                    <CardHeader>
                        <CardTitle>Your Personalized SparkDiet Plan</CardTitle>
                        <CardDescription>
                            Here's a sample weekly grocery cart and nutritional summary based on your goals. Review the items and add them to your cart.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <Alert variant={dietResult.diet_flags.toLowerCase() === 'balanced' ? 'default' : 'destructive'} className={dietResult.diet_flags.toLowerCase() === 'balanced' ? 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300' : ''}>
                           <AlertCircle className="h-4 w-4" />
                           <AlertTitle className="font-bold">Nutrition Tip</AlertTitle>
                           <AlertDescription>{dietResult.nutrition_tip}</AlertDescription>
                       </Alert>

                       <div>
                          <h3 className="font-semibold mb-2 text-center">Daily Nutrition Summary (per person)</h3>
                           <ChartContainer config={dietChartConfig} className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={dietChartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                                  <CartesianGrid vertical={false} />
                                  <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    />
                                    <YAxis 
                                     tickLine={false}
                                     axisLine={false}
                                     tickMargin={8}
                                    />
                                  <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent />}
                                    />
                                  <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                                </BarChart>
                              </ResponsiveContainer>
                           </ChartContainer>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-2">Suggested Grocery Cart (Total: ₹{dietResult.total_estimated_cost.toFixed(2)})</h3>
                            <div className="space-y-3">
                                {dietResult.cart.map((item, index) => (
                                    <div key={index} className="p-3 rounded-lg border bg-muted/50">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="font-semibold">~₹{item.estimated_price.toFixed(2)}</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        <p className="text-sm mt-1">{item.key_nutrition_facts}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                            <Button variant="outline" onClick={startOver}>Start Over</Button>
                            <Button onClick={() => addToCartBatch(dietResult.cart.map(item => ({ product: item.name, englishProduct: item.name, quantity: item.quantity, requestedText: item.name })))} size="lg">Add All to Cart</Button>
                        </div>
                    </CardContent>
                  </>
                )}
                {hasPantryResult && (
                  <>
                    <CardHeader>
                        <CardTitle>{t('spark.pantry.results.title')}</CardTitle>
                        {pantryConfirmation ? (
                            <CardDescription>{pantryConfirmation}</CardDescription>
                        ) : (
                           <CardDescription>{t('spark.pantry.results.description')}</CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        <ProductGrid products={pantrySuggestions} />
                        <div className="flex justify-between items-center pt-4 mt-4 border-t">
                            <Button variant="outline" onClick={startOver}>{t('spark.pantry.results.checkAgain')}</Button>
                            <Button onClick={() => addToCartBatch(pantrySuggestions.map(p => ({product: p.name, englishProduct: p.name, quantity: '1', requestedText: p.name})))} size="lg">Add All to Cart</Button>
                        </div>
                    </CardContent>
                  </>
                )}
                {hasParsedListResult && (
                    <>
                    <CardHeader>
                        <CardTitle>{recipeResult ? "Your Recipe & Shopping List" : "Confirm Your List"}</CardTitle>
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
                            <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                                {audioConfirmationUrl ? (
                                    <audio src={audioConfirmationUrl} autoPlay controls className="h-8 shrink-0" />
                                ) : (
                                    <Volume2 className="text-primary flex-shrink-0 mt-1" />
                                )}
                                <p className="flex-1 text-sm text-secondary-foreground pt-1">{confirmationText}</p>
                            </div>
                        )}
                        <div className="space-y-3">
                          <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center text-sm font-medium text-muted-foreground px-2">
                              <span>Product to Add</span>
                              <span className="w-20 text-center">Quantity</span>
                              <span className="w-8"></span>
                          </div>
                          {parsedItems.map((item, index) => (
                          <div key={index} className="p-3 rounded-lg border bg-muted/50 space-y-2">
                              <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                                  <Input 
                                      value={item.product} 
                                      onChange={(e) => !recipeResult && handleItemChange(index, 'product', e.target.value)} 
                                      className="w-full bg-background" 
                                      aria-label="Product" 
                                      readOnly={!!recipeResult}
                                  />
                                  <Input 
                                      value={item.quantity} 
                                      onChange={(e) => !recipeResult && handleItemChange(index, 'quantity', e.target.value)} 
                                      className="w-20 text-center bg-background" 
                                      aria-label="Quantity" 
                                      readOnly={!!recipeResult}
                                  />
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(index)} aria-label="Delete item"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                              </div>
                              {item.requestedText && (
                                  <p className="text-xs text-muted-foreground px-1">
                                      Added a quantity of <span className="font-semibold text-foreground">{item.quantity}</span> to fulfill your request for "<span className="font-semibold text-foreground">{item.requestedText}</span>".
                                  </p>
                              )}
                          </div>
                          ))}
                      </div>
                        <div className="flex justify-between items-center pt-4">
                            <Button variant="outline" onClick={startOver}>Start Over</Button>
                            <Button onClick={handleConfirmList} size="lg" disabled={parsedItems.length === 0}>Confirm & Add to Cart</Button>
                        </div>
                    </CardContent>
                    </>
                )}
                 {hasPriceMatchResult && priceMatchResult && (
                    <>
                    <CardHeader>
                        <CardTitle>{t('spark.priceMatch.title')}</CardTitle>
                        <CardDescription>{t('spark.priceMatch.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Alert variant={priceMatchResult.totalSavings > 0 ? 'default' : 'default'} className={priceMatchResult.totalSavings > 0 ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300" : ""}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t('spark.priceMatch.summaryTitle')}</AlertTitle>
                            <AlertDescription>{priceMatchResult.summaryText}</AlertDescription>
                        </Alert>

                        {priceMatchResult.couponCode && (
                            <div className="text-center p-4 border-2 border-dashed border-primary rounded-lg">
                                <p className="text-muted-foreground">{t('spark.priceMatch.couponTitle')}</p>
                                <p className="text-2xl font-bold text-primary tracking-widest">{priceMatchResult.couponCode}</p>
                            </div>
                        )}
                
                        <div className="space-y-3">
                            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center text-sm font-medium text-muted-foreground px-2">
                                <span>{t('spark.priceMatch.itemHeader')}</span>
                                <span className="text-right">{t('spark.priceMatch.storePriceHeader')}</span>
                                <span className="text-right">{t('spark.priceMatch.ourPriceHeader')}</span>
                                <span className="text-right">{t('spark.priceMatch.savingsHeader')}</span>
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
                                <span>{t('spark.priceMatch.total')}</span>
                                <span className="text-right">₹{priceMatchResult.totalOfflineCost.toFixed(2)}</span>
                                <span className="text-right">₹{priceMatchResult.totalOnlineCost.toFixed(2)}</span>
                                <span className="text-right text-green-600">₹{priceMatchResult.totalSavings.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <Button variant="outline" onClick={startOver}>Start Over</Button>
                            <Button onClick={() => router.push('/store')} size="lg">{t('spark.priceMatch.shopNowButton')}</Button>
                        </div>
                    </CardContent>
                    </>
                )}
              </Card>

              {hasPantryResult && (
                <Card className="mt-6 bg-primary/10 border-primary/20">
                    <CardHeader>
                        <CardTitle>{t('spark.essentials.results.title')}</CardTitle>
                        <CardDescription>{t('spark.essentials.results.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                            <div className='flex items-center gap-3'>
                                <Repeat className="h-5 w-5 text-primary"/>
                                <div>
                                    <Label className="font-semibold">{t('spark.essentials.results.subscription.title')}</Label>
                                    <p className="text-sm text-muted-foreground">{t('spark.essentials.results.subscription.description')}</p>
                                </div>
                            </div>
                            <Button onClick={() => handleNotImplemented('Subscription Saver')}>{t('spark.essentials.results.subscription.button')}</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                             <div className='flex items-center gap-3'>
                                <Bell className="h-5 w-5 text-primary"/>
                                <div>
                                    <Label className="font-semibold">{t('spark.essentials.results.alerts.title')}</Label>
                                    <p className="text-sm text-muted-foreground">{t('spark.essentials.results.alerts.description')}</p>
                                </div>
                            </div>
                            <Button onClick={() => handleNotImplemented('Deal Alerts')}>{t('spark.essentials.results.alerts.button')}</Button>
                        </div>
                    </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <>
              <div className={cn("relative w-full aspect-video bg-muted rounded-lg overflow-hidden border", isCameraOpen ? "block" : "hidden")}>
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
              <Tabs value={activeTab} className={cn("w-full", isCameraOpen && "hidden")} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="scan" className="gap-2"><Camera /> Scan</TabsTrigger>
                <TabsTrigger value="diet" className="gap-2"><HeartPulse /> SparkDiet</TabsTrigger>
                <TabsTrigger value="pantry" className="gap-2"><ScanSearch /> Pantry</TabsTrigger>
                <TabsTrigger value="saver" className="gap-2"><PiggyBank /> Saver</TabsTrigger>
                <TabsTrigger value="context" className="gap-2"><Bot /> AI Cart</TabsTrigger>
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
                            <CardTitle className="flex items-center gap-2">{t('spark.scan.billTitle')}</CardTitle>
                            <CardDescription>{t('spark.scan.billDescription')}</CardDescription>
                        </>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                    <div className="flex gap-4">
                        <Button onClick={handleParseList} disabled={isLoading || !photoDataUri} className="w-full" size="lg">
                            {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('spark.scan.parseListLoading')}</> ) : ( <><Sparkles className="mr-2 h-4 w-4" /> {t('spark.scan.parseListButton')}</> )}
                        </Button>
                         <Button onClick={handlePriceMatch} disabled={isLoading || !photoDataUri} className="w-full" size="lg" variant="secondary">
                            {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('spark.scan.priceMatchLoading')}</> ) : ( <><Receipt className="mr-2 h-4 w-4" /> {t('spark.scan.priceMatchButton')}</> )}
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="diet">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">SparkDiet</CardTitle>
                        <CardDescription>Get a personalized, health-conscious grocery cart for your specific needs.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="space-y-2">
                            <Label htmlFor="diet-goal">Primary Goal</Label>
                             <Select value={dietAssistantInput.goal} onValueChange={(value) => setDietAssistantInput(s => ({...s, goal: value}))}>
                                <SelectTrigger id="diet-goal">
                                    <SelectValue placeholder="Select a health goal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                                    <SelectItem value="diabetic-friendly">Diabetic Friendly</SelectItem>
                                    <SelectItem value="heart-healthy">Heart Healthy</SelectItem>
                                    <SelectItem value="balanced-diet">Balanced General Diet</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="medical-condition">Medical Condition (optional)</Label>
                            <Input id="medical-condition" placeholder="e.g., High Blood Pressure, PCOS" value={dietAssistantInput.medicalCondition} onChange={(e) => setDietAssistantInput(s => ({...s, medicalCondition: e.target.value}))} disabled={isLoading} />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="diet-budget">Weekly Budget (₹)</Label>
                                <Input id="diet-budget" type="number" placeholder="e.g., 2000" value={dietAssistantInput.budget} onChange={(e) => setDietAssistantInput(s => ({...s, budget: e.target.value}))} disabled={isLoading} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="diet-family-size">Family Size</Label>
                                <Input id="diet-family-size" type="number" placeholder="e.g., 2" value={dietAssistantInput.familySize} onChange={(e) => setDietAssistantInput(s => ({...s, familySize: e.target.value}))} disabled={isLoading} />
                            </div>
                        </div>
                        <Button onClick={handleDietAssistant} disabled={isLoading || !dietAssistantInput.goal || !dietAssistantInput.budget || !dietAssistantInput.familySize} className="w-full" size="lg">
                            {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Diet Plan...</>) : (<><Sparkles className="mr-2 h-4 w-4" /> Generate Diet Cart</>)}
                        </Button>
                    </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pantry">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">{t('spark.essentials.title')}</CardTitle>
                    <CardDescription>{t('spark.essentials.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative aspect-video w-full flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                    {photoDataUri ? (
                        <Image src={photoDataUri} alt="Pantry Preview" fill className="object-contain rounded-lg" />
                    ) : (
                        <p className="text-muted-foreground">Image preview will appear here</p>
                    )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="pantry-photo" className="sr-only">Upload from Device</Label>
                        <Button asChild variant="outline" className="w-full">
                            <label htmlFor="pantry-photo-upload" className="cursor-pointer">
                                <FileText className="mr-2" /> Upload Photo
                            </label>
                        </Button>
                        <Input id="pantry-photo-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} disabled={isLoading}/>
                    </div>
                    <Button onClick={handleOpenCamera} variant="outline" disabled={isLoading}>
                        <Camera className="mr-2" /> Open Camera
                    </Button>
                    </div>
                    <Button onClick={handlePantryCheck} disabled={isLoading || !photoDataUri} className="w-full" size="lg">
                        {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('spark.pantry.buttonLoading')}</> ) : ( <><Sparkles className="mr-2 h-4 w-4" /> {t('spark.pantry.button')}</> )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saver">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">Spark Saver</CardTitle>
                        <CardDescription>Let our AI build a value-for-money cart based on your weekly budget and family size.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="budget">Weekly Budget (₹)</Label>
                                <Input id="budget" type="number" placeholder="e.g., 1500" value={sparkSaverInput.budget} onChange={(e) => setSparkSaverInput(s => ({...s, budget: e.target.value}))} disabled={isLoading} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="family-size">Family Size</Label>
                                <Input id="family-size" type="number" placeholder="e.g., 4" value={sparkSaverInput.familySize} onChange={(e) => setSparkSaverInput(s => ({...s, familySize: e.target.value}))} disabled={isLoading} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="preferences">Preferences (optional)</Label>
                            <Input id="preferences" placeholder="e.g., vegetarian, gluten-free" value={sparkSaverInput.preferences} onChange={(e) => setSparkSaverInput(s => ({...s, preferences: e.target.value}))} disabled={isLoading} />
                        </div>
                        <Button onClick={handleSparkSaver} disabled={isLoading || !sparkSaverInput.budget || !sparkSaverInput.familySize} className="w-full" size="lg">
                            {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Building Your Value Cart...</>) : (<><Sparkles className="mr-2 h-4 w-4" /> Build Cart</>)}
                        </Button>
                    </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="context">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">SparkCart AI</CardTitle>
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
             {isCameraOpen && (
                <div className="flex justify-center gap-4 mt-4">
                    <Button onClick={handleCapture} size="lg" disabled={!hasCameraPermission}>
                        <Camera className="mr-2" /> Capture
                    </Button>
                    <Button onClick={handleCloseCamera} variant="outline" size="lg">Cancel</Button>
                </div>
            )}
            </>
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

    

    
