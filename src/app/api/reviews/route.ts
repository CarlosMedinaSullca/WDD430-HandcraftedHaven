import { NextRequest, NextResponse } from 'next/server';
import { ReviewService } from '../../services/reviewsService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const getAll = searchParams.get('getAll');

    if (getAll === 'true') {
      const {reviews,ratings} = await ReviewService.getCombinedReviewsAllProduct();

      return NextResponse.json({
        reviews,
        ratings
      });
    }

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const {reviews,ratings} = await ReviewService.getCombinedReviewsByProduct(productId);

    return NextResponse.json({
      reviews,
      ratings,
      productId
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reviewData = await request.json();

    if (!reviewData.review || !reviewData.product_id) {
      return NextResponse.json({ 
        error: 'Review content and product ID are required' 
      }, { status: 400 });
    }

    const result = await ReviewService.createCombinedReview(
      reviewData.product_id,
      reviewData.user_id || "999", 
      reviewData.review,
      reviewData.rating || 5 
    );

    return NextResponse.json(result.review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}