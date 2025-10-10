import { ProductInterface } from "@/app/types/interfacesModels";
import { RelatedItems } from "@/app/components/relatedItems";
import Reviews from "@/app/components/reviews";
import ProductClientView from "@/app/components/ProductClientView";
import { getDb, initDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { serializeProduct } from "../../utils/serializers";
import { ProductService } from "../../services/productsService";


export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
const { id } = await params;
const product: ProductInterface = await ProductService.getProductById(id) as unknown as ProductInterface;
if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Product not found.</p>
      </div>
    );
  }

const relatedItems: ProductInterface[] = await ProductService.getRelatedProducts(
    product.category!,
    id,
    4
  );



  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>Home</span> &gt; <span>{product.category}</span> &gt;{" "}
        <span>{product.name}</span>
      </div>

      {/* Vista interactiva */}
      <ProductClientView product={product} />

      {/* Reviews */}
      <Reviews product_id={product._id} />

      {/* Productos relacionados */}
      <RelatedItems
        relatedItems={relatedItems}
        currentProductId={product._id ? product._id.toString() : ""}
      />
    </div>
  );
}
