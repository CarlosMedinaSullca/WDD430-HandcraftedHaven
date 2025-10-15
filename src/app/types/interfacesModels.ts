export interface UserInterface {
  _id?: string;
  user_id: number;
  first_name: string;
  last_name: string;
  email?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface RatingInterface {
  _id?: string;
  product_id?: string;
  user_id?: string;
  rating: number;
}
export interface ProductInterface {
  _id?: string;
  product_id?: number | string;

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
export interface ArtisanInterface {
  _id?: string;
  Artisan_id: number;
  first_name: string;
  last_name: string;
  biography: string;
  user_id?: number;
}
export interface StoryInterface {
  story_id?: number;
  text: string;
  date: Date | string;
  pic1?: string;
  pic2?: string;
  video: string;
  Artisan_Artisan_id?: number;
}
export interface ProfileInterface {
  _id?: string;
  profile_id: number;
  created_at: Date;
  background_pic?: string;
  profile_picture?: string;
  user_id: number;
  Artisan_Artisan_id?: number;
}
export interface ReviewInterface {
  _id?: string;
  review: string;
  date: Date | string;
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
  date: Date | string;
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
  name: string;
}

export interface Artisan {
  _id: string;
  first_name: string;
  last_name: string;
  biography: string;
  email: string;
  user_id: string;
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

interface AuthState {
  user: UserInterface | null;
  profile: ProfileInterface | null;
  artisan: ArtisanInterface | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (profileData: Partial<ProfileInterface>) => void;
  updateUser: (userData: Partial<UserInterface>) => void;
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
