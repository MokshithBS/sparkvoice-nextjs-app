import { ChevronDown, CircleUserRound } from 'lucide-react';

export function LocationHeader() {
  return (
    <header className="flex items-start justify-between p-4 text-foreground sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-start gap-3">
        <div className="text-center">
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="font-bold text-white text-lg">5</span>
            </div>
            <span className="text-[10px] font-bold text-orange-200">MINS</span>
        </div>
        <div>
          <div className="flex items-center font-bold text-lg">
            <span>SIT, Tumkur</span>
            <ChevronDown className="w-5 h-5 mt-1" />
          </div>
          <p className="text-xs text-muted-foreground">SIT, BH Road, Tumkur, Karnataka, India</p>
        </div>
      </div>
      <CircleUserRound className="w-8 h-8 text-foreground/80" />
    </header>
  );
}
