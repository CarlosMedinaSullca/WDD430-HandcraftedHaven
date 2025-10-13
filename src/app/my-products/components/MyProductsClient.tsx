"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductInterface } from "@/app/types/interfacesModels";
import { ProductGrid } from "@/app/components/productGrid";
import ProductForm from "@/app/components/ProductForm";

interface MyProductsClientProps {
  session: any;
}

async function fetchUserProducts(
  userId: string,
  sort: any = {},
  page: number = 1,
  limit: number = 6
): Promise<{ products: ProductInterface[]; total: number; totalPages: number }> {
  const skip = (page - 1) * limit;
  const params = new URLSearchParams({
    sort: JSON.stringify(sort),
    page: page.toString(),
    limit: limit.toString(),
    owner: userId,
  });

  const response = await fetch(`/api/products?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch products");

  const data = await response.json();
  const userProducts = data.filter(
    (p: ProductInterface) => p.artisan_id?.toString() === userId
  );
  const total = userProducts.length;
  const totalPages = Math.ceil(total / limit);

  return {
    products: userProducts.slice(skip, skip + limit),
    total,
    totalPages,
  };
}

export default function MyProductsClient({ session }: MyProductsClientProps) {
  const { data: clientSession } = useSession();
  const router = useRouter();
  const userId = clientSession?.user?.id || session?.user?.id;

  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<any>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // 👈 Added limit (was missing in useEffect call)
  const limit = 6;

  useEffect(() => {
    if (!userId) {
      router.push("/");
      return;
    }
    refetchProducts();
  }, [userId, sort, currentPage, limit]); 
  const refetchProducts = async () => {
    setLoading(true);
    try {
      const { products: fetched, totalPages: pages } = await fetchUserProducts(
        userId,
        sort,
        currentPage,
        limit // 👈 Pass limit here
      );
      setProducts(fetched);
      setTotalPages(pages);
    } catch (err) {
      alert("Error fetching products: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSort: any) => {
    setSort(newSort);
    setCurrentPage(1);
  };

  const handleEdit = (product: ProductInterface) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    setDeleteLoading(productId);

    try {
      const response = await fetch(`/api/products/${productId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete product");
      alert("Product deleted successfully!");
      refetchProducts();
    } catch (err) {
      alert("Error deleting product: " + (err as Error).message);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleFormSuccess = () => {
    refetchProducts();
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (clientSession?.user?.role !== "seller") {
    return <div>Access denied. Sellers only.</div>;
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add New Product
        </button>
      </div>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
        Manage your handcrafted products.
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const sortValue = formData.get("sort") as string;
          let newSort = {};
          if (sortValue === "price-asc") newSort = { price: 1 };
          if (sortValue === "price-desc") newSort = { price: -1 };
          if (sortValue === "name-asc") newSort = { name: 1 };
          if (sortValue === "name-desc") newSort = { name: -1 };
          handleSortChange(newSort);
        }}
        className="mb-6 flex flex-wrap gap-4 items-center"
      >
    
        <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
          Sort by:
          <select
            id="sort-select"
            name="sort"
            defaultValue={Object.keys(sort)[0] || ""} // Simplified default
            className="ml-2 px-3 py-2 rounded bg-[#CADEDF] text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16796F]"
            aria-required="false" // Optional: Indicates not required
          >
            <option value="">None</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
        </label>

        <button
          type="submit"
          className="bg-[#16796F] text-white px-4 py-2 rounded hover:bg-[#7CB7AF] transition"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={() => {
            handleSortChange({});
            setCurrentPage(1);
          }}
          className="border border-[#9CA89E] text-[#16796F] bg-white px-4 py-2 rounded hover:bg-[#CADEDF] transition"
        >
          Reset
        </button>
      </form>

      <ProductGrid
        products={products}
        loading={loading}
        showActions={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="flex justify-center items-center mt-6 gap-4">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 border rounded bg-white text-[#16796F] hover:bg-[#CADEDF] transition"
            disabled={loading}
          >
            Previous
          </button>
        )}
        <span className="px-3 py-1 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 border rounded bg-white text-[#16796F] hover:bg-[#CADEDF] transition"
            disabled={loading}
          >
            Next
          </button>
        )}
      </div>

      {products.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg mb-2">No products found.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#16796F] text-white px-4 py-2 rounded hover:bg-[#7CB7AF] transition"
          >
            Add Your First Product
          </button>
        </div>
      )}

      <ProductForm
        product={null}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleFormSuccess}
        mode="add"
        userId={userId || ""}
      />
      <ProductForm
        product={editingProduct}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleFormSuccess}
        mode="edit"
        userId={userId || ""}
      />
    </main>
  );
}