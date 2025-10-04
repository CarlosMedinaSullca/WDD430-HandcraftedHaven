
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { Product } from "@/models/Product";

const DB_NAME = "handcrafted-haven";
const COLLECTION_NAME = "products";

// GET: Fetch all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const products = await db.collection(COLLECTION_NAME).find({}).toArray();

    // Convert ObjectId to string for JSON serialization
    const sanitizedProducts = products.map((product) => ({
      ...product,
      id: product._id.toString(),
      _id: undefined, // Remove _id
    }));

    return NextResponse.json(sanitizedProducts, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

// POST: Create a new product
export async function POST(request: Request) {
  try {
    const productData: Omit<Product, "id" | "_id"> = await request.json();

    // Basic validation
    if (!productData.name || !productData.price || !productData.description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db.collection(COLLECTION_NAME).insertOne(productData);

    const newProduct = {
      ...productData,
      id: result.insertedId.toString(),
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}