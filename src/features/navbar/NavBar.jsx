import React from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://cdn2.vectorstock.com/i/1000x1000/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg',
}
const navigation = [
    // here user:true states that it is just for user and admin:true means it is just for admin 
    { name: 'Products', link: '/', user: true },
    { name: 'Products', link:"/admin" , admin:true},
    { name: 'Orders', link:"/admin/orders" , admin:true},
]
const userNavigation = [
    { name: 'Your Profile', link: '/profile' },
    { name: 'My Orders', link: '/my-orders' },
    { name: 'Sign out', link: '/logout' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const NavBar = ({ children }) => {
    const items = useSelector(state=>state.cart.items);
    const user = useSelector(state=>state.user.userInfo);
    const alert = useAlert();
    const empty = ()=>{
        if(items.length === 0){
            alert.info("Cart is empty");
          }
    }
    // console.log(user.imageUrl)
    return (
        <>
        {/* user && pata hai apko it is because frontend mai error show na ho bhale andr gadbad hai  */}
           {user && <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <NavLink to='/'>
                                            <img
                                                className="h-8 w-8"
                                                src="/ecommerce.png"
                                                
                                                alt="Your Company"
                                            />
                                            </NavLink>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    item[user.role] ? <Link
                                                        key={item.name}
                                                        to={item.link}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>:null
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <NavLink onClick={empty} to="/cart">
                                            <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <ShoppingCartIcon className="h-6   w-6" aria-hidden="true" />
                                               { items.length>0 &&<span className="absolute inline-flex items-center rounded-md bottom-5 bg-red-50  px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                                    {items.length}
                                                </span>}
                                            </button>
                                            </NavLink>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1user.imageUrl.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-9 w-9 rounded-full" src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <NavLink
                                                                        to={item.link}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </NavLink>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    
                                    {navigation.map((item) => (
                                        item[user.role] ? <NavLink to={item.link}>
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                        </NavLink>:null
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>
                                        <NavLink to="/cart">
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                           {/* if cart mai koi item honge toh hi ye badge dikhana varna zero dikhane ka koi matlab nahi hai  */}
                                           {/* here you cannot do only items.length && because here 0 is not considered as false  */}
                                           { items.length>0 && <span className="absolute bottom-5 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                                {items.length}
                                            </span>}
                                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        </NavLink>

                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                           <NavLink to = {item.link}> <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button> </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">E-COMMERCE</h1>
                    </div>
                </header>
                <main className=" bg-gray-100">
                    {/* -------------------------------CHILDREN component-------------------------------- */}
                    <div className="mx-auto bg-gray-100 max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>}
        </>
    );
}
export default NavBar;