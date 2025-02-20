"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addToCart, updateCart } from "@/redux/cartSlice";

export default function ProductList({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();

  const handleClick = (product_id) => {
    router.push(`/products/${product_id}`);
  };

  const handleInputChange = (e) => {
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    if (session.data) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      dispatch(updateCart());
    }
    else {
      router.push('/auth/login');
    }
  }

  return (
    <>
      <div className="m-6">
        <input
          onChange={handleInputChange}
          className="w-full border-2 border-purple-300 rounded-md p-4 cursor-pointer hover:shadow-lg shadow-purple-300"
          placeholder="Search for products"
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-evenly mt-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.product_id}
              className="w-full max-w-[370px] bg-white border border-purple-300 rounded-lg shadow-lg shadow-purple-400 mb-14"
            >
              <div onClick={() => handleClick(product.product_id)} className="cursor-pointer w-full h-[260px] overflow-hidden border-b border-purple-300 py-3">
                <Image
                  className="rounded-t-lg w-auto h-full m-auto"
                  src={product.product_image}
                  alt={product.product_name}
                  width={200}
                  height={100}
                />
              </div>
              <div className="px-5 pb-5 space-y-5 mt-5">
                <h5 className="text-xl font-semibold tracking-tight text-purple-600">
                  {product.product_name}
                </h5>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-medium text-purple-700 ">
                    ${product.product_price}
                  </span>
                  <button onClick={() => handleAddToCart(product)} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl font-semibold">No products found</div>
        )}
      </div>
    </>
  );
}
