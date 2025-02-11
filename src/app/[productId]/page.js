'use client';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productsData from '@/products';
import { use } from 'react';
import Image from 'next/image';

export default function ProductPage({ params }) {
  const dispatch = useDispatch();
  const { productId } = use(params);
  const product = productsData.find(p => p.product_id == productId);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={product.product_image}
          alt={product.product_name}
          width={300}
          height={300}
          className="w-full max-w-md rounded-lg shadow-md"
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
        <p className="text-xl text-gray-600 mb-2">${product.product_price}</p>
        <p className="text-gray-700 mb-4">{product.product_description}</p>
        <button
          onClick={handleAddToCart}
          className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-all"
        >
          Add to Cart
        </button>
        <ToastContainer
          position="bottom-right"
          autoClose={700}
          hideProgressBar={false}
          theme="light" />
      </div>
    </div>
  );
}