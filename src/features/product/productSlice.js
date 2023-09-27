import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchAllProducts, { fetchAllProductsByFilter, fetchBrands, fetchCategories, fetchDetails } from './productListApi';
import { useSelector } from 'react-redux';
const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
  details:null,
};
// you should know that createAsyncThunk is generally used to call a api and usse jo bhi data aa raha hai that would be stored in the state of store by createAsyncThunk easily because it provides some action pending ,fulfilled in the extraReducers 
export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts', //ye just naam hai kaam toh aaya nahi abhi tak kuch 
  async () => {
    const response = await fetchAllProducts();
    // go to productListApi to understand  what is response.data 
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
// In Redux Toolkit's createAsyncThunk function, you cannot directly pass multiple parameters to the thunk function without using an object as the sole argument.
export const fetchAllProductsByFilterAsync = createAsyncThunk(
  'product/fetchAllProductsByFilter',
  // we are sending filter and sort inside the object because it is boundation in the redux 
  async ({ filter, sort, pagination }) => {
    // sirf thunk mai object ki jaroorat padegi then you can directly send paremeter without object as below 
    const response = await fetchAllProductsByFilter(filter, sort, pagination);
    // go to productListApi to understand  what is response.data 
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // console.log("brands"+response.data)
    return response.data;
  }
); 
 
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // console.log("categories"+response.data)
    return response.data;
  }
);
export const fetchDetailsAsync = createAsyncThunk(
  'product/fetchDetails',
  async (id) => {
    const response = await fetchDetails(id);
    // console.log("response.data:"+response.data)
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
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
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // here state means initialState has a field products so it would get data we fetched from the data because while calling api from the thunk which is just a middleware (actioncreator) support pending,fulfilled actions and with the help of that we define reducers corresponding to them now which was done manually by use like making a array of products and then usoing map to show them in the card now we are using it with the redux state and putting that api data in the redux state now with the redux we can access data from states any where , remmember this action.payload is which get returned by the fetchAllProductsAsync 
        state.products = action.payload;
      })
      .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("brands"+action.payload)
        state.brands=action.payload
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("categories"+action.payload)
        state.categories=action.payload;
      })
      .addCase(fetchDetailsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDetailsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("hi")
        // console.log("details"+action.payload)
        state.details=action.payload;
      })

  },
});


export const ProductReducer = productSlice.reducer;
// here you will learn very important thing that is when you are using 

export const selectAllProducts = (state) => state.product.products;