import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { resetPasswordAsync, resetPasswordRequestAsync } from "../authSlice";

const ResetPassword = () => {
  // very important now this token and email will be got to you only if you will come from the email link because while preparing the email link we added the token and email to that link but if you will come from the /auth/reset-password so authentication will be failed 
  // this below thing is basically we are fetching the token and email from the url which was present in the email link 
  const dispatch = useDispatch();
  const mailSent = useSelector((state) => state.auth.mailSent);
  const status = useSelector(state => state.auth.status);
  const error = useSelector(state => state.auth.error);
  const passwordResetStatus = useSelector(state=>state.auth.passwordReset);
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');
  // basically we needed email so that we will update the corresponding user from this email  
  const email = query.get('email');
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {/* Specifying replace: true will cause the navigation to replace the current entry in the history stack instead of adding a new one. */}
      {(email && token)?<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/ecommerce.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter new password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(resetPasswordAsync({email,token,password:data.password}));
            })}
          >
           <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  // it is a regex pattern used to validate password can get one from regex website  , it validate to password kya kya validate karta hai see the message 
                  {...register("password", { required: "password is required" , pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, message: `- at least 8 characters\n
                  - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                  - Can contain special characters` } })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block relative top-6 text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-8">
                <input
                  id="confirm-password"
                  // in the vaildate function you van make you own validator , see if pehla value=== vaala true hoga so it will not go forward becasue or operator need only one true to be true but if it get false so then it will go forward and return the message 
                  {...register("confirmPassword", { required: "confirm password is required" , validate:(value,formValues)=>value === formValues.password || 'password not matching '})}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
              { passwordResetStatus && <p className='text-green-500'>Password Reset Successfully</p>}
              { error && <p className='text-red-500'>{error}</p>}
              { status == 'loading' && <CircularProgress color="success" style={{marginTop:"10px"}} />}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Reset Password
                
              </button>
              
                
            
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{" "}
            {/* Here in the react app you should use NavLink instead of anchor tag  */}
            <NavLink
              to="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>:<p>Incorrect Link</p>}
    </>
  );
};
export default ResetPassword;
