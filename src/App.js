import React, { useEffect } from 'react';
import Home from './pages/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/cartPage';
import CheckOut from './pages/Checkout';
import ProductDetailPage from './pages/productDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsInCartByUserIdAsync } from './features/cart/cartSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
  },
  {
    path: "/signin",
    element: (<LoginPage/>),
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage/></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><CheckOut/></Protected>,
  },
  {
    path: "/product-details/:id",
    element:<Protected><ProductDetailPage/></Protected> ,
  },
]);
function App() {
  const user = useSelector(state=>state.auth.loggedInUser);
  const dispatch = useDispatch();
  // console.log("cartItem"+useSelector(state=>state.cart.items));
  useEffect(()=>{
    // without user you cannot display its cart items 
    if(user){
      console.log("hello")
      dispatch(fetchItemsInCartByUserIdAsync(user.id));
      // we are fetching the data and showing the no. of items above the shopping cart icon and also will display that items in the cart section 
    }
    // simple si baat hai useEffect is not gonna work until you give something whose state is changing so as soon as state got change it is activated so i put user ,only putting dispatch is not gonna work we put dispatch just for overcoming the warning otherwise no use 
  } , [dispatch ,user])
  
  return (
    <div className="App">
      {/* Below line enable routing in your app  */}
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
