"use client";

import React from "react";
import { ProductInterface } from "../types/interfacesModels";
import { useRouter } from "next/navigation";
import Link from "next/link"; // For detail page navigation
import { useNavigationWithLoading } from "./useNavigationWithLoading";

interface ProductGridProps {
  products: ProductInterface[];
  loading?: boolean;
  showActions?: boolean; // Controls whether edit/delete buttons are shown
  onEdit?: (product: ProductInterface) => void;
  onDelete?: (productId: string) => void;
}

interface SkeletonProps {
  showActions?: boolean;
}

const ProductGridSkeleton: React.FC<SkeletonProps> = ({ showActions = false }) => {
  const skeletonItems = Array.from({ length: 6 });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800"
        >
          <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          {showActions && (
            <div className="h-8 bg-gray-300 rounded w-20 mt-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  showActions = false,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();
  const { navigateWithLoading, NavigationSpinner } = useNavigationWithLoading();

  const handleProductClick = (id?: string) => {
    if (!id || showActions) return;
    navigateWithLoading(`/products/${id}`);
  };

  if (loading || !products?.length) {
    // Pass showActions into the skeleton too
    return <ProductGridSkeleton showActions={showActions} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id || product.product_id}
          className={`border rounded-lg p-4 shadow hover:shadow-lg transition-all duration-300 ${
            showActions ? "relative" : "cursor-pointer"
          }`}
          onClick={() => handleProductClick(product._id?.toString())}
        >
          {!showActions && (
            <button className="w-full h-full block text-left">
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
            </button>
          )}

          {showActions && (
            <>
              <img
                src={product.big_picture ?? "/placeholder.png"}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                {product.description}
              </p>
              <p className="text-lg font-bold text-[#16796F] mb-1">
                ${product.price.toFixed(2)}
              </p>
              {product.category && (
                <p className="text-sm text-gray-500 mb-2">
                  Category: {product.category}
                </p>
              )}
              <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                Stock: {product.stock}
              </p>

              <div className="flex justify-between space-x-2 pt-2 border-t">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(product);
                  }}
                  className="flex-1 px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Are you sure you want to delete this product?")) {
                      onDelete?.(product._id || "");
                    }
                  }}
                  className="flex-1 px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      <NavigationSpinner/>
    </div>
  );
};
