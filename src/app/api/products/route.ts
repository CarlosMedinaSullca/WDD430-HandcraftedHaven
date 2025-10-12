import { NextResponse } from "next/server";
import { initDb, getDb } from "@/lib/db";
import { Product } from "@/models/Product";

// GET: fetch all products
export async function GET() {
  try {
    await initDb(); // initialize DB first
    const db = getDb();
    const products = await db.collection("product").find({}).toArray();

    // convert _id to id string
    const sanitizedProducts = products.map((p) => ({
      ...p,
      id: p._id.toString(),
      _id: p._id.toString(),
    }));

    return NextResponse.json(sanitizedProducts, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}

// POST: create a product
export async function POST(request: Request) {
  try {
    const productData: Omit<Product, "id" | "_id"> = await request.json();

    if (!productData.name || !productData.price || !productData.description) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await initDb(); // initialize DB first
    const db = getDb();
    const result = await db.collection("products").insertOne(productData);

    return NextResponse.json({ ...productData, id: result.insertedId.toString() }, { status: 201 });
  } catch (err) {
    console.error("Failed to create product:", err);
    return NextResponse.json({ message: "Error creating product" }, { status: 500 });
  }
}
