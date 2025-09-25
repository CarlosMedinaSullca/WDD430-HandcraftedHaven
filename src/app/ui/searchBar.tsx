"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // e.preventDefault();
    // if (searchQuery.trim()) {
    //   console.log("Searching for:", searchQuery);
    //   // We need to add teh search logic here
    // }
  };

  return (
    <div className="hidden md:flex flex-1 max-w-lg mx-8">
      <div className="w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} 
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search products..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
