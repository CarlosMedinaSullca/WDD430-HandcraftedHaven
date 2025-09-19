"use client";
import { useState } from "react";
import { ShoppingCart, User, X, Menu } from "lucide-react";
import { SearchBar } from "../ui/searchBar";

export function MobileMenu() {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <X className="block h-6 w-6" />
          ) : (
            <Menu className="block h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-4 pb-3 space-y-3">
            {/* Mobile Search */}
            <SearchBar />

            {/* Mobile Navigation Links */}
            <button className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              <ShoppingCart className="h-5 w-5 mr-3" />
              Cart
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 ml-auto">
                0
              </span>
            </button>

            <button className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              <User className="h-5 w-5 mr-3" />
              Login / Sign Up
            </button>

            <button className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700">
              <User className="h-5 w-5 mr-3" />
              Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
