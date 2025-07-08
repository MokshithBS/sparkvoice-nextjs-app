
import { Search, X, Mic, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export function SearchBar({ value, onClear, ...props }: SearchBarProps) {
  const { t } = useLanguage();
  return (
    <div className="relative my-2 flex h-12 w-full items-center rounded-lg bg-card/80 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background">
      <Search className="absolute left-3 z-10 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder={t('store.search_placeholder')}
        className="h-full w-full border-0 bg-transparent pl-10 pr-2 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        {...props}
      />
      <div className="flex items-center gap-1 pr-2">
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0 rounded-full"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t('common.clearSearch')}</span>
          </Button>
        )}
        <Button asChild variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 rounded-full">
          <Link href="/spark?tab=speak">
            <Mic className="h-4 w-4" />
            <span className="sr-only">{t('common.speakList')}</span>
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 rounded-full">
          <Link href="/spark?tab=scan">
            <Camera className="h-4 w-4" />
            <span className="sr-only">{t('common.scanList')}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
