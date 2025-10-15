"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import { SearchBar } from "../ui/searchBar";
import { MobileMenu } from "../ui/menu";
import { Logo } from "../ui/logo";
import Link from "next/link";
import {
  useAuthStore,
  useIsArtisan,
  useUserRole,
} from "@/app/components/authStore";

export function NavBar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { artisan, profile } = useAuthStore.getState();

  console.log("User", user);
  console.log("profile", profile);
  console.log("artisan", artisan);

  const isArtisan = useIsArtisan();
  const userRole = useUserRole();

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/signin";
  };

  return (
    <nav className="bg-white w-full shadow-md border-b border-gray-200">
      <div className="sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center h-16 gap-2 md:gap-8">
          {/* ✅ Logo with Home Link */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* 🔍 Search Bar */}
          <div className="w-full md:w-auto">
            <SearchBar />
          </div>

          {/* 🖥️ Desktop Navigation */}
          <div className="flex items-center space-x-4">
            {/* 🛒 Cart */}
            <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
              <ShoppingCart className="h-5 w-5" />
            </button>

            {/* 👤 Auth buttons */}
            {!isAuthenticated ? (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-1 px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              >
                <span>Login / Signup</span>
              </Link>
            ) : (
              <>
                <span className="text-gray-700 text-sm">
                  Hi, {user?.first_name || "User"}
                  {isArtisan && (
                    <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      🎨 Artisan
                    </span>
                  )}
                </span>

                {/* 👨‍🎨 Artisan-only Profile Button */}
                {isArtisan && (
                  <Link
                    href={`/profile/${artisan?._id}`}
                    className="flex items-center space-x-1 px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-2xl text-sm font-medium bg-[#16796F] text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* 📱 Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
