'use client';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function CheckoutPage() {
  const cart = useSelector(state => state.cart.cartItems);
  const totalPrice = cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {submitted ? (
        <div className="text-purple-500 text-lg">Thank you for your order!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {cart.map(item => (
              <div key={item.product_id} className="flex justify-between mt-2">
                <p>{item.product_name} x {item.quantity}</p>
                <p>${(item.product_price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between mt-4 font-bold">
              <p>Total</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700">Submit Order</button>
        </form>
      )}
    </div>
  );
}
