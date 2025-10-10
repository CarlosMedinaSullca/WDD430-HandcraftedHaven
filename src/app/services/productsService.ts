// lib/services/productService.ts
import { getDb, initDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { serializeProduct } from "@/app/utils/serializers";
import { ProductInterface } from "@/app/types/interfacesModels";

export class ProductService {
  static async getProductById(id: string): Promise<ProductInterface | null> {
    await initDb();
    const db = getDb();

    const rawProduct = await db
      .collection("product")
      .findOne({ _id: new ObjectId(id) });

    return rawProduct ? serializeProduct(rawProduct) : null;
  }

  static async getRelatedProducts(
    category: string,
    excludeId: string,
    limit: number = 4
  ): Promise<ProductInterface[]> {
    await initDb();
    const db = getDb();

    const relatedItemsRaw = await db
      .collection("product")
      .find({
        category,
        _id: { $ne: new ObjectId(excludeId) },
      })
      .limit(limit)
      .toArray();

    return relatedItemsRaw.map(serializeProduct);
  }

  
}