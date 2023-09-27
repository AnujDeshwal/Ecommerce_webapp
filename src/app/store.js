import { configureStore } from '@reduxjs/toolkit';
import { ProductReducer } from '../features/product/productSlice';
import { authReducer } from '../features/auth/authSlice';
import { addToCartReducer } from '../features/cart/cartSlice';
export const store = configureStore({
  reducer: {
      product:ProductReducer,
      auth:authReducer,
      cart:addToCartReducer
  },
});
