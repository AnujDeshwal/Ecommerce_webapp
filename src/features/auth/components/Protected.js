import {useSelector} from "react-redux";
import { Navigate } from "react-router-dom";

// It is basically that those user will access this children if they are logged in means if they logged in so there data would be in loggedInUser state so if it is not null means you logged in so you can access this children component other wiser you will be navigated automatically to login page 
// like home page will be seen to those user only who are logged in so when you try to acces home page i send it to this protected page and this will check whether you are logged in or not tabhi vo page dikhana hai children ko protect kar rahe hai 
const Protected = ({children}) =>{
    const user = useSelector(state=>state.auth.loggedInUserToken);
    const currentOrder = useSelector(state=>state.order.currentOrder);
    // means user agar null hai toh /
    if(!user || (children.type.name === "StripeCheckout" && !currentOrder)){
        
        // Specifying replace: true will cause the navigation to replace the current entry in the history stack instead of adding a new one.
        return <Navigate to='/signin' replace={true}></Navigate>
    }

    return children;
}
export default Protected;