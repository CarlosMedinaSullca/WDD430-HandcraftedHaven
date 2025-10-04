"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X as CloseIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { Product } from "../../models/Product";

// --- Product Form Modal Component ---
const ProductFormModal = ({
  product,
  onClose,
  onSave,
  isSaving,
}: {
  product: Partial<Product> | null;
  onClose: () => void;
  onSave: (product: Omit<Product, "_id" | "id"> & { id?: string }) => void;
  isSaving: boolean;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    sellerId: "user123", // This should be dynamic in a real app
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        imageUrl: product.imageUrl || "",
        sellerId: product.sellerId || "user123",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        sellerId: "user123",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: product?.id,
      ...formData,
      price: parseFloat(formData.price) || 0,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {product?.id ? "Edit Product" : "Add New Product"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://placehold.co/400x400"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving && <Loader2 className="animate-spin" size={16} />}
              {isSaving ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOpenModalForNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (
    productData: Omit<Product, "_id" | "id"> & { id?: string }
  ) => {
    setIsSaving(true);
    const { id } = productData;
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/products/${id}` : "/api/products";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${id ? "update" : "create"} product.`);
      }

      if (id) {
        // Update existing product in state
        setProducts(
          products.map((p) =>
            p.id === id ? { ...p, ...productData, id } : p
          )
        );
      } else {
        // Add new product to state
        const newProduct: Product = await response.json();
        setProducts([newProduct, ...products]);
      }
      handleCloseModal();
    } catch (err: any) {
      alert(`Error: ${err.message}`); // Simple error feedback
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete product.");
        }

        setProducts(products.filter((p) => p.id !== productId));
      } catch (err: any) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  return (
    <>
      <div className="font-sans bg-gray-50 min-h-screen">
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            <button
              onClick={handleOpenModalForNew}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={18} />
              Add New Product
            </button>
          </div>

          {/* Loading and Error States */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="animate-spin text-gray-500" size={48} />
            </div>
          )}
          {error && (
            <div className="text-center py-16 px-6 bg-red-50 text-red-700 rounded-lg">
              <h3 className="text-xl font-medium">An Error Occurred</h3>
              <p>{error}</p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && (
            <>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group"
                    >
                      <div className="relative w-full h-48">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 text-sm mt-1 flex-grow">
                          {product.description.substring(0, 70)}...
                        </p>
                        <p className="text-lg font-bold text-gray-900 mt-3">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="border-t border-gray-200 p-3 bg-gray-50 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenModalForEdit(product)}
                          className="flex items-center justify-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id!)}
                          className="flex items-center justify-center gap-2 text-sm text-red-600 font-medium hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-gray-800">
                    No Products Yet
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Click "Add New Product" to start selling your creations!
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Modal for Adding/Editing Products */}
      {isModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          isSaving={isSaving}
        />
      )}
    </>
  );
}