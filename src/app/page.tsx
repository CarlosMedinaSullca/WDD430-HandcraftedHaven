import { Banner } from "./components/banner";
import Carrousel from "./components/Carrousel";
import FeaturedArtisans from "./components/FeaturedArtisansCarr";
import Footer from "./components/Footer";
import { NavBar } from "./components/navBar";
import TrendingCategories from "./components/TrendingCategories";
import { Gem, Leaf, LampDesk, Shirt, LucideIcon } from "lucide-react";
import  ProductView from "./products/[id]/page";
import React, {useState, useEffect} from "react";import { fetchCategories } from "./endpoints/categories";
import { fetchArtisans } from "./endpoints/artisans";

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
  .slice(0, 3)
  .map((cat: { name: string; icon: string }) => ({
    name: cat.name,
    icon: iconMap[cat.icon] || Gem, // fallback si no existe
  }));

console.log("categories in page", rawCategories);

export default function Home() {
  const productsMock = [
    { name: "Example 1", src: "/categories/categorie1.png" },
    { name: "Example 2", src: "/categories/categorie2.png" },
    { name: "Example 3", src: "/categories/categorie3.png" },
  ];

  return (
    <div className="font-sans min-h-screen flex flex-col items-center">
      <header className="sticky top-0 z-50 w-full bg-white shadow">
        <NavBar />
      </header>

      <main className="flex flex-col gap-8 max-w-7xl items-center p-8 pt-8">
        <Banner />
        <Carrousel list={productsMock} />
        <FeaturedArtisans artisans={rawArtisans} />
        <TrendingCategories categories={categories} />
        {/*<button
          onClick={handleTestProduct}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Open Review Modal
        </button>*/}
      </main>
      <Footer />
    </div>
  );
}
