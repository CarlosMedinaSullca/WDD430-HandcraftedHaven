
export interface UserInterface{
    user_id?: number;
    first_name: string;
    last_name: string;
}
export interface RatingInterface{
    _id?: string;
    product_id?: string;
    user_id?: string;
    rating: number;
}
export interface ProductInterface {
  _id?: string;          
  product_id?: number|string;      

  name: string;
  description: string;
  price: number;
  stock: number | string;     
  big_picture?: string;
  small_picture?: string;
  category?: string;
  artisan_id?: string;      
  Artisan_Artisan_id?: number;
}
export interface ArtisanInterface{
    Artisan_id?: number;
    first_name: string;
    last_name: string;
    biography: string;
}
export interface StoryInterface{
    story_id?: number;
    text: string;
    date: Date|string;
    pic1?: string;
    pic2?: string;
    video: string;
    Artisan_Artisan_id?: number;
}
export interface ProfileInterface{
    profile_id?: number;
    created_at?: Date|string;
    background_pic?: string;
    profile_pic?: string;
    Artisan_Artisan_id?: number;
}
export interface ReviewInterface{
    _id?: string;
    review: string;
    date: Date|string;
    product_id?: number;
    user_id?: number;
}

export interface CombinedReviewResponse {
  ratings: RatingInterface[];
  reviews: ReviewInterface[];
}

export interface CreateReviewData {
  review: string;
  product_id: string;
  user_id: string;
  rating?: number; 
}
export interface CombinedReviewInterface {
  _id?: string;
  review: string;
  date: Date|string;
  product_id?: string;
  user_id?: string;
  rating: number; // ✅ Agregar rating aquí
}

export interface CreateRatingData {
  product_id: string;
  user_id: string;
  rating: number;
}