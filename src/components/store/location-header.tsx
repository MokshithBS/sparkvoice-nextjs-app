'use client';

import { ArrowLeft, ChevronDown, CircleUserRound, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Language } from '@/lib/translations';
import { useToast } from '@/hooks/use-toast';

export function LocationHeader() {
  const { language, setLanguage, t, languageNames } = useLanguage();
  const { toast } = useToast();

  const handleFeatureClick = () => {
    toast({
        title: t('common.featureNotImplemented'),
        description: t('common.prototypeDisclaimer'),
    });
  };

  return (
    <header className="flex items-center justify-between p-4 text-foreground sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="shrink-0 -ml-2" asChild>
            <Link href="/">
                <ArrowLeft />
                <span className="sr-only">{t('common.backToStore')}</span>
            </Link>
        </Button>
        <div className="flex items-start gap-3">
            <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <span className="font-bold text-primary-foreground text-lg">10</span>
                </div>
                <span className="text-[10px] font-bold text-primary/80">MINS</span>
            </div>
            <Button variant="ghost" className="text-left h-auto p-0" onClick={handleFeatureClick}>
              <div>
                <div className="flex items-center font-bold text-lg">
                    <span>{t('store.location')}</span>
                    <ChevronDown className="w-5 h-5 mt-1" />
                </div>
                <p className="text-xs text-muted-foreground">SIT, BH Road, Tumkur, Karnataka, India</p>
              </div>
            </Button>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe />
                    <span className="sr-only">Change Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {Object.keys(languageNames).map((langCode) => (
                    <DropdownMenuItem
                        key={langCode}
                        onSelect={() => setLanguage(langCode as Language)}
                        disabled={language === langCode}
                    >
                        {languageNames[langCode as Language]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" onClick={handleFeatureClick}>
            <CircleUserRound className="w-8 h-8 text-foreground/80 shrink-0" />
            <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}
