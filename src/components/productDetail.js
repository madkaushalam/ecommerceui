// components/ProductDetails.js
'use client';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart , updateCart} from '@/redux/cartSlice';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProductDetails({ product }) {
    const dispatch = useDispatch();
    const session = useSession();
    const router = useRouter();

    const handleAddToCart = () => {
        if (session.data) {
            dispatch(addToCart({ ...product, quantity: 1 }));
            dispatch(updateCart());
        }
        else{
            router.push('/auth/login');
        }
    };

    return (
        <div className="flex items-center p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-purple-400 m-20 shadow-purple-400">
            {/* Product Image */}
            <div className="w-[200px] h-[300px]flex justify-center">
                <Image
                    src={product.product_image}
                    alt={product.product_name}
                    width={300}
                    height={300}
                    className="w-full max-w-md rounded-lg shadow-md"
                    priority
                />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 p-6">
                <h1 className="text-3xl font-bold mb-4 text-purple-600">{product.product_name}</h1>
                <p className="text-xl  mb-2 text-purple-800">${product.product_price}</p>
                <p className="mb-4 text-purple-500">{product.product_description}</p>
                <button
                    onClick={handleAddToCart}
                    className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-all"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}