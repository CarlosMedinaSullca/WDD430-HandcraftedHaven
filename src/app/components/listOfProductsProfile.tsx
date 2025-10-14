
import Image from "next/image";
import { getProducts } from "@/lib/product-actions";
import { Product, Artisan} from "@/app/types/interfacesModels";



interface listOfProductsProps {
  artisan?: Artisan | null;
}

// Helper function to handle MongoDB Decimal128 type
function parsePrice(price: number | { $numberDecimal: string }): number {
  if (typeof price === 'number') {
    return price;
  }
  if (price && typeof price === 'object' && '$numberDecimal' in price) {
    return parseFloat(price.$numberDecimal);
  }
  return 0;
}

export default async function listOfProducts({artisan } : listOfProductsProps) {
  const artisan_id = artisan?._id;
  const products = await getProducts();

  const productsByArtisan = products.filter(product => product.artisan_id === artisan_id);

  

      return (
    <div className="border rounded-lg shadow-inner p-4 overflow-y-scroll no-scrollbar bg-white h-[40rem]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        My Products ({productsByArtisan.length})
      </h2>
      
      {/* Make sure the ul has a proper parent and content structure */}
      {productsByArtisan.length > 0 ? (
        <ul className="grid gap-6">
          {productsByArtisan.map((product) => (
            <li
              key={product._id}
              className="border rounded-lg p-3 shadow hover:shadow-lg hover:scale-[1.02] transition"
            >
              <p className="text-gray-900 font-medium">{product.name}</p>
              <p className="text-gray-600">${parsePrice(product.price).toFixed(2)}</p>
              {product.description && (
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
              )}
              <Image
                src={product.small_picture || "https://cdn.pixabay.com/photo/2020/03/13/04/06/handmade-4926870_960_720.jpg"}
                width={400}
                height={300}
                className="rounded-lg mt-2 w-full h-48 object-cover"
                alt={product.name}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No products found for this artisan
        </div>
      )}
    </div>
  );
}