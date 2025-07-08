
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
import { Palette, Sparkles, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProfileDialog() {
  const { language, setLanguage, languageNames, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const avatarUrl = 'https://storage.googleapis.com/aip-dev-images-public/avatar-4.png';


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
            <Sparkles className="h-5 w-5 text-primary" /> My Profile Picture
          </Label>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
              <Image
                src={avatarUrl}
                alt="User Avatar"
                fill
                className="object-cover"
                data-ai-hint="person face"
              />
            </div>
            <div className='w-full space-y-2 text-sm text-muted-foreground'>
                <p>You can customize your avatar, manage your details, and more.</p>
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
          <DialogClose asChild>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/orders">My Orders</Link>
            </Button>
          </DialogClose>
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
