import React, { useEffect } from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/cartPage";
import CheckOut from "./pages/Checkout";
import ProductDetailPage from "./pages/productDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsInCartByUserIdAsync } from "./features/cart/cartSlice";
import Page404 from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/userProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import LogOut from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProetectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
 

// this options are for alert that whenever they will be shown so for how long they should be shown and their position 
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/signin",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckOut />
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/admin/product-details/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    // it means astrick aapka saare path se match kar jaat hai sabse neeche hai so that by koi listed path mila toh redirect ho jayega varna * toh hai hi
    path: "*",
    element: <Page404></Page404>,
  },
]);
function App() {
  const user = useSelector((state) => state.auth.loggedInUser);
  const dispatch = useDispatch();
  // console.log("cartItem"+useSelector(state=>state.cart.items));
  useEffect(() => {
    // without user you cannot display its cart items
    if (user) {
      dispatch(fetchItemsInCartByUserIdAsync(user.id));
      // ek toh auth ka user hai that is just for id right now varna detail info hum userinfo mai rakhenge of in userSlice
      dispatch(fetchLoggedInUserAsync(user.id));
      // we are fetching the data and showing the no. of items above the shopping cart icon and also will display that items in the cart section
    }
    // simple si baat hai useEffect is not gonna work until you give something whose state is changing so as soon as state got change it is activated so i put user ,only putting dispatch is not gonna work we put dispatch just for overcoming the warning otherwise no use
  }, [dispatch, user]);

  return (
    <div className="App">
      {/* Below line enable routing in your app  */}
      {/* below if the provider it is for Alert template which will provide alert template to the app.js so that we will use it efficiently  */}
      {/* this is used for stylish alert not traditional  */}
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
