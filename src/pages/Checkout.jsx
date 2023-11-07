import React from 'react';
import {useState} from 'react'
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromCartAsync, resetCartAsync, updateItemAsync } from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form';
import { updateUserAsync } from '../features/auth/authSlice';
import { createOrderAsync } from '../features/order/orderSlice';
import { discountedPrice } from '../app/constants';

    
const CheckOut = () => {
    const [selectedAddress,setSelectedAddress] = useState(null);
    const [paymentMethod,setPaymentMethod] = useState('cash');
    const user = useSelector(state=>state.user.userInfo);
    const [open, setOpen] = useState(true)
    const items = useSelector(state=>state.cart.items);
    const currentOrder = useSelector(state=>state.order.currentOrder);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()
    // reduce() method in JavaScript is used to reduce the array to a single value and executes a provided function for each value of the array (from left to right) and the return value of the function is stored in an accumulator here accumulator is amount means as soon as first value is evaluated then you are adding accumulator value becasue it is type of += this previouse value is getting add  and accumulator is initialising as zero .
    const totalAmount = items.reduce((amount,item)=>discountedPrice(item)*item.quantity + amount , 0);
    const totalItems = items.reduce((total , item)=>item.quantity+total , 0);
    const handleQuantity =(e,item)=>{
        // here i put the + sign because value would come in string format and i want it in number so it will convert string to integer 
        dispatch(updateItemAsync({...item , quantity:+e.target.value}))
    }
    const handleRemove =(e,itemid)=>{ 
        dispatch(deleteItemFromCartAsync(itemid))
        
    }         
    const handleAddress=(e)=>{
        setSelectedAddress(user.addresses[e.target.value])
      
    }
    const handlePayment=(e)=>{
        setPaymentMethod(e.target.value)
    }
    const handleOrder=(e)=>{
        console.log("hii")
        const order = {items, totalAmount,totalItems , user,paymentMethod,
            selectedAddress , status:'pending'//othere status can be delivered,received ,they would be selected by admin 
    }
        dispatch(createOrderAsync(order));
        // hamesa jabhi bhi order ho jaye so currentOrder ko bhi udana padega warna naya order karne jaoge current order mai poooran pada hai so direct vo order-success ke page mai lejayega chekout ni karne dega but if aapne resetCart and current order ko khali yahi kiya so dekho is page se nahi vo ordersucces mai jayega and direct vo pay and order karne mai homepage mai chale jayega item.length===0 dekho neeche it means ek baar ordersuccess page dikh jaye then kar sakte hai so order succes page mai hi ye sab karlo 
        // dispatch(resetCartAsync());
    }
    return (
        <>
        {/* agar there is no elements in the carts it means cart is empty so no need to show cart it will redirect you to the hompage  */}
                {items.length === 0 && <Navigate to ='/' replace={true}></Navigate>}
                {currentOrder && <Navigate to ={`/order-success/${currentOrder.id}`}  replace={true}></Navigate>}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid  grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className="mt-5 mb-5 py-3 bg-white px-4 lg:col-span-3">
                        <form noValidate onSubmit={handleSubmit((data) => {
                            // ...user.addresses isliye so that previouse addresses ka bhi record rahe 
                            dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}));
                            // reset is used as soon as you click on add address all filled data will disappear
                            reset();
          })} >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="  text-2xl font-bold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name',{required:"name is required"})}
                                                    id="name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        
                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email',{required:"email is required"})}
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                            <input
                                                    id="phone"
                                                    {...register('phone',{required:"phone no. is required"})}
                                                    // type=tel mobil mai dialpad khol deta hai 
                                                    type="tel"
                                                    autoComplete="phone"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('street',{required:"street is required"})}
                                                    id="street"
                                                    autoComplete="street"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city',{required:"city is required"})}
                                                    id="city"
                                                    autoComplete="city"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('state',{required:"state is required"})}
                                                    id="state"
                                                    autoComplete="state"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('pinCode',{required:"pin code is required"})}
                                                    id="pinCode"
                                                    autoComplete="pinCode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button onclick={e=>reset()}  type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Address
                                    </button>
                                </div>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from existing addresses :
                                    </p>
                                    {/* Stacked Lists of the existing addresses given by the users so previously jab user ne koi item kharida hoga toh usne address add kara hi hoga toh firse na likhna pade toh uske liye   */}
                                    <ul role="list" >
                                        {user.addresses.map((address ,index) => (
                                            <>
                                                <div className='px-5 border-solid border-2  border-gray-200'>
                                                    <li key={address.index} className="  flex justify-between gap-x-6 py-5 ">
                                                        <div>
                                                            <input onChange={handleAddress}
                                                                id="cart"
                                                                name="address"
                                                                // isme jis radio mai dabayenge uski value e.target.value mai jaayegi 
                                                                value={index}
                                                                type="radio"
                                                                className="h-4 w-4 relative top-2  border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                            <div className="ml-10 relative bottom-4 hidden shrink-0 sm:flex sm:flex-col sm:items-end">

                                                                <p className="text-sm leading-6 text-gray-900">{address.name}</p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                                            </div>
                                                        </div>
                                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Phone : {address.phone}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city}</p>
                                                        </div>
                                                    </li>
                                                </div>
                                            </>

                                        ))}
                                    </ul>

                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose One :</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payments"
                                                        type="radio"
                                                        value='cash'
                                                        checked={paymentMethod==='cash'}
                                                        onChange={handlePayment}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        onChange={handlePayment}
                                                        value="card"
                                                        checked={paymentMethod==='card'}
                                                        name="payments"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card 
                                                    </label>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                    {/* ========================================Here is your Cart======================================== */}
                    <div className="lg:col-span-2">
                        <div className="mx-auto mt-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Cart</h1>
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={item.href}>{item.title}</a>
                                                            </h3>
                                                            <p className="ml-4">{discountedPrice(item)}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                                    </div>
                                                    <div className="flex  flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500  ">Qty
                                                            {/* value isliye so that utni hi value select karne ke baad dikhaye  */}
                                                            <select className='ml-2' onChange={(e) => handleQuantity(e, item)} value={item.quantity} >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select></div>

                                                        <div className="flex">
                                                            <button onClick={e => handleRemove(e, item.id)}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t lg:px-0 border-gray-200 mt-7 py-4 sm:px-6">
                                <div className="flex my-3 justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${totalAmount}</p>
                                </div>
                                <div className="flex my-3 justify-between text-base font-medium text-gray-900">
                                    <p>Total Items</p>
                                    <p>{totalItems} items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div onClick={handleOrder} className="mt-6">
                                    <NavLink
                                       
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Pay and Order
                                    </NavLink>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or
                                        <NavLink to='/'>
                                            <button
                                                type="button"
                                                className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </NavLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CheckOut;