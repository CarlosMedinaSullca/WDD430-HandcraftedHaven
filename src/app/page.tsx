import { Banner } from "./components/banner";
import Carrousel from "./components/Carrousel";
import { NavBar } from "./components/navBar";

export default function Home() {
  const categoriesMock = [
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
        <Carrousel list={categoriesMock} />
      </main>
    </div>
  );
}
