import React from 'react';
import NavBar from '../features/navbar/NavBar';
import UserProfile from '../features/user/components/userProfile';
const UserProfilePage = () => {
return(
         <>
         {/* this is the concept of passing the productDetail as a children to the NavBar  */}
         <NavBar>
         <h1 className='mx-auto text-2xl'>My Profile</h1>
           <UserProfile></UserProfile>
           </NavBar>          
         </>
);
}
export default UserProfilePage;