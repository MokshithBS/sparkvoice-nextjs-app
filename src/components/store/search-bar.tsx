import { Search, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchBar() {
  return (
    <div className="relative my-2">
      <Input
        type="search"
        placeholder="Search for 'Bottles'"
        className="w-full rounded-lg bg-card/80 border-0 pl-10 pr-10 h-12 text-foreground placeholder:text-muted-foreground"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Zap className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 fill-green-400" />
    </div>
  );
}
