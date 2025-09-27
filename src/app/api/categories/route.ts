import { initDb, getDb } from "@/lib/db";

export async function GET() {
  try {
    await initDb();
    const db = getDb();
    const categories = await db.collection("category").find({}).toArray();
    console.log("categories", categories);
    return Response.json(categories);
  } catch (error) {
    console.error("DB operation failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
