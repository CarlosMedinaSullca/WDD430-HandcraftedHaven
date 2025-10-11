import { Banner } from "./components/banner";
import Carrousel from "./components/Carrousel";
import FeaturedArtisans from "./components/FeaturedArtisansCarr";

import TrendingCategories from "./components/TrendingCategories";
import { Gem, Leaf, LampDesk, Shirt, LucideIcon } from "lucide-react";
import React from "react";
import { fetchCategories } from "./endpoints/categories";
import { fetchArtisans } from "./endpoints/artisans";
import { fetchProducts } from "./endpoints/products";

interface Category {
  name: string;
  icon: LucideIcon;
}
const iconMap: Record<string, LucideIcon> = {
  Gem,
  Leaf,
  LampDesk,
  Shirt,
};

const rawCategories = await fetchCategories();
const rawArtisans = await fetchArtisans();

const categories: Category[] = rawCategories
  .slice(0, 10)
  .map((cat: { name: string; icon: string }) => ({
    name: cat.name,
    icon: iconMap[cat.icon] || Gem,
  }));

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center">
      <header className="sticky top-0 z-50 w-full bg-white shadow"></header>

      <main className="flex flex-col gap-8 max-w-7xl items-center p-8 pt-8">
        <Banner />
        <Carrousel />
        <FeaturedArtisans artisans={rawArtisans} />
        <TrendingCategories categories={categories} />
        {/*<button
          onClick={handleTestProduct}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Open Review Modal
        </button>*/}
      </main>
    </div>
  );
}
