import { Camera, Mic } from 'lucide-react';
import Link from 'next/link';

export function ShoppingList() {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background via-background/90 to-transparent">
      <div className="p-4 rounded-xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <h3 className="font-bold text-lg text-foreground">Have a shopping list?</h3>
        <p className="text-sm text-muted-foreground mb-4">Find all items in one go & build your cart 10x faster!</p>
        <div className="grid grid-cols-2 gap-3 text-center">
          <GlassButton href="/spark?tab=scan" icon={Camera} label="Scan it" />
          <GlassButton href="/spark?tab=speak" icon={Mic} label="Say it" className="!bg-blue-400/20 !border-blue-300/50" />
        </div>
      </div>
    </div>
  );
}

function GlassButton({ href, icon: Icon, label, className }: { href: string; icon: React.ElementType, label: string, className?: string }) {
  return (
    <Link href={href} className={`flex flex-col items-center justify-center p-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors ${className}`}>
      <Icon className="w-6 h-6 text-foreground mb-1" />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </Link>
  );
}
