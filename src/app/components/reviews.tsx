'use client';
import React, { useState, useEffect } from "react";
import { ReviewInterface } from "../types/interfacesModels";

// Definir interface para recibir el product_id
interface ReviewsProps {
  product_id: number|string|undefined;
}

export default function Reviews({ product_id }: ReviewsProps) {
  const [reviewText, setReviewText] = useState<string>("");
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [delay, setDelay] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setDelay(true);
      fetchReviews();
    }, 1000); 
  }, [product_id]);

  const fetchReviews = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockReviews = [
        {
          review_id: 1,
          content: "I loved the variety of colors. Perfect for beginners and experts.",
          date: "2025-09-24",
          product_product_id: typeof product_id === "number" ? product_id : (typeof product_id === "string" ? Number(product_id) : undefined),
          user_user_id: 201,
        },
        {
          review_id: 2,
          content: "The threads are strong and of good quality. I'll buy again.",
          date: "2025-09-22",
          product_product_id: typeof product_id === "number" ? product_id : (typeof product_id === "string" ? Number(product_id) : undefined),
          user_user_id: 202,
        },
        {
          review_id: 3,
          content: "Beautiful craftsmanship! The bracelet is even prettier in person.",
          date: "2025-09-20",
          product_product_id: typeof product_id === "number" ? product_id : (typeof product_id === "string" ? Number(product_id) : undefined),
          user_user_id: 203,
        },
      ];
      setReviews(mockReviews);
      setLoading(false); 
    }, 2000); 
  };

  const handleSubmitReview = () => {
    if (reviewText.trim()) {
      const newReview: ReviewInterface = {
        review_id: Math.floor(Math.random() * 10000),
        content: reviewText,
        date: new Date().toISOString().split("T")[0],
        product_product_id: typeof product_id === "number" ? product_id : (typeof product_id === "string" ? Number(product_id) : undefined),
        user_user_id: 999,
      };

      console.log("New review submitted:", newReview);
      setReviewText("");
      alert("Review submitted successfully!");
    }
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

        <textarea
          className="w-full border rounded p-3 text-black min-h-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Write your review..."
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

      <div>
        <h3 className="text-lg font-semibold text-teal-700 mb-4">
          Other users have shared their opinions:
        </h3>

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
          ) : (
            reviews
              .filter((review) => review.product_product_id === product_id)
              .map((review) => (
                <div
                  key={review.review_id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex text-yellow-400 mb-2">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-sm text-gray-700">{review.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    <em>
                      Reviewed on {new Date(review.date).toLocaleDateString()}
                    </em>
                  </p>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
