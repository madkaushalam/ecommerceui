import ProductDetails from '@/components/productDetail';

export default function ProductPage({ params }) {


  const getProduct = async () => {
    const productId = (await params).productId;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,{method:'GET'})
      if (!res.ok) {
        return null;
      }
      const data = await res.json();
      return <ProductDetails product={data.productDetail} />;
    } catch (error) {
      console.error("Error fetching product:", error);
      return <p className="text-center text-red-500">Product not found!</p>;;
    }
  }

 return getProduct();


}