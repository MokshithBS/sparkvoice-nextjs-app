import Image from 'next/image';

const categories = [
  { name: 'Diyas, idols & puja needs', discount: '70% OFF', image: 'https://placehold.co/100x100.png', hint: 'diya lamp' },
  { name: 'Festive gifting & chocolates', discount: '80% OFF', image: 'https://placehold.co/100x100.png', hint: 'chocolate gift' },
  { name: 'Sweets & dry fruits', discount: '70% OFF', image: 'https://placehold.co/100x100.png', hint: 'indian sweets' },
  { name: 'Festive cooking', discount: '60% OFF', image: 'https://placehold.co/100x100.png', hint: 'cooking oil' },
  { name: 'Lights & home needs', discount: '70% OFF', image: 'https://placehold.co/100x100.png', hint: 'fairy lights' },
  { name: 'Festive cleaning', discount: '50% OFF', image: 'https://placehold.co/100x100.png', hint: 'cleaning spray' },
  { name: 'Diwali party picks', discount: '70% OFF', image: 'https://placehold.co/100x100.png', hint: 'soda can' },
  { name: 'Beauty & fashion', discount: '80% OFF', image: 'https://placehold.co/100x100.png', hint: 'kurta fashion' },
];

export function CategoryGrid() {
  return (
    <div className="my-6">
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 text-center text-[11px] leading-tight font-medium">
        {categories.map((category) => (
          <a href="#" key={category.name} className="flex flex-col items-center space-y-2 group">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-card/80">
              <Image src={category.image} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform" data-ai-hint={category.hint} />
              <div className="absolute top-0 left-0 m-1 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-primary/80 text-primary-foreground backdrop-blur-sm">UP TO {category.discount}</div>
            </div>
            <span className="text-foreground">{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
