'use client';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/redux/cartSlice';
import { useRouter } from 'next/navigation';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const cart = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
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
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length > 0 ? (
        cart.map(item => (
          <div key={item.product_id} className="flex items-center justify-between mb-4 p-4 border rounded-md shadow-md">
            <p className="text-lg font-medium">{item.product_name}</p>
            <div className='flex gap-4'>
            
            <div className="flex items-center gap-2">
              <button onClick={() => handleQuantityChange(item.product_id, -1)} className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                <FaMinus className="text-gray-700" />
              </button>
              <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.product_id, 1)} className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                <FaPlus className="text-gray-700" />
              </button>
            </div>
            <button onClick={() => dispatch(removeFromCart(item.product_id))} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700">
              <FaTrash />
            </button>
            </div>

          </div>
        ))
      ) : (
        <p className="text-lg text-center text-gray-500">Your cart is empty.</p>
      )}
      <h2 className="text-xl font-semibold mt-4">Total: ${totalPrice.toFixed(2)}</h2>
      <button onClick={handleCheckout} className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-700 w-full">Checkout</button>
    </div>
  );
}
