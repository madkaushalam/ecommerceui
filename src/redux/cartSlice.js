import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import axios from 'axios';


const initialState = {
    cartItems: [],
    status: 'idle ', // 'idle' , 'loading', 'succeeded' or 'failed'
    error: null
};

export const fetchCartItems = createAsyncThunk('/cart/fetchCartItems', async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`);
        console.log(res.data.cartItems);
        return res.data.cartItems;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const updateCart = createAsyncThunk('cart/updateCart', async (_, { getState, rejectWithValue }) => {
    try {
        const cartItems = getState().cart.cartItems;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, { cartItems });
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.product_id === action.payload.product_id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantity += action.payload.quantity;
                console.log(state.cartItems);
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
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state, action) => {
            state.status = 'loading';
        })
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.cartItems = action.payload;
        });
        builder.addCase(fetchCartItems.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export const { addToCart, removeFromCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;