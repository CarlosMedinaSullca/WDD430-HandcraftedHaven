"use client";

import { useState, useEffect } from "react";
import { ProductInterface } from "../types/interfacesModels";
import { ObjectId } from "mongodb"; // If needed for ID handling

interface ProductFormProps {
  product?: ProductInterface | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: "add" | "edit";
  userId: string;
}

export default function ProductForm({
  product,
  isOpen,
  onClose,
  onSuccess,
  mode,
  userId,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<ProductInterface, "_id" | "product_id">>({
    name: "",
    description: "",
    price: 0,
    stock: "",
    big_picture: "",
    small_picture: "",
    category: "",
    artisan_id: userId,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product && mode === "edit") {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock || "",
        big_picture: product.big_picture || "",
        small_picture: product.small_picture || "",
        category: product.category || "",
        artisan_id: product.artisan_id || userId,
      });
    } else if (mode === "add") {
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: "",
        big_picture: "",
        small_picture: "",
        category: "",
        artisan_id: userId,
      });
    }
  }, [product, mode, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.description || formData.price <= 0 || !formData.category) {
      setError("Please fill all required fields (name, description, price, category).");
      setLoading(false);
      return;
    }

    try {
      const url = mode === "add" ? "/api/products" : `/api/products/${product?._id}`;
      const method = mode === "add" ? "POST" : "PUT";
      const body = JSON.stringify(formData);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save product");
      }

      alert(mode === "add" ? "Product added successfully!" : "Product updated successfully!");
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
      console.error("Form submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {mode === "add" ? "Add New Product" : "Edit Product"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Price * ($)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium mb-1">
              Stock
            </label>
            <input
              id="stock"
              type="text"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Knitting">Knitting</option>
              <option value="Sewing">Sewing</option>
              <option value="Embroidery & Cross-Stitch">Embroidery & Cross-Stitch</option>
              <option value="Weaving">Weaving</option>
              <option value="Macramé">Macramé</option>
            </select>
          </div>

          <div>
            <label htmlFor="big_picture" className="block text-sm font-medium mb-1">
              Big Picture URL
            </label>
            <input
              id="big_picture"
              type="url"
              value={formData.big_picture}
              onChange={(e) => setFormData({ ...formData, big_picture: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="https://example.com/big-image.jpg"
            />
          </div>

          <div>
            <label htmlFor="small_picture" className="block text-sm font-medium mb-1">
              Small Picture URL
            </label>
            <input
              id="small_picture"
              type="url"
              value={formData.small_picture}
              onChange={(e) => setFormData({ ...formData, small_picture: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="https://example.com/small-image.jpg"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Saving..." : mode === "add" ? "Add Product" : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
