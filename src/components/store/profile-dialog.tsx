'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/language-context';
import { useTheme } from '@/context/theme-context';
import type { Language } from '@/lib/translations';
import { generateAvatar } from '@/ai/flows/generate-avatar-flow';
import { Loader2, Palette, Sparkles, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProfileDialog() {
  const { language, setLanguage, languageNames, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [avatarPrompt, setAvatarPrompt] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/avatar-placeholder.png');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateAvatar = async () => {
    if (!avatarPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const result = await generateAvatar({ prompt: avatarPrompt });
      if (result.imageDataUri) {
        setAvatarUrl(result.imageDataUri);
      }
    } catch (error) {
      console.error('Avatar generation failed:', error);
      toast({
        variant: 'destructive',
        title: t('common.error.generic.title'),
        description: t('common.error.generic.description'),
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNotImplemented = (feature: string) => {
    toast({
      title: `${feature} Coming Soon!`,
      description: t('common.prototypeDisclaimer'),
    });
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Personalization Hub</DialogTitle>
        <DialogDescription>
          Customize your app experience. Your settings are saved automatically.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        {/* AI Avatar Section */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-5 w-5 text-primary" /> AI Profile Picture
          </Label>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
              <Image
                src={avatarUrl}
                alt="AI Generated Avatar"
                fill
                className="object-cover"
              />
              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </div>
            <div className="w-full space-y-2">
              <Input
                id="avatar-prompt"
                placeholder="e.g., A happy person with a laptop"
                value={avatarPrompt}
                onChange={(e) => setAvatarPrompt(e.target.value)}
                disabled={isGenerating}
              />
              <Button
                onClick={handleGenerateAvatar}
                disabled={isGenerating || !avatarPrompt.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Avatar
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Theme and Language Section */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 font-semibold">
            <Palette className="h-5 w-5 text-primary" /> App Appearance
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language" className="text-sm text-muted-foreground">
                Language
              </Label>
              <Select
                value={language}
                onValueChange={(value) => setLanguage(value as Language)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languageNames).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="theme" className="text-sm text-muted-foreground">
                Theme
              </Label>
              <Select
                value={theme}
                onValueChange={(
                  value
                ) => setTheme(value as 'default' | 'sunset' | 'monsoon')}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="sunset">Sunset</SelectItem>
                  <SelectItem value="monsoon">Monsoon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label className="flex items-center gap-2 font-semibold">
            <User className="h-5 w-5 text-primary" /> My Account
          </Label>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNotImplemented('My Orders')}
          >
            My Orders
          </Button>
          <DialogClose asChild>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/community">My Hives</Link>
            </Button>
          </DialogClose>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => handleNotImplemented('Log Out')}
          >
            Log Out
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
