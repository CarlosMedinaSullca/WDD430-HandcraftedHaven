"use client";
import React from "react";
import { ProductInterface } from "../types/interfacesModels";
import { useRouter } from 'next/navigation';

interface SingleItemProps {
  product: ProductInterface;
}

interface RelatedItemsProps {
  relatedItems?: ProductInterface[]; 
  currentProductId?: number|string;
}

const SingleItem = ({ product }: SingleItemProps) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/products/${product._id}`);
  };

  return (
    <button onClick={handleClick}>
      <div className="group bg-white rounded-lg p-4 h-64 flex flex-col items-center justify-center shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-200 relative overflow-hidden">
        <div className="flex-1 w-full flex items-center justify-center">
          <img 
            src={product.small_picture} 
            alt={product.name}
            className="max-h-32 max-w-full object-contain opacity-90 group-hover:opacity-70 transition-opacity"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-70">
          <div className="text-center text-white p-4">
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-teal-300 font-bold">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

// Skeleton para un item
const SingleItemSkeleton = () => (
  <div className="bg-white rounded-lg p-4 h-64 flex flex-col items-center justify-center shadow-sm border border-gray-200 animate-pulse">
    <div className="flex-1 w-full flex items-center justify-center mb-3">
      <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
    </div>
    <div className="w-full text-center">
      <div className="h-4 bg-gray-300 rounded mb-2 mx-auto w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
    </div>
  </div>
);

// Skeleton completo para la sección
const RelatedItemsSkeleton = () => (
  <div className="mt-12">
    <div className="h-8 bg-gray-300 rounded w-64 mb-6 animate-pulse"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SingleItemSkeleton />
      <SingleItemSkeleton />
      <SingleItemSkeleton />
      <SingleItemSkeleton />
    </div>
  </div>
);

export const RelatedItems = ({ relatedItems, currentProductId }: RelatedItemsProps) => {
  if (!relatedItems) return <RelatedItemsSkeleton />;

  const filteredItems = relatedItems.filter(item => item.product_id !== currentProductId);
  console.log("Donde se pierde, filteredItems:", filteredItems,relatedItems,currentProductId);
  if (filteredItems.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center">
        <p className="text-gray-500">No related items found.</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">
        Related Items You Might Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <SingleItem key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};
