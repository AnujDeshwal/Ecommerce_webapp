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
import { checkAuthAsync } from "./features/auth/authSlice";
import StripeCheckout from "./pages/StripeCheckout";
import ResetPasswordPage from "./pages/ResetPasswordPage";
 

// this options are for alert that whenever they will be shown so for how long they should be shown and their position 
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: "/",
    // here basically protectd isliye kar rahe like user need to first login or register then only it can visit the website but if user just type "/" in the url after website means want to go to home page so if there would be not protection it will easily go to home without login or register 
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
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
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
    path: "/reset-password",
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    // it means astrick aapka saare path se match kar jaat hai sabse neeche hai so that by koi listed path mila toh redirect ho jayega varna * toh hai hi
    path: "*",
    element: <Page404></Page404>,
  },
]);
function App() {
  const user = useSelector((state) => state.auth.loggedInUserToken);
  const userChecked=useSelector(state=>state.auth.userChecked);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuthAsync());
  },[])
  // console.log("cartItem"+useSelector(state=>state.cart.items));
  useEffect(() => {
    // without user you cannot display its cart items 
    if (user) {
      // we can get the user.id and user info by req.user in backend so do not need to give in frontend vese bhi here user mai koi user ki info nahi hai vo token hai jwt ka  
      dispatch(fetchItemsInCartByUserIdAsync());
      // ek toh auth ka user hai that is just for id right now varna detail info hum userinfo mai rakhenge of in userSlice
      dispatch(fetchLoggedInUserAsync());
      // we are fetching the data and showing the no. of items above the shopping cart icon and also will display that items in the cart section
    }
    // simple si baat hai useEffect is not gonna work until you give something whose state is changing so as soon as state got change it is activated so i put user ,only putting dispatch is not gonna work we put dispatch just for overcoming the warning otherwise no use
  }, [dispatch, user]);

  return (
    <div className="App">
      {/* Below line enable routing in your app  */}
      {/* below if the provider it is for Alert template which will provide alert template to the app.js so that we will use it efficiently  */}
      {/* this is used for stylish alert not traditional  */}

      {/* basically problem was like when we were routing like url mai /orders kar rahe the toh toh server ko orders ki request jaati but in each page like orders also we have planted a check jo check karega that user available hai bhi tabhi toh orderes dikhayega uske varna home page mai redirect kardo so jabhi bhi aap request maarte ho toh user tab tak aaya hi nahi hai time lagta hai user ke aane mai kuki aap upar ek useEffect dekhoge jisme checkAuthAsync dispatch ho raha hai so vo user laa raha hai and it takes time to get the user from the backend tab tak react dekhra user toh hai hi nahi toh vo hume home mai redirect kar de raha tha toh humne ek status variable userChecked define kara in the authSlice where we will check jab user aa jayega tabhi saari routings kaam karegi 
      here dekho i always used to think that if i refresh the page so user wagera gayab ho jata hai and  */}
      {/* it is for every page refresh that after refresh vo page mai hi redirect ho kahi or na chale jaye  */}
      {/* checkauth user ko vapas laa raha hai because after refresh redux store empty ho jata hai poora ka poora bhale hi koi sa bhi redux store ho tabhi user bhi lost ho jata hai  */}
      {/* basically neeche jo lagaya hai na agar userChecked hai tabhi saari routing chalegi  */}
      {userChecked &&  <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>}
    </div>
  );
}

export default App;
