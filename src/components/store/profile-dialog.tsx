'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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

export function ProfileDialog() {
  const { language, setLanguage, languageNames } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [avatarPrompt, setAvatarPrompt] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/avatar-placeholder.png');
  const [isGenerating, setIsGenerating] = useState(false);

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
    } finally {
      setIsGenerating(false);
    }
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
            <Label className="flex items-center gap-2 font-semibold"><Sparkles className="w-5 h-5 text-primary"/> AI Profile Picture</Label>
            <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full bg-muted overflow-hidden flex-shrink-0 border-2 border-primary/20">
                    <Image src={avatarUrl} alt="AI Generated Avatar" fill className="object-cover" />
                    {isGenerating && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
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
                    <Button onClick={handleGenerateAvatar} disabled={isGenerating || !avatarPrompt.trim()} className="w-full">
                        {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        Generate Avatar
                    </Button>
                </div>
            </div>
        </div>

        <Separator />
        
        {/* Theme and Language Section */}
        <div className="space-y-4">
             <Label className="flex items-center gap-2 font-semibold"><Palette className="w-5 h-5 text-primary"/> App Appearance</Label>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="language" className="text-sm text-muted-foreground">Language</Label>
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
                    <Label htmlFor="theme" className="text-sm text-muted-foreground">Theme</Label>
                    <Select
                        value={theme}
                        onValueChange={(value) => setTheme(value as 'default' | 'sunset' | 'monsoon')}
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
            <Button variant="ghost" className="w-full justify-start">My Orders</Button>
            <Button variant="ghost" className="w-full justify-start">My Hives</Button>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">Log Out</Button>
        </div>

      </div>
    </DialogContent>
  );
}
