import { LocationHeader } from "@/components/store/location-header";
import { SearchBar } from "@/components/store/search-bar";
import { DiwaliBanner } from "@/components/store/diwali-banner";
import { CategoryGrid } from "@/components/store/category-grid";
import { ShoppingList } from "@/components/store/shopping-list";

export default function Home() {
  return (
    <div className="bg-neutral-900 py-10 flex items-center justify-center min-h-screen">
      <div className="relative mx-auto h-[844px] w-[390px] overflow-hidden rounded-[40px] border-[8px] border-black bg-background shadow-xl">
        <div className="absolute top-0 left-1/2 z-20 h-7 w-36 -translate-x-1/2 rounded-b-2xl bg-black"></div>
        <div className="h-full overflow-y-auto pb-40 scrollbar-hide">
          <LocationHeader />
          <main className="px-4">
            <SearchBar />
            <DiwaliBanner />
            <CategoryGrid />
          </main>
        </div>
        <ShoppingList />
      </div>
    </div>
  );
}