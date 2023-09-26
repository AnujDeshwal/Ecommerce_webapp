import React from 'react';
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
  return (
    <div className="App">
      {/* Below line enable routing in your app  */}
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
