// lib/services/reviewService.ts
import { getDb, initDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { RatingInterface,ReviewInterface } from "@/app/types/interfacesModels";
import { serializeReview } from "@/app/utils/serializers";

export class ReviewService {
  private static db: any;

  private static async getCollection(collectionName: string) {
    if (!this.db) {
      await initDb();
      this.db = getDb();
    }
    return this.db.collection(collectionName);
  }

  // ========== RATING COLLECTION ==========
  static async getAllRatingsByProduct(productId: string): Promise<RatingInterface[]> {
    const collection = await this.getCollection("rating");
    const reviews = await collection.find({ product_id: productId }).toArray();
    return reviews.map(serializeReview);
  }

  static async getAllRatings(): Promise<RatingInterface[]> {
    const collection = await this.getCollection("rating");
    const reviews = await collection.find({}).toArray();
    return reviews.map(serializeReview);
  }

  static async getRatingById(id: string): Promise<RatingInterface | null> {
    const collection = await this.getCollection("rating");
    const review = await collection.findOne({ _id: new ObjectId(id) });
    return review ? serializeReview(review) : null;
  }

  static async getAverageRating(productId: string): Promise<number> {
    const collection = await this.getCollection("rating");
    const result = await collection
      .aggregate([
        { $match: { product_id: productId } },
        { $group: { _id: null, average: { $avg: "$rating" } } }
      ])
      .toArray();
    
    return result.length > 0 ? Math.round(result[0].average * 10) / 10 : 0;
  }

  static async createRating(ratingData: { product_id: string; user_id: string; rating: number }): Promise<RatingInterface> {
  const collection = await this.getCollection("rating");
  
  const newRating = {
    ...ratingData,
    created_at: new Date(),
    updated_at: new Date()
  };

  const result = await collection.insertOne(newRating);
  
  return {
    _id: result.insertedId.toString(),
    ...ratingData,
  };
}

  // ========== REVIEW COLLECTION ==========
  static async getAllReviewsByProduct(productId: string): Promise<any[]> {
    const collection = await this.getCollection("review");
    const reviews = await collection.find({ product_id: productId }).toArray();
    return reviews;
  }

  static async getAllReviews(): Promise<any[]> {
    const collection = await this.getCollection("review");
    const reviews = await collection.find({}).toArray();
    return reviews;
  }

  static async getReviewById(id: string): Promise<any | null> {
    const collection = await this.getCollection("review");
    const review = await collection.findOne({ _id: new ObjectId(id) });
    return review;
  }

  static async createReview(reviewData: any): Promise<any> {
    const collection = await this.getCollection("review");
    
    const newReview = {
      ...reviewData,
      date: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await collection.insertOne(newReview);
    
    return {
      _id: result.insertedId.toString(),
      ...reviewData
    };
  }

  static async getCombinedReviewsByProduct(productId: string): Promise<{ ratings: RatingInterface[]; reviews: any[] }> {
    const [ratings, reviews] = await Promise.all([
      this.getAllRatingsByProduct(productId),
      this.getAllReviewsByProduct(productId)
    ]);

    return {
      ratings,
      reviews
    };
  }

    static async getCombinedReviewsAllProduct(): Promise<{ ratings: RatingInterface[]; reviews: any[] }> {
    const [ratings, reviews] = await Promise.all([
      this.getAllRatings(),
      this.getAllReviews()
    ]);

    return {
      ratings,
      reviews
    };
  }

   static async createCombinedReviewByProduct(): Promise<{ ratings: RatingInterface[]; reviews: any[] }> {
    const [ratings, reviews] = await Promise.all([
      this.getAllRatings(),
      this.getAllReviews()
    ]);

    return {
      ratings,
      reviews
    };
  }
  // En tu ReviewService
static async createCombinedReview(
  productId: string, 
  userId: string, 
  reviewContent: string, 
  ratingValue: number
): Promise<{
  review: ReviewInterface;
  rating: RatingInterface;
}> {
  try {
    // Crear review y rating en paralelo
    const [review, rating] = await Promise.all([
      this.createReview({
        review: reviewContent,
        product_id: productId,
        user_id: userId
      }),
      this.createRating({
        product_id: productId,
        user_id: userId,
        rating: ratingValue
      })
    ]);

    console.log("✅ Review y rating creados exitosamente:");
    console.log("Review:", review);
    console.log("Rating:", rating);

    return {
      review,
      rating
    };
  } catch (error) {
    console.error("❌ Error en createCombinedReview:", error);
    throw new Error(`Failed to create combined review: ${error}`);
  }
}
}