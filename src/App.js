import React from 'react';
import Home from './pages/Home';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/cartPage';
import CheckOut from './pages/Checkout';
import ProductDetailPage from './pages/productDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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
    element: <CartPage/>,
  },
  {
    path: "/checkout",
    element: <CheckOut/>,
  },
  {
    path: "/product-details",
    element: <ProductDetailPage/>,
  },
]);
function App() {
  return (
    <div className="App">
      {/* Below line enable routing in your app  */}
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
