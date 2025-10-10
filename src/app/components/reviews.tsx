'use client';
import React, { useState, useEffect } from "react";
import { ReviewInterface, CreateReviewData, CombinedReviewInterface, RatingInterface } from "../types/interfacesModels";

interface ReviewsProps {
  product_id: number|string|undefined;
}

export default function Reviews({ product_id }: ReviewsProps) {
  const [reviewText, setReviewText] = useState<string>("");
  const [reviews, setReviews] = useState<CombinedReviewInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [delay, setDelay] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    setTimeout(() => {
      setDelay(true);
      fetchReviews();
    }, 1000); 
  }, [product_id]);

  const fetchReviews = async () => {
  console.log("product_id in fetchReviews:", product_id);
  if (!product_id) return;
  
  setLoading(true);
  
  try {
    const response = await fetch(`/api/reviews?productId=${product_id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    
    const data = await response.json();
    
    console.log("=== ESTRUCTURA DE DATOS RECIBIDOS ===");
    console.log("Product ID:", product_id);
    console.log("API Response:", data);
    
    if (data.reviews && data.reviews.length > 0) {
      console.log("Reviews encontradas:", data.reviews.length);
      
      const productReviews: CombinedReviewInterface[] = data.reviews
        .filter((review: ReviewInterface) => 
          review.product_id?.toString() === product_id.toString()
        )
        .map((review: ReviewInterface) => {
          const userRating = data.ratings?.find((rating: RatingInterface) => 
            rating.product_id === review.product_id && 
            rating.user_id === review.user_id
          );
          
          return {
            ...review,
            rating: userRating?.rating || 5 // Valor por defecto si no encuentra rating
          };
        });
      
      console.log("Reviews combinadas:", productReviews);
      setReviews(productReviews);
    } else {
      console.log("No hay reviews para este producto");
      setReviews([]);
    }
    
  } catch (error) {
    console.error("Error fetching reviews:", error);
    setReviews([]);
  } finally {
    setLoading(false);
  }
};

  const handleSubmitReview = async () => {
    if (!reviewText.trim() || !product_id) return;

    try {
      const reviewData: CreateReviewData = {
        review: reviewText,
        product_id: product_id.toString(),
        user_id: "999", 
        rating: rating 
      };

      console.log("sending new review:", reviewData);

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }

      const newReview = await response.json();
      console.log("Review creada:", newReview);

      setReviewText("");
      setRating(5);
      alert("Review submitted successfully!");

      fetchReviews();
      
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    }
  };
  const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
  return (
    <div className="flex items-center space-x-1 mb-4">
      <span className="text-sm text-gray-700 mr-2">Your Rating:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl focus:outline-none ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400 transition-colors`}
          onClick={() => setRating(star)}
        >
          ★
        </button>
      ))}
      <span className="text-sm text-gray-600 ml-2">({rating}/5)</span>
    </div>
  );
};
  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">
        Customer Reviews
      </h2>

      {/* Leave a Review */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h3 className="text-lg font-bold text-teal-700 mb-4">
          Leave a Review
        </h3>
        <StarRating rating={rating} setRating={setRating} />
        <textarea
          className="w-full border rounded p-3 text-black min-h-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Share your experience with this product..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 rounded bg-teal-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-teal-800 transition-colors"
            onClick={handleSubmitReview}
            disabled={!reviewText.trim()}
          >
            Submit Review
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          // Skeleton loader
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-sm">
                <div className="h-5 bg-gray-300 w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 w-full mb-2"></div>
                <div className="h-2 bg-gray-300 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-teal-700 mb-4">
              Other users have shared their opinions:
            </h3>
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4"
              >
                <div className="flex text-yellow-400 mb-2">
                  {"★".repeat(review.rating)}
                </div>
                <p className="text-sm text-gray-700">{review.review}</p>
                <p className="text-xs text-gray-500 mt-2">
                  <em>
                    Reviewed on {new Date(review.date).toLocaleDateString()}
                  </em>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg mb-2">
              No reviews yet
            </p>
            <p className="text-gray-400 text-sm">
              Be the first to share your experience with this product!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}