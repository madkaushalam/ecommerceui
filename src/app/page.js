import { getAllProducts } from "@/lib/api/getAllProducts";
import ProductList from "@/components/ProductList";

export default async function Home() {
  const { products } = await getAllProducts();

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
