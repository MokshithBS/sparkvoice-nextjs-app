import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function DiwaliBanner() {
  return (
    <div className="my-4 space-y-2">
        <div className="relative rounded-xl overflow-hidden aspect-[2/1]">
            <Image
                src="https://storage.googleapis.com/aip-dev-images-public/65b10e52-eb06-444a-9b4a-a4e9b97779de.png"
                alt="Sparkathon Sale Banner"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                <h2 className="text-white text-3xl font-extrabold drop-shadow-lg">Grand</h2>
                <h2 className="text-white text-3xl font-extrabold drop-shadow-lg -mt-2">Sparkathon Sale</h2>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground h-auto p-1 px-3 rounded-full w-fit mt-2 text-xs font-bold">
                UPTO 50% OFF &gt;
                </Button>
            </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
            powered by students of siddaganga institute of technology
        </div>
    </div>
  );
}
