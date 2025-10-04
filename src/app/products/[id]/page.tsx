"use client";
import React, { useState, useEffect } from "react";
import {
  ReviewInterface,
  ProductInterface,
} from "../../types/interfacesModels";
import { RelatedItems } from "@/app/components/relatedItems";
import Reviews from "@/app/components/reviews";

interface ProductPageProps {
  params: {
    id: number|undefined;
  };
}

const mockProduct: ProductInterface = {
  product_id: 101,
  name: "Boho Macrame Silver Cuff Bracelet",
  price: 85.0,
  stock: 45,
  description:
    "Handcrafted silver cuff bracelet with boho macrame details. Perfect for any occasion.",
  big_picture: "https://placehold.co/600x400",
  small_picture: "https://placehold.co/300x200",
  category: "Jewelry",
  Artisan_Artisan_id: 12,
};

const ImageGallerySkeleton = () => (
  <div className="lg:w-1/2 flex flex-col items-center justify-center">
    <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4 w-full animate-pulse">
      <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
    </div>
    
    <div className="flex gap-2 justify-center flex-wrap w-full">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse"
        ></div>
      ))}
    </div>
  </div>
);

const ProductDetailsSkeleton = () => (
  <div className="lg:w-1/2 space-y-6">
    <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
    
    <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
    
    <div className="mb-6">
      <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="flex items-center w-32">
        <div className="w-8 h-8 bg-gray-200 rounded-l animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-300 border-y animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-r animate-pulse"></div>
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
    
    <div className="mt-8">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
      </div>
    </div>
    
    <div className="mt-6">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
    </div>
    
    <div className="mt-6">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-20 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
      </div>
    </div>

    <div className="mt-6">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
    </div>
  </div>
);

const BreadcrumbSkeleton = () => (
  <div className="text-sm text-gray-500 mb-4 animate-pulse">
    <div className="flex gap-1">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
      <span>&gt;</span>
      <div className="h-4 bg-gray-200 rounded w-32"></div>
      <span>&gt;</span>
      <div className="h-4 bg-gray-200 rounded w-40"></div>
    </div>
  </div>
);

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState(mockProduct.big_picture);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const productImages = [
    { src: mockProduct.big_picture, alt: "Main View" },
    { src: mockProduct.small_picture, alt: "Alternate View" },
    {
      src: "https://placehold.co/600x400/7cb7af/white?text=Detail+Shot",
      alt: "Detail View",
    },
    {
      src: "https://placehold.co/600x400/9ca89e/white?text=Side+View",
      alt: "Side View",
    },
    {
      src: "https://placehold.co/600x400/cadedf/white?text=Wearing",
      alt: "Product in Use",
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbSkeleton />
        <div className="flex flex-col lg:flex-row gap-8">
          <ImageGallerySkeleton />
          <ProductDetailsSkeleton />
        </div>
        <Reviews product_id={params.id} />
        <RelatedItems category={mockProduct.category || "Jewelry"} currentProductId={params.id}/>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-4">
        <span>Handcrafted</span> &gt; <span>Search for unique items...</span>{" "}
        &gt; <span>{mockProduct.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 flex flex-col items-center justify-center">
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
            <img
              src={selectedImage}
              alt={mockProduct.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedImage === image.src
                    ? "border-2 border-teal-500 ring-2 ring-teal-200"
                    : "border border-gray-300 hover:border-teal-500"
                }`}
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={`${mockProduct.name} - ${image.alt}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {mockProduct.name}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">{"★".repeat(5)}</div>
            <span className="ml-2 text-gray-600">(45 reviews)</span>
          </div>

          <div className="text-2xl font-bold text-teal-700 mb-6">
            ${mockProduct.price.toFixed(2)}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center">
              <button
                className="bg-gray-200 px-3 py-1 rounded-l hover:bg-teal-700 transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="bg-gray-400 px-4 py-1 border-y">{quantity}</span>
              <button
                className="bg-gray-200 px-3 py-1 rounded-r hover:bg-teal-700 transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold mb-4 hover:bg-teal-800 transition-colors">
            Add to Cart
          </button>

          <button className="w-full border border-gray-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <span>Favorite</span>
          </button>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-gray-600">{mockProduct.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Materials
            </h2>
            <p className="text-gray-600">
              Sterling silver, macrame threads, and high-quality clasps.
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Shipping
            </h2>
            <p className="text-gray-600">
              Free shipping on orders over $50. Delivery within 3-5 business
              days.
            </p>
          </div>

          <div className="mt-6">
            <button className="text-teal-700 font-semibold hover:underline">
              View Artisan Profile
            </button>
          </div>
        </div>
      </div>
     <Reviews product_id={mockProduct.product_id} />
     <RelatedItems category={mockProduct.category || "Jewelry"} currentProductId={mockProduct.product_id}/>
    </div>
  );
}