import { ProductInterface } from "../types/interfacesModels";
import { RatingInterface } from "@/app/types/interfacesModels";

export function serializeProduct(raw: any): ProductInterface {
  return {
    product_id: raw.product_id ?? undefined,
    _id: raw._id?.toString() ?? "", 
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
export function serializeReview(rawReview: any): RatingInterface {
  return {
    _id: rawReview._id ? rawReview._id.toString() : undefined,
    product_id: rawReview.product_id,
    user_id: rawReview.user_id,
    rating: rawReview.rating
  };
}