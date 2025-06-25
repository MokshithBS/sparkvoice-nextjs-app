import Image from 'next/image';

const categories = [
  { name: 'Vegetables & Fruits', discount: '70% OFF', image: 'https://storage.googleapis.com/aip-dev-images-public/vegetables.png', hint: 'fresh vegetables' },
  { name: 'Dairy, Bread & Eggs', discount: '80% OFF', image: 'https://storage.googleapis.com/aip-dev-images-public/dairy.png', hint: 'milk bread' },
  { name: 'Atta, Rice & Dals', discount: '70% OFF', image: 'https://storage.googleapis.com/aip-dev-images-public/grains.png', hint: 'rice bag' },
  { name: 'Masala & Oils', discount: '60% OFF', image: 'https://storage.googleapis.com/aip-dev-images-public/spices.png', hint: 'spices cooking' },
  { name: 'Snacks & Beverages', discount: '70% OFF', image: 'https://storage.googleapis.com/aip-dev-images-public/snacks.png', hint: 'potato chips' },
  { name: 'Cleaning Essentials', discount: '50% OFF', image: 'https://storage.googleapis.com/aip-dev-images-public/cleaning.png', hint: 'cleaning supplies' },
  { name: 'Personal Care', discount: '70% OFF', image: 'https://storage.googleapis.com/aip-dev-images-public/personal-care.png', hint: 'shampoo bottle' },
  { name: 'Instant & Frozen Food', discount: '80% OFF', image: 'https://storage.googleapis.com/aip-dev-images-public/frozen-food.png', hint: 'instant noodles' },
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
