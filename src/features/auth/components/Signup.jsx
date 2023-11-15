import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';
// In this we will are using react-hook-form package it needs to be installed it makes fetching data from form and validation of form easy  , previously we used to do like taking values from onChange and set the value onSumbiting but here direct there is register function which directly create state for each input elements just pass their name inside register and also it take required field which specify whether this field is required or not you can do like {required:true} and if you want to show some message so do like {required:"password is required"} basically we are removing the html basica validation method like required because in this time it will depend on browser what message they show in required but if we want to customise we can do it easily when you submit without complete the required field so that message which we give inside the required field come as message in the error varaible automatically you can fetch that message from the error variable of formState ,Autocomplete allows the browser to predict the value. When a user starts to type in a field, the browser should display options to fill in the field, based on earlier typed values , if there would be any error message so it will not let you submit it 
import { useForm, SubmitHandler } from "react-hook-form"
import { createUserAsync } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch();
  const user = useSelector(state=>state.auth.loggedInUser)
  console.log("this is user:"+user)
  console.log(errors)
  return (
    <>
    {user&& <Navigate to='/' replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/ecommerce.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* all data fetched from react-hook-form is in the call back functio of handleSumbit see below  */}
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
            // basically here confirm password is also stroed in this data but we do not want it thats why we did below thing without sending directly the data 
            console.log(data)  
            // while doing checkout we will add adresses in it 
            dispatch(createUserAsync({email:data.email , password:data.password , addresses:[],role:'user'}))
          })}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                   // it is a regex pattern used to validate password can get one from regex website  ,
                  {...register("email", { required: "email is required", pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "email is not valid " } })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* when you start to fill the form so at that time errors all field is empty so errors.email is undefined so it will give error if you do not resolve it with && operator it means if errors.email exist tabhi aage mai jayega  */}
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
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
              </div>
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
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
              </div>
              {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <NavLink to='/signin' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
export default Signup;