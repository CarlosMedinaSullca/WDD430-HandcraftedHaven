import { initDb, getDb } from "@/lib/db";
import { Product } from "@/models/Product";
import Link from "next/link";
import { ProductGrid } from "../components/productGrid";
import { ProductInterface } from "../types/interfacesModels";

export function serializeProduct(raw: any): ProductInterface {
  return {
    product_id: raw.product_id ?? undefined,
    _id: raw._id?.toString() ?? "",  // <--- ObjectId a string
    name: String(raw.name ?? "Unnamed Product"),
    price:
      typeof raw.price === "object" && raw.price.$numberDecimal
        ? Number(raw.price.$numberDecimal)
        : Number(raw.price ?? 0),
    stock:
      typeof raw.stock === "object" && raw.stock.$string
        ? String(raw.stock.$string)
        : String(raw.stock ?? "N/A"),
    description: String(raw.description ?? ""),
    big_picture: String(raw.big_picture ?? ""),
    small_picture: String(raw.small_picture ?? ""),
    category: String(raw.category ?? ""),
    Artisan_Artisan_id: raw.Artisan_Artisan_id ?? undefined,
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { category?: string; sort?: string };
}) {
  await initDb();
  const db = getDb();
  
  // Build query
  const query: any = {};
  if (searchParams?.category && searchParams.category !== "All") {
    query.category = searchParams.category;
  }

  // Sorting
  let sort: any = {};
  if (searchParams?.sort === "price-asc") sort = { price: 1 };
  if (searchParams?.sort === "price-desc") sort = { price: -1 };
  if (searchParams?.sort === "name-asc") sort = { name: 1 };
  if (searchParams?.sort === "name-desc") sort = { name: -1 };

  // Fetch and normalize products
  const rawProducts = await db
    .collection<Product>("product")
    .find(query)
    .sort(sort)
    .toArray();

  const products: ProductInterface[] = rawProducts.map(serializeProduct);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>

      {/* Filter Form */}
      <form method="GET" className="mb-6 flex flex-wrap gap-4 items-center">
        {/* Category */}
        <select
          name="category"
          defaultValue={searchParams?.category || "All"}
          className="px-3 py-2 rounded bg-[#CADEDF] text-gray-800 border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-[#16796F]"
        >
          <option value="All">All Categories</option>
          <option value="Knitting">Knitting</option>
          <option value="Sewing">Sewing</option>
          <option value="Embroidery & Cross-Stitch">
            Embroidery & Cross-Stitch
          </option>
          <option value="Weaving">Weaving</option>
          <option value="Macramé">Macramé</option>
        </select>

        {/* Sort */}
        <select
          name="sort"
          defaultValue={searchParams?.sort || ""}
          className="px-3 py-2 rounded bg-[#CADEDF] text-gray-800 border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-[#16796F]"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </select>

        {/* Apply Button */}
        <button
          type="submit"
          className="bg-[#16796F] text-white px-4 py-2 rounded 
                     hover:bg-[#7CB7AF] transition"
        >
          Apply
        </button>

        {/* Reset Button */}
        <Link
          href="/products"
          className="border border-[#9CA89E] text-[#16796F] bg-white 
                     px-4 py-2 rounded hover:bg-[#CADEDF] transition"
        >
          Reset
        </Link>
      </form>

      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
}
