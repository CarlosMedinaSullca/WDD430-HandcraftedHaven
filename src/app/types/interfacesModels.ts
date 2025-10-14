
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


export interface Story {
  _id: string;
  text: string;
  date: string | { $date: string };
  picture1?: string;
  picture2?: string;
  video?: string;
  artisan_id: string;
}

export interface Profile {
  _id: string;
  created_at: string;
  background_pic: string;
  profile_picture: string;
  artisan_id: string;
}

export interface Artisan {
  _id: string;
  first_name: string;
  last_name: string;
  biography: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: string;
  description: string;
  big_picture: string;
  small_picture: string;
  category: string;
  artisan_id: string;
}

