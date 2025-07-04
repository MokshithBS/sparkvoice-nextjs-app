import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export function SearchBar({ value, onClear, ...props }: SearchBarProps) {
  return (
    <div className="relative my-2">
      <Input
        type="search"
        placeholder="Search for 'Atta'"
        className="w-full rounded-lg bg-card/80 border-0 pl-10 pr-10 h-12 text-foreground placeholder:text-muted-foreground"
        value={value}
        {...props}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      {value && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
          onClick={onClear}
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
}
