import { ObjectId } from "mongodb";

/**
 * Represents a product in the system.
 */
export type Product = {
  _id?: ObjectId;        
  name: string;          
  description: string;   
  price: number;         
  stock: string;         
  big_picture: string;   
  small_picture?: string;
  category: string;      
  artisan_id: ObjectId;  
};
