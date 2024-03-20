import React from "react";
import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCartAsync, updateItemAsync } from "./cartSlice";
import { discountedPrice } from "../../app/constants";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";

const Cart = () => {
  const [open, setOpen] = useState(true);
  const cartLoaded = useSelector(state=>state.cart.cartLoaded);
  const [openModal , setOpenModal] = useState(null);
  const items = useSelector((state) => state.cart.items);
  const status = useSelector(state=>state.cart.status);
  const dispatch = useDispatch();
  // reduce() method in JavaScript is used to reduce the array to a single value and executes a provided function for each value of the array (from left to right) and the return value of the function is stored in an accumulator here accumulator is amount means as soon as first value is evaluated then you are adding accumulator value becasue it is type of += this previouse value is getting add  and accumulator is initialising as zero .
  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleQuantity = (e, item) => {
    // here i put the + sign because value would come in string format and i want it in number so it will convert string to integer
    dispatch(updateItemAsync({ id:item.id, quantity: +e.target.value }));
  };
  const handleRemove = (e, itemid) => {
    console.log("this is itemid"+itemid)
    dispatch(deleteItemFromCartAsync(itemid));
  };
  return (
    <>
      {/* agar there is no elements in the carts it means cart is empty so no need to show cart it will redirect you to the hompage  */}
       {/* cartLoaded is like ki cart mai info backend mai aayegi so it takes time till then react should wait like here we have put the condition like cartLoade true hona chahiye till ye navigate vaali cheej chalegi means cart mai jitne item aane the vo aa gaye hai and if now length is zero then home mai jao varna nahi  */}
      {/* cartloaded is like ki refresh kara and items gayab us wakt toh items.length === 0 true hi ho jayega toh kuki null ho jayega then vo navigate kar jayega home page we do not need this home page mai tab hi jaaye if cart has no items in it in reality  */}
      {items.length === 0 && cartLoaded && <Navigate to="/" replace={true}></Navigate>}
      {/* vese bhi in refresh app.js load to hota hi hai to vaha pe cart items load ho rahe hai toh is page mai refresh karne mai error nahi aayenge tab tak app js cart mai item fetch kar raha hai  */}
      <div className="mx-auto mt-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="mt-8">
          <div className="flow-root">
            {status === "loading" ? (
              <Grid
                height="80"
                width="80"
                color="#4F46E5"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : null}
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                    </div>
                    <div className="flex  flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500  ">
                        Qty
                        {/* value isliye so that utni hi value select karne ke baad dikhaye  */}
                        <select
                          className="ml-2"
                          onChange={(e) => handleQuantity(e, item)}
                          value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                      <Modal title={`Delete ${item.product.title}`} message="Are you sure you want to delete this cart item" dangerOption="delete" cancelOption="cancel" dangerAction={(e) => {handleRemove(e, item.id)}} showModal={openModal===item.id} setOpenModal={setOpenModal}></Modal>
                        <button
                          onClick={e=>setOpenModal(item.id)}
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
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
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
              <NavLink to="/">
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
};
export default Cart;
