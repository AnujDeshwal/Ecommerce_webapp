import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchLoggedInUserOrdersAsync } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
const UserOrders = () => {
  const [open, setOpen] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedInUser);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user]);
  const orders = useSelector((state) => state.user.userOrders);
  console.log("this is orders" + orders);
  return (
    <>
      {orders &&
        orders.map((order) => (
          <div>
            <div className="mx-auto py-2 mt-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl mb-2 font-bold tracking-tight text-gray-900">
                Order #{order.id}
              </h1>
              <h3 className="text-xl  font-bold tracking-tight text-red-900">
                Order Status : {order.status}
              </h3>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
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
                            <p className="mt-1 text-sm text-gray-500">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex  flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500  ">
                              Qty : {item.quantity}
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
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex my-3 justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{order.totalItems} items</p>
                </div>
                <p className="mt-0.5 mb-3 text-sm text-gray-500">
                  Shipping Address :{" "}
                </p>
                <div>
                  <div className="px-5 border-solid border-2  border-gray-200">
                    <div className="  flex justify-between gap-x-6 py-5 ">
                          {order.selectedAddress ? 
                            <>
                      <div>
                        <div className="ml-10 relative bottom-4 hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                {order.selectedAddress.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {order.selectedAddress.street}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {order.selectedAddress.pinCode}
                              </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          Phone : {order.selectedAddress.phone}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAddress.city}
                        </p>
                      </div>
                          </>
                         : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default UserOrders;
