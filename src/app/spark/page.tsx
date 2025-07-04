'use client';

import { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Camera, FileText, Loader2, Mic, Sparkles, StopCircle, Trash2, Video, Volume2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { parseList } from '@/ai/flows/list-parser-flow';
import { parseVoiceList } from '@/ai/flows/voice-list-parser-flow';
import { parseTextList } from '@/ai/flows/text-list-parser-flow';
import { generateSpeech } from '@/ai/flows/tts-flow';
import { type ListParserOutput, type ListParserOutputItem } from '@/ai/schemas/list-parser-schemas';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/cart-context';

function SparkPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get('tab') || 'scan';

  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [textList, setTextList] = useState('');
  const [parsedItems, setParsedItems] = useState<ListParserOutput['items']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
  const [confirmationAudio, setConfirmationAudio] = useState<string | null>(null);
  const [confirmationText, setConfirmationText] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { addToCartBatch } = useCart();
  
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleCloseCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
    setStream(null);
  }, [stream]);

  const resetState = useCallback(() => {
    setParsedItems([]);
    setPhotoDataUri(null);
    setTextList('');
    setIsLoading(false);
    setIsGeneratingSpeech(false);
    setConfirmationAudio(null);
    setConfirmationText(null);
    if (isCameraOpen) handleCloseCamera();
  }, [isCameraOpen, handleCloseCamera]);

  useEffect(() => {
    const tabFromQuery = searchParams.get('tab');
    if (tabFromQuery === 'scan' || tabFromQuery === 'speak' || tabFromQuery === 'type') {
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
    setParsedItems([]);
    setConfirmationAudio(null);
    setConfirmationText(null);

    try {
      const result = await parseList({ photoDataUri });
      await processAndConfirmList(result);
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
    setParsedItems([]);
    setConfirmationAudio(null);
    setConfirmationText(null);

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
          reader.onloadend = () => {
            const base64data = reader.result as string;
            handleParseVoiceList(base64data);
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
    setParsedItems([]);
    setConfirmationAudio(null);
    setConfirmationText(null);
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

  const handleOpenCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
        setIsCameraOpen(true);
        setPhotoDataUri(null);
      } catch (err) {
        console.error('Error accessing camera:', err);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    } else {
       toast({
        variant: 'destructive',
        title: 'Feature Not Supported',
        description: 'Your browser does not support camera access.',
      });
    }
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

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const handleTabChange = (tab: string) => {
    resetState();
    setActiveTab(tab);
  };

  const startOver = () => {
    setParsedItems([]);
    setConfirmationAudio(null);
    setConfirmationText(null);
  }

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
          {!parsedItems || parsedItems.length === 0 ? (
            <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="scan" className="gap-2"><Camera /> Scan List</TabsTrigger>
                <TabsTrigger value="speak" className="gap-2"><Mic /> Speak List</TabsTrigger>
                <TabsTrigger value="type" className="gap-2"><FileText /> Type List</TabsTrigger>
              </TabsList>
              <TabsContent value="scan">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">Scan Your List</CardTitle>
                    <CardDescription>Capture a photo of your list or upload an image to build your cart instantly.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                  {isCameraOpen ? (
                    <div className="space-y-4 text-center">
                      <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border">
                        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                      </div>
                      <div className="flex justify-center gap-4">
                        <Button onClick={handleCapture} size="lg">
                          <Camera className="mr-2" /> Capture
                        </Button>
                        <Button onClick={handleCloseCamera} variant="outline" size="lg">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="list-photo">Upload from Device</Label>
                          <Input id="list-photo" type="file" accept="image/*" onChange={handleFileChange} className="file:text-foreground" disabled={isLoading}/>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label>Or Use Camera</Label>
                          <Button onClick={handleOpenCamera} variant="outline" disabled={isLoading} className="w-full">
                            <Video className="mr-2" /> Open Camera
                          </Button>
                        </div>
                      </div>
                      
                      {photoDataUri ? (
                        <div className="flex justify-center">
                          <Image
                            src={photoDataUri}
                            alt="Shopping list preview"
                            width={400}
                            height={300}
                            className="rounded-lg object-contain border"
                          />
                        </div>
                      ) : (
                         <div className="flex items-center justify-center h-48 bg-muted rounded-lg border-dashed border-2">
                            <p className="text-muted-foreground">Image preview will appear here</p>
                         </div>
                      )}

                      <Button onClick={handleParseList} disabled={isLoading || !photoDataUri} className="w-full" size="lg">
                        {isLoading ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Parsing your list...</>
                        ) : (
                          <><Sparkles className="mr-2 h-4 w-4" /> Spark It!</>
                        )}
                      </Button>
                    </div>
                  )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="speak">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">Speak Your List</CardTitle>
                    <CardDescription>Press record, speak your shopping list in any language, and we'll build your cart.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 flex flex-col items-center">
                    <Button 
                      onClick={isRecording ? handleStopRecording : handleStartRecording} 
                      disabled={isLoading}
                      className="w-48 h-16 text-lg"
                      variant={isRecording ? 'destructive' : 'default'}
                      size="lg"
                    >
                      {isRecording ? (
                        <><StopCircle className="mr-2 h-6 w-6" /> Stop Recording</>
                      ) : (
                        <><Mic className="mr-2 h-6 w-6" /> Start Recording</>
                      )}
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
                      <Textarea 
                        id="text-list" 
                        placeholder="e.g.&#10;2 kg Onions&#10;1 dozen Eggs&#10;Milk"
                        value={textList}
                        onChange={(e) => setTextList(e.target.value)}
                        className="min-h-[150px]"
                        disabled={isLoading}
                      />
                    </div>
                    <Button onClick={handleParseTextList} disabled={isLoading || !textList.trim()} className="w-full" size="lg">
                      {isLoading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Parsing your list...</>
                      ) : (
                        <><Sparkles className="mr-2 h-4 w-4" /> Spark It!</>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div>
              <Card>
                <CardHeader>
                    <CardTitle>Confirm Your List</CardTitle>
                    <CardDescription>
                        We've parsed your list. Please review and make any edits below before adding items to your cart.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(confirmationAudio || confirmationText) && (
                      <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                          <Volume2 className="text-primary flex-shrink-0" />
                          <p className="flex-1 text-sm text-secondary-foreground">{confirmationText}</p>
                          {confirmationAudio && <audio ref={audioRef} src={confirmationAudio} controls className="h-8" />}
                      </div>
                  )}
                  {isGeneratingSpeech && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <p>Generating audio confirmation...</p>
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
                        <Input
                          value={item.product}
                          onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                          className="w-full"
                          aria-label="Product"
                        />
                        <Input
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          className="w-24"
                          aria-label="Quantity"
                        />
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(index)} aria-label="Delete item">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={startOver}>Start Over</Button>
                    <Button onClick={handleConfirmList} size="lg">Confirm & Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
