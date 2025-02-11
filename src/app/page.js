"use client";
import productsData from "@/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {


  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);
  const router = useRouter();

  const handleClick = (product_id) => {
    router.push(`/${product_id}`);
  };

  const handleInputChange = (e) => {
    const filteredProducts = productsData.filter((product) => {
      return product.product_name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setProducts(filteredProducts);
  }


  return (
    <>
      <div className="m-6">
        <input onChange={handleInputChange} className="w-full border-2 border-gray-300 rounded-md p-4 cursor-pointer hover:shadow-lg" placeholder="Search for products">
        </input>
      </div>
      <div className="flex flex-wrap gap-5 items-center justify-center mt-10">
        {products.length ? products.map((product) => (
          <div key={product.product_id} className="shadow-lg rounded-md p-4 cursor-pointer hover:shadow-2xl" onClick={() => handleClick(product.product_id)}>
            <div className="w-80 h-64 relative border-2 border-gray-300 rounded-md">
              <Image src={product.product_image} alt={product.product_name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" priority ></Image>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{product.product_name}</h2>
                <p className="text-gray-600">${product.product_price}</p>
              </div>
            </div>
          </div>
        )) :
          <div className="text-center text-2xl font-semibold">No products found</div>
        }
      </div>
    </>
  );
}
