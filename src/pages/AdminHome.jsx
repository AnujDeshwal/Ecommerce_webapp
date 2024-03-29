import React from 'react';
import NavBar from '../features/navbar/NavBar';
import AdminProductList from '../features/admin/components/adminProductList';
import Footer from '../features/common/Footer';
import { useSelector } from 'react-redux';
const AdminHome = () => {
 return(
         <>
            <NavBar>
                {/* ProductList is the children of NavBar which is passed to the NavBar as a child  */}
                {/* You can pass a component as props in React by using the built-in children prop.  means here you are writing this component in between of NavBar which could be acceess by children prop  */}
                <AdminProductList></AdminProductList>
          
                </NavBar>    
                <Footer></Footer>     
         </>
);
}
export default AdminHome;