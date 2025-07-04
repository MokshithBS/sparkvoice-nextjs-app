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

export function LocationHeader() {
  const { language, setLanguage, t, languageNames } = useLanguage();

  return (
    <header className="flex items-center justify-between p-4 text-foreground sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="shrink-0 -ml-2" asChild>
            <Link href="/">
                <ArrowLeft />
                <span className="sr-only">Back to Home</span>
            </Link>
        </Button>
        <div className="flex items-start gap-3">
            <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                    <span className="font-bold text-white text-lg">10</span>
                </div>
                <span className="text-[10px] font-bold text-orange-200">MINS</span>
            </div>
            <div>
              <div className="flex items-center font-bold text-lg">
                  <span>{t('store.location')}</span>
                  <ChevronDown className="w-5 h-5 mt-1" />
              </div>
              <p className="text-xs text-muted-foreground">SIT, BH Road, Tumkur, Karnataka, India</p>
            </div>
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
        <CircleUserRound className="w-8 h-8 text-foreground/80 shrink-0" />
      </div>
    </header>
  );
}
