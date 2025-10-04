import { initDb, getDb } from "@/lib/db";

export async function GET() {
  try {
    await initDb();
    const db = getDb();
    const artisans = await db.collection("artisan").find({}).toArray();
    console.log("artisans", artisans);
    return Response.json(artisans);
  } catch (error) {
    console.error("DB operation failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
