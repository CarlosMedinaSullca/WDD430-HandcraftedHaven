import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { SearchBar } from "../ui/searchBar";
import { MobileMenu } from "../ui/menu";
import { Logo } from "../ui/logo";
export function NavBar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />
          {/* Search Bar - Hidden on mobile */}
          <SearchBar />
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 ml-1">
                0
              </span>
            </button>

            <button className="flex items-center space-x-1 px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
              <User className="h-5 w-5" />
              <span>Login</span>
            </button>

            <button className="flex items-center space-x-1 px-3 py-2 rounded-2xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
