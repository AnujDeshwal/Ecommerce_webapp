import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import addToCart, { deleteItemFromCart, fetchItemsInCartByUserId,  updateItem } from './orderApi';
import createOrder from './orderApi';

const initialState = {
 orders:[],
  status: 'idle',
};

export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (order) => {
    console.log("anuj")
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);




export const createOrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push( action.payload);
      })
  },
});



export const orderReducer = createOrderAsync.reducer;
