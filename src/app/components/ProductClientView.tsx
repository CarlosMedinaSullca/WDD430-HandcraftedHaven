"use client";

import React, { useState } from "react";
import { ProductInterface } from "../types/interfacesModels";

interface Props {
  product: ProductInterface;
}

export default function ProductClientView({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.big_picture ?? "/placeholder.png");

  const productImages = [
    product.big_picture,
    product.small_picture,
    "https://placehold.co/600x400/7cb7af/white?text=Detail+Shot",
    "https://placehold.co/600x400/9ca89e/white?text=Side+View",
    "https://placehold.co/600x400/cadedf/white?text=Wearing",
  ].filter(Boolean);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Galería de imágenes */}
      <div className="lg:w-1/2 flex flex-col items-center">
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
          <img
            src={selectedImage}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          {productImages.map((img, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedImage === img
                  ? "border-2 border-teal-500 ring-2 ring-teal-200"
                  : "border border-gray-300 hover:border-teal-500"
              }`}
              onClick={() => setSelectedImage(img!)}
            >
              <img src={img!} alt={`${product.name}-${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Detalles del producto */}
      <div className="lg:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
        <p className="text-2xl font-bold text-teal-700 mb-6">${product.price.toFixed(2)}</p>

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

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
