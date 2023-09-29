import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';
const LogOut = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.auth.loggedInUser)
    useEffect(()=>{
        dispatch(signOutAsync(user.id));
    } , [])
return(
         <>
         {/* if i would not put this condition of !user so you know first component gets rendered then useEffet run so it would have redirected to the login page  now jab signoutAsync call hoga and user get null then it can navigate to the sign in page */}
            {!user && <Navigate to ='/signin' replace={true}></Navigate>}
         </>
);
}
export default LogOut;