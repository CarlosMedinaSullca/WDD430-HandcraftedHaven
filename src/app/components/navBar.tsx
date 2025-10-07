"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import { SearchBar } from "../ui/searchBar";
import { MobileMenu } from "../ui/menu";
import { Logo } from "../ui/logo";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white w-full shadow-md border-b border-gray-200">
      <div className="sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center h-16 gap-2 md:gap-8">
          {/* ✅ Logo with Home Link */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
              <ShoppingCart className="h-5 w-5" />
            </button>

            {/* Auth buttons */}
            {!session ? (
              <button
                onClick={() => signIn()}
                className="flex items-center space-x-1 px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              >
                <span>Login/Signup</span>
              </button>
            ) : (
              <>
                <span className="text-gray-700 text-sm">
                  Hi, {session.user?.name || "User"}
                </span>

                {/* Seller-only Profile Button */}
                {session.user?.role === "seller" && (
                  <Link
                    href="/profile"
                    className="flex items-center space-x-1 px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                )}

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center space-x-1 px-3 py-2 rounded-2xl text-sm font-medium bg-[#16796F] text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
