import {useSelector} from "react-redux";
import { Navigate } from "react-router-dom";

// It is basically that those user will access this children if they are logged in means if they logged in so there data would be in loggedInUser state so if it is not null means you logged in so you can access this children component other wiser you will be navigated automatically to login page 
// like home page will be seen to those user only who are logged in so when you try to acces home page i send it to this protected page and this will check whether you are logged in or not tabhi vo page dikhana hai children ko protect kar rahe hai 
const ProtectedAdmin = ({children}) =>{
    const user = useSelector(state=>state.auth.loggedInUser);
    // means user agar null hai toh /
    if(!user){
        // Specifying replace: true will cause the navigation to replace the current entry in the history stack instead of adding a new one.
        return <Navigate to='/signin' replace={true}></Navigate>
    }
    if(user && user.role!=='admin'){
        return <Navigate to='/' replace={true}></Navigate>
    }
    return children;
}
export default ProtectedAdmin;