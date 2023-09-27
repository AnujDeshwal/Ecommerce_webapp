import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromCartAsync, updateItemAsync } from './cartSlice';


const Cart = () => {
    const [open, setOpen] = useState(true)
    const items = useSelector(state=>state.cart.items);
    const dispatch = useDispatch();
    // reduce() method in JavaScript is used to reduce the array to a single value and executes a provided function for each value of the array (from left to right) and the return value of the function is stored in an accumulator here accumulator is amount means as soon as first value is evaluated then you are adding accumulator value becasue it is type of += this previouse value is getting add  and accumulator is initialising as zero .
    const totalAmount = items.reduce((amount,item)=>item.price*item.quantity + amount , 0);
    const totalItems = items.reduce((total , item)=>item.quantity+total , 0);
    const handleQuantity =(e,item)=>{
        // here i put the + sign because value would come in string format and i want it in number so it will convert string to integer 
        dispatch(updateItemAsync({...item , quantity:+e.target.value}))
    }
    const handleRemove =(e,itemid)=>{ 
        dispatch(deleteItemFromCartAsync(itemid))
    }
    return (
        <>
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
                                                <p className="ml-4">${item.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                        </div>
                                        <div className="flex  flex-1 items-end justify-between text-sm">
                                            <div className="text-gray-500  ">Qty 
                                            {/* value isliye so that utni hi value select karne ke baad dikhaye  */}
                                            <select className='ml-2' onChange={(e)=>handleQuantity(e,item)} value={item.quantity} >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                </select></div>

                                            <div className="flex">
                                                <button onClick={e=>handleRemove(e,item.id)}
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
                    <div className="mt-6">
                        <NavLink
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
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
        </>
    );
}
export default Cart;