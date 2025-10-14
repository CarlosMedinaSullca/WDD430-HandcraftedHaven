// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { initDb, getDb } from "@/lib/db";
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

export async function POST(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    const artisanId = request.headers.get('x-artisan-id');
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User ID required" },
        { status: 401 }
      );
    }

    if (!artisanId) {
      return NextResponse.json(
        { message: "Unauthorized: Only artisans can create products" },
        { status: 401 }
      );
    }

    const productData = await request.json();

  
    if (!productData.name || !productData.price || !productData.description) {
      return NextResponse.json(
        { message: "Missing required fields: name, price, description" },
        { status: 400 }
      );
    }

    const updatedProductData = {
      ...productData,
      artisan_id: new ObjectId(artisanId),
      user_id: parseInt(userId), 
      created_at: new Date(),
      updated_at: new Date()
    };

    await initDb();
    const db = getDb();
    const result = await db.collection("product").insertOne(updatedProductData);

    return NextResponse.json(
      { 
        ...updatedProductData, 
        id: result.insertedId.toString(),
        _id: result.insertedId.toString()
      },
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