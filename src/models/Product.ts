import { ObjectId } from "mongodb";

/**
 * Represents a product in the system.
 */
export type Product = {
  _id?: ObjectId;        
  id?: string;           
  name: string;          
  description: string;   
  price: number;         
  imageUrl: string;      
  sellerId: string;     
};
