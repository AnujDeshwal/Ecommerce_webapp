import React from 'react';
import NavBar from '../features/navbar/NavBar';
import AdminProductDetails from '../features/admin/components/adminProductDetails';
const AdminProductDetailPage = () => {
return(
         <>
         {/* this is the concept of passing the productDetail as a children to the NavBar  */}
         <NavBar>
           <AdminProductDetails></AdminProductDetails>
           </NavBar>          
         </>
);
}
export default AdminProductDetailPage;