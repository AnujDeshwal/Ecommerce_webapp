import React from 'react';
import NavBar from '../features/navbar/NavBar';
import UserOrders from '../features/user/components/userOrders';
const UserOrdersPage = () => {
return(
         <>
         {/* this is the concept of passing the productDetail as a children to the NavBar  */}
         <NavBar>
            <h1 className='mx-auto text-2xl'>My Orders</h1>
           <UserOrders></UserOrders>
           </NavBar> 

         </>
);
}
export default UserOrdersPage;