"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Profile, Artisan } from "@/app/types/interfacesModels";
import { useAuthStore } from "./authStore";
import { useNavigationWithLoading } from "./useNavigationWithLoading";

interface ProfileElementsProps {
  profile: Profile;
}

export default function ProfileElements({ profile }: ProfileElementsProps) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { navigateWithLoading, NavigationSpinner } = useNavigationWithLoading();
  const [artisan, setArtisan] = useState<Artisan | null>(null);

  const artisanId = profile.artisan_id;

  useEffect(() => {
    if (!artisanId) return;

    async function fetchArtisan() {
      try {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.NEXTAUTH_URL ||
              "https://wdd-430-handcrafted-haven-kappa.vercel.app/"
            : "http://localhost:3000";

        const res = await fetch(`${baseUrl}/api/artisans/${artisanId}`, {
          cache: "no-store",
        });

        if (!res.ok) return setArtisan(null);
        const data = await res.json();
        setArtisan(data);
      } catch (error) {
        setArtisan(null);
      }
    }

    fetchArtisan();
  }, [artisanId]);

  if (isLoading) return <p>Loading...</p>;

  function MyProducts({ userId }: { userId: string }) {
    return (
      <button
        onClick={() => navigateWithLoading(`/products?owner=${userId}`)}
        className="absolute bottom-5 right-10 bg-green-500 px-5 py-2 rounded-lg text-white font-medium shadow hover:bg-green-600 hover:scale-105 transition"
      >
        My Products
      </button>
    );
  }

  const showMyProducts =
    isAuthenticated &&
    artisan &&
    user?.user_id.toString() === artisan.user_id.toString();

  return (
    <div
      className="relative h-[30rem] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('${
          profile.background_pic ||
          "https://cdn.pixabay.com/photo/2022/04/21/14/31/pottery-7147634_960_720.jpg"
        }')`,
      }}
    >
      <div className="absolute bottom-10 left-10 flex flex-col items-center bg-black/40 text-white p-4 rounded-lg shadow">
        <Image
          src={profile.profile_picture || "/default-profile.png"}
          width={150}
          height={150}
          className="rounded-full border-4 border-purple-300"
          alt="profile picture"
        />
        <h1 className="text-xl mt-3">
          {artisan
            ? `${artisan.first_name} ${artisan.last_name}`
            : profile.name}
        </h1>
        <p className="opacity-90">
          Role: {artisan ? "Artesano 🎨" : "Cliente 👤"}
        </p>
      </div>

      {showMyProducts && <MyProducts userId={user?.user_id.toString() || ""} />}
      <NavigationSpinner />
    </div>
  );
}
