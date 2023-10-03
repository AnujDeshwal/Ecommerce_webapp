import React from 'react';
import { AdminProductForm } from '../features/admin/components/AdminProductForm';
import NavBar from '../features/navbar/NavBar';
const AdminProductFormPage = () => {
return(
         <>
             <NavBar>
                <AdminProductForm></AdminProductForm>
                </NavBar>        
         </>
);
}
export default AdminProductFormPage;