import { initDb, getDb } from "@/lib/db";
import { Product } from "@/models/Product";
import Link from "next/link";
import { NavBar } from "../components/navBar"; // 👈 add NavBar
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
  searchParams: Promise<{ category?: string; sort?: string; page?: string; limit?: string }>;
}) {
  const params = await searchParams;

  await initDb();
  const db = getDb();
  
  // Build query
  const query: any = {};
  if (params?.category && params.category !== "All") {
    query.category = params.category;
  }

  // Sorting
  let sort: any = {};
  if (params?.sort === "price-asc") sort = { price: 1 };
  if (params?.sort === "price-desc") sort = { price: -1 };
  if (params?.sort === "name-asc") sort = { name: 1 };
  if (params?.sort === "name-desc") sort = { name: -1 };

  // Pagination
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "6", 10);
  const skip = (page - 1) * limit;

  const totalProducts = await db.collection<Product>("product").countDocuments(query);

  const rawProducts = await db
    .collection<Product>("product")
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();

  const products = rawProducts.map((p: any) => ({
    ...p,
    price:
      typeof p.price === "object" && p.price.$numberDecimal
        ? Number(p.price.$numberDecimal)
        : Number(p.price ?? 0),
    stock:
      typeof p.stock === "object" && p.stock.$string
        ? String(p.stock.$string)
        : String(p.stock ?? "N/A"),
    name: String(p.name ?? "Unnamed Product"),
  }));

  const totalPages = Math.ceil(totalProducts / limit);
  const products: ProductInterface[] = rawProducts.map(serializeProduct);

  return (
    <>
      <NavBar /> {/* ✅ NavBar added */}

      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>

        {/* Filter Form */}
        <form method="GET" className="mb-6 flex flex-wrap gap-4 items-center">
          <select
            name="category"
            defaultValue={params?.category || "All"}
            className="px-3 py-2 rounded bg-[#CADEDF] text-gray-800 border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-[#16796F]"
          >
            <option value="All">All Categories</option>
            <option value="Knitting">Knitting</option>
            <option value="Sewing">Sewing</option>
            <option value="Embroidery & Cross-Stitch">Embroidery & Cross-Stitch</option>
            <option value="Weaving">Weaving</option>
            <option value="Macramé">Macramé</option>
          </select>

          <select
            name="sort"
            defaultValue={params?.sort || ""}
            className="px-3 py-2 rounded bg-[#CADEDF] text-gray-800 border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-[#16796F]"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>

          <button
            type="submit"
            className="bg-[#16796F] text-white px-4 py-2 rounded 
                       hover:bg-[#7CB7AF] transition"
          >
            Apply
          </button>

          <Link
            href="/products"
            className="border border-[#9CA89E] text-[#16796F] bg-white 
                       px-4 py-2 rounded hover:bg-[#CADEDF] transition"
          >
            Reset
          </Link>
        </form>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id?.toString()}
              className="border rounded-lg p-4 shadow hover:shadow-lg 
                         hover:bg-[#9CA89E] transition-colors duration-300"
            >
              <img
                src={product.big_picture ?? "/placeholder.png"}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold text-[#16796F]">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm text-gray-700">Stock: {product.stock}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 gap-4">
          {page > 1 && (
            <Link
              href={`/products?page=${page - 1}&limit=${limit}&category=${params?.category || ""}&sort=${params?.sort || ""}`}
              className="px-4 py-2 border rounded bg-white text-[#16796F] hover:bg-[#CADEDF] transition"
            >
              Previous
            </Link>
          )}

          <span className="px-3 py-1 text-gray-700">
            Page {page} of {totalPages}
          </span>

          {page < totalPages && (
            <Link
              href={`/products?page=${page + 1}&limit=${limit}&category=${params?.category || ""}&sort=${params?.sort || ""}`}
              className="px-4 py-2 border rounded bg-white text-[#16796F] hover:bg-[#CADEDF] transition"
            >
              Next
            </Link>
          )}
        </div>
      </main>
    </>
      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
}
