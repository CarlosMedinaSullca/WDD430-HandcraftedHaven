import { Banner } from "./components/banner";
import Carrousel from "./components/Carrousel";
import FeaturedArtisans from "./components/FeaturedArtisansCarr";
import Footer from "./components/Footer";
import { NavBar } from "./components/navBar";
import TrendingCategories from "./components/TrendingCategories";
import { Gem, Leaf, LampDesk, Shirt } from "lucide-react";

export default function Home() {
  const productsMock = [
    { name: "Example 1", src: "/categories/categorie1.png" },
    { name: "Example 2", src: "/categories/categorie2.png" },
    { name: "Example 3", src: "/categories/categorie3.png" },
  ];

  const artisansMock = [
    { name: "Ivan Leffalle", src: "/categories/categorie1.png" },
    { name: "Ivan Leffalle", src: "/categories/categorie1.png" },
    { name: "Ivan Leffalle", src: "/categories/categorie1.png" },
  ];

  const categoriesMock = [
    { name: "Jewelry", icon: Gem },
    { name: "Home Decor", icon: Leaf },
    { name: "Home Decor", icon: LampDesk },
    { name: "Apparel", icon: Shirt },
  ];
  return (
    <div className="font-sans min-h-screen flex flex-col items-center">
      <header className="sticky top-0 z-50 w-full bg-white shadow">
        <NavBar />
      </header>

      <main className="flex flex-col gap-8 max-w-7xl items-center p-8 pt-8">
        <Banner />
        <Carrousel list={productsMock} />
        <FeaturedArtisans artisans={artisansMock} />
        <TrendingCategories categories={categoriesMock} />
      </main>
      <Footer />
    </div>
  );
}
