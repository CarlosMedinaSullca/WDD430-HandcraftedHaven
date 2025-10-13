// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { initDb, getDb } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // Adjust path to your auth route
import { Product } from "@/models/Product"; 
import { ObjectId } from "mongodb"; 


export async function GET() {
  try {
    await initDb();
    const db = getDb();
    const products = await db.collection("product").find({}).toArray(); // Note: "product" collection

    const sanitizedProducts = products.map((p) => ({
      ...p,
      id: p._id.toString(),
      _id: p._id.toString(),
    }));

    return NextResponse.json(sanitizedProducts, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

// POST: create a product (enhanced to set artisan_id from session)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "seller") {
      return NextResponse.json(
        { message: "Unauthorized: Only sellers can create products" },
        { status: 401 }
      );
    }

    const productData: Omit<Product, "id" | "_id"> = await request.json();

    // Validation
    if (!productData.name || !productData.price || !productData.description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedProductData = {
      ...productData,
      artisan_id: new ObjectId(session.user.id), 
    };

    await initDb();
    const db = getDb();
    const result = await db.collection("product").insertOne(updatedProductData); 

    return NextResponse.json(
      { ...updatedProductData, id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("Failed to create product:", err);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}