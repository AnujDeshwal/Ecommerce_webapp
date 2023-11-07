import React from 'react';
import NavBar from '../features/navbar/NavBar';
import AdminOrders from '../features/admin/components/AdminOrders';
const AdminOrdersPage = () => {
return(
         <>
         {/* this is the concept of passing the productDetail as a children to the NavBar  */}
         <NavBar>
           <AdminOrders></AdminOrders>
           </NavBar>          
         </>
);
}
export default AdminOrdersPage;