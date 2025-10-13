import { initDb, getDb } from "@/lib/db";

export async function GET() {
  try {
    await initDb();
    const db = getDb();

    await db
      .collection("category")
      .updateOne(
        { name: "Embroidery" },
        { $set: { name: "Embroidery & Cross-Stitch" } }
      );

    return Response.json({ message: "✅ Category updated successfully" });
  } catch (error) {
    console.error("❌ Error updating category:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
