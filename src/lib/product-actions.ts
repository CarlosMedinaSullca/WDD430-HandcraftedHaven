interface Product {
    _id: string;
    name: string;
    price: number;
    stock: string;
    description: string;
    big_picture: string;
    small_picture: string;
    category: string;
    artisan_id: string;
}

export async function getProducts(): Promise<Product[]> {
    try {
        const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXTAUTH_URL || 'https://wdd-430-handcrafted-haven-kappa.vercel.app/'
      : 'http://localhost:3000';

      const res = await fetch(`${baseUrl}/api/products`, {
        method: 'GET',
        cache: 'no-store' // Ensure fresh data each time
      });

      if (!res.ok) {
        console.log(`Failed to fetch product: ${res.status}`);
        return [];
      }

      return await res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}