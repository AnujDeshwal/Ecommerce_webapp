import React from 'react';
import ProductDetails from '../features/product/components/productDetails';
import NavBar from '../features/navbar/NavBar';
const ProductDetailPage = () => {
return(
         <>
         {/* this is the concept of passing the productDetail as a children to the NavBar  */}
         <NavBar>
           <ProductDetails></ProductDetails>
           </NavBar>          
         </>
);
}
export default ProductDetailPage;