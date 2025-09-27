export interface UserInterface{
    user_id?: number;
    first_name: string;
    last_name: string;
}
export interface RatingInterface{
    product_product_id?: number;
    user_user_id?: number;
    rating: number;

}
export interface ProductInterface{
    product_id?: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    big_picture?: string;
    small_picture?: string;
    category?: string;
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
    review_id?: number;
    content: string;
    date: Date|string;
    product_product_id?: number;
    user_user_id?: number;
}