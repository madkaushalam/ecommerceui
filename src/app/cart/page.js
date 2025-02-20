'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, updateCart, removeFromCart, updateQuantity } from '@/redux/cartSlice';
import { useRouter } from 'next/navigation';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function CartPage() {


  const cart = useSelector(state => state.cart.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const router = useRouter();
  const totalPrice = cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0);


  const handleQuantityChange = (product_id, change) => {
    const item = cart.find(i => i.product_id === product_id);
    const newQuantity = item.quantity + change;

    if (newQuantity > 0) {
      dispatch(updateQuantity({ product_id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(product_id));
    }
    dispatch(updateCart());
  };

  const handleCheckout = () => {
    if(cart.length!=0)
    router.push('/checkout');
  else
  {
    toast.info("Cart is Empty")
  }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto m-10 border border-purple-400 rounded-lg shadow-lg shadow-purple-400">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">My Cart</h1>
      {cart.length > 0 ? (
        cart.map(item => (
          <div key={item.product_id} className="flex items-center justify-between mb-4 p-4 border rounded-md shadow-md shadow-purple-200">
            <div className='flex items-center gap-4'>
            <div className="cursor-pointer w-[100px] h-[100px] overflow-hidden">
              <Image
              src={item.product_image}
              alt={item.product_name}
              width={300}
              height={300}
              className="rounded-t-lg w-auto h-full m-auto"
             />
              </div>  
            <div className="text-lg font-medium text-gray-900">{item.product_name}</div>
            </div>
            <div className='flex gap-6'>
              <div className="flex items-center gap-1">
                <button onClick={() => handleQuantityChange(item.product_id, -1)} className="bg-purple-200 p-2 rounded-sm hover:bg-purple-300">
                  <FaMinus className="" />
                </button>
                <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.product_id, 1)} className="bg-purple-200 p-2 rounded-sm hover:bg-purple-300">
                  <FaPlus className="text-gray-900" />
                </button>
              </div>
              <button onClick={() => {
                dispatch(removeFromCart(item.product_id));
                dispatch(updateCart());
              }} className="bg-red-500 text-white p-2 rounded-sm hover:bg-red-700">
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-center text-gray-900">Your cart is empty.</p>
      )}
      <h2 className="text-xl font-semibold mt-6 text-gray-900">Total: ${totalPrice.toFixed(2)}</h2>
      <button onClick={handleCheckout} className="bg-purple-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-purple-700 w-full">Checkout</button>
    </div>
  );
}