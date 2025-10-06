import { ProductInterface } from "@/app/types/interfacesModels";
import { RelatedItems } from "@/app/components/relatedItems";
import Reviews from "@/app/components/reviews";
import ProductClientView from "@/app/components/ProductClientView";
import { getDb, initDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { serializeProduct } from "../page";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  await initDb();
  const db = getDb();

  const rawProduct = await db
    .collection("product")
    .findOne({ _id: new ObjectId(params.id) });

  if (!rawProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Product not found.</p>
      </div>
    );
  }

  

const product: ProductInterface = serializeProduct(rawProduct);


const relatedItemsRaw = await db
  .collection<ProductInterface>("product") 
  .find({
    category: product.category,
    _id: { $ne: new ObjectId(params.id) } as any,
  })
  .limit(4)
  .toArray();

const relatedItems: ProductInterface[] = relatedItemsRaw.map(serializeProduct);


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
      <Reviews product_id={product.product_id} />

      {/* Productos relacionados */}
      <RelatedItems
        relatedItems={relatedItems}
        currentProductId={product.product_id}
      />
    </div>
  );
}
