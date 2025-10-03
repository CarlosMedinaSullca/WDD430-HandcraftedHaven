"use client";
import React,{ useEffect,useState } from "react";
import { ProductInterface } from "../types/interfacesModels";
import { useRouter } from 'next/navigation';

interface SingleItemProps {
  product: ProductInterface;
}
interface RelatedItemsProps {
  category: string;
  currentProductId?: number; 
}

const SingleItem = ({ product }: SingleItemProps) => {
    const router = useRouter();
     const handleTestProduct = () => {
      router.push('/products/101');
    };
  return (
   <button onClick={handleTestProduct}>
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
const SingleItemSkeleton = () => {
  return (
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
};
const RelatedItemsSkeleton = () => {
  return (
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
};
export const RelatedItems = ({ category,currentProductId }: RelatedItemsProps) => {
  const [relatedItems, setRelatedItems] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const mockRelatedProducts: ProductInterface[] = [
    {
      product_id: 102,
      name: "Boho Macrame Earrings",
      price: 45.00,
      stock: 30,
      description: "Beautiful boho style earrings with silver details.",
      big_picture: "https://placehold.co/600x400/7cb7af/white?text=Earrings+Main",
      small_picture: "https://placehold.co/300x200/7cb7af/white?text=Earrings+Small",
      category: "Jewelry",
      Artisan_Artisan_id: 12
    },
    {
      product_id: 103,
      name: "Silver Macrame Necklace",
      price: 65.00,
      stock: 25,
      description: "Elegant silver necklace with macrame patterns.",
      big_picture: "https://placehold.co/600x400/9ca89e/white?text=Necklace+Main",
      small_picture: "https://placehold.co/300x200/9ca89e/white?text=Necklace+Small",
      category: "Jewelry",
      Artisan_Artisan_id: 12
    },
    {
      product_id: 104,
      name: "Boho Anklet",
      price: 35.00,
      stock: 40,
      description: "Delicate boho style anklet for summer.",
      big_picture: "https://placehold.co/600x400/cadedf/white?text=Anklet+Main",
      small_picture: "https://placehold.co/300x200/cadedf/white?text=Anklet+Small",
      category: "Jewelry",
      Artisan_Artisan_id: 13
    },
    {
      product_id: 105,
      name: "Macrame Ring Set",
      price: 55.00,
      stock: 20,
      description: "Set of three macrame pattern rings.",
      big_picture: "https://placehold.co/600x400/16796f/white?text=Rings+Main",
      small_picture: "https://placehold.co/300x200/16796f/white?text=Rings+Small",
      category: "Jewelry",
      Artisan_Artisan_id: 12
    }
  ];
  useEffect(() => {
    const fetchRelatedItems = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredItems = mockRelatedProducts.filter(item => 
        item.category === category && item.product_id !== currentProductId
      );
      
      setRelatedItems(filteredItems.slice(0, 4));
      setLoading(false);
    };

    fetchRelatedItems();
  }, [category, currentProductId]);

   if (loading) {
    return <RelatedItemsSkeleton />;
  }

  return(
    relatedItems.length > 0?(
        <div className="mt-12">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">
          Related Items You Might Like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedItems.map((item) => (
                <SingleItem key={item.product_id} product={item} />
            ))}
        </div>
        </div>
  ):<div className="mt-12 flex flex-col items-center justify-center">
    <p className="text-gray-500">No related items found.</p>
  </div>);

};