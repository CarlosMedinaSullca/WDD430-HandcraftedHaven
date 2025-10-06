"use client";

import React from "react";
import { ProductInterface } from "../types/interfacesModels";
import { useRouter } from "next/navigation";

interface ProductGridProps {
  products: ProductInterface[];
  loading?: boolean;
}

const ProductGridSkeleton: React.FC = () => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800"
        >
          {/* Imagen */}
          <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>

          {/* Nombre */}
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

          {/* Descripción */}
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>

          {/* Precio */}
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>

          {/* Categoría */}
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>

          {/* Stock */}
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
}) => {
  const router = useRouter();

  const handleProduct = (id?: string) => {
    if (!id) return;
    router.push(`/products/${id}`);
  };

  if (loading || !products?.length) {
    return <ProductGridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <button
          key={product.product_id}
          onClick={() =>{
            console.log("Navigating to product:", product._id);
            handleProduct(product._id?.toString())}}
          className="text-left"
        >
          <div
            className="border rounded-lg p-4 shadow hover:shadow-lg 
                       hover:bg-[#9CA89E]/20 dark:hover:bg-gray-700/30 
                       transition-all duration-300"
          >
            <img
              src={product.big_picture ?? "/placeholder.png"}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
              {product.description}
            </p>
            <p className="text-lg font-bold text-[#16796F] mb-1">
              ${product.price.toFixed(2)}
            </p>
            {product.category && (
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Stock: {product.stock}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
