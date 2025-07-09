
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function DiwaliBanner() {
  const { t } = useLanguage();
  return (
    <div className="my-4 space-y-2">
        <div className="relative rounded-xl overflow-hidden aspect-[2/1] group">
            <Image
                src="https://storage.googleapis.com/aip-dev-images-public/65b10e52-eb06-444a-9b4a-a4e9b97779de.png"
                alt="Sparkathon Sale Banner"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                <h2 className="text-white text-3xl font-extrabold drop-shadow-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>{t('store.diwaliBanner.title1')}</h2>
                <h2 className="text-white text-3xl font-extrabold drop-shadow-lg -mt-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>{t('store.diwaliBanner.title2')}</h2>
                <Button 
                  size="sm" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground h-auto p-1 px-3 rounded-full w-fit mt-2 text-xs font-bold opacity-0 animate-fade-in-up" 
                  asChild
                  style={{ animationDelay: '0.6s' }}
                >
                  <Link href="/sale" className="relative overflow-hidden">
                    {t('store.diwaliBanner.button')} &gt;
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
                  </Link>
                </Button>
            </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
            {t('store.diwaliBanner.poweredBy')}
        </div>
    </div>
  );
}
