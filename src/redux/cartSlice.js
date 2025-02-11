import { createSlice } from '@reduxjs/toolkit'
import {toast} from 'react-toastify';

const initialState = {
    cartItems: [],
  };
  

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const itemIndex = state.cartItems.findIndex(item => item.product_id === action.payload.product_id);
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].quantity += action.payload.quantity;
          toast.info('Product quantity updated');
        } else {
          state.cartItems.push({ ...action.payload, quantity: action.payload.quantity || 1 });
          toast.success('Product added to cart');
        }
      },
      removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.product_id !== action.payload);
        toast.error('Product removed from cart');
      },
      updateQuantity: (state, action) => {
        const item = state.cartItems.find(item => item.product_id === action.payload.product_id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      },
  },
})

export const { addToCart, removeFromCart, updateQuantity } = counterSlice.actions
export default counterSlice.reducer