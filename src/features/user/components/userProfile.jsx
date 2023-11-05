import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../userSlice';
import { set, useForm } from 'react-hook-form';
const UserProfile = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm()
    const user = useSelector(state => state.user.userInfo)
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const dispatch = useDispatch();
    const handleEdit = (addressUpdate, index) => {
        const newUser = { ...user, addresses: [...user.addresses] };
        // here splice works like from the given index that address would be removed and in place of that address addressUpdate will be set 
        newUser.addresses.splice(index, 1, addressUpdate);
        dispatch(updateUserAsync(newUser));
        setSelectedEditIndex(-1);

    }
    const handleRemove = (e, index) => {
        const newUser = { ...user, addresses: [...user.addresses] } // for shallow copy issue
        newUser.addresses.splice(index, 1);
        // means we removing particular address from the user details 
        dispatch(updateUserAsync(newUser));
    }
    const handleEditForm = (index) => {
        setSelectedEditIndex(index);
        // very important that jab aap edit mai click kare toh form khuk jaye uske liye setSelectedEditIndex hai and then us form mai pehle se value dikhni chahiye for that we have setValue utility in the useForm if we had used value={address.name} like so value toh field mai show kar deta but hum use change nahi kar pate 
        const address = user.addresses[index];
        setValue('name', address.name);
        setValue('email', address.email);
        setValue('phone', address.phone);
        setValue('street', address.street);
        setValue('state', address.state);
        setValue('pinCode', address.pinCode);
        setValue('city', address.city);
    }
    const handleAdd=(address)=>{
        const newUser = { ...user, addresses: [...user.addresses , address] } // for shallow copy issue
        dispatch(updateUserAsync(newUser));
        setShowAddressForm(false);
    }
    return (
        <>
            <div className="mx-auto py-2 mt-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl mb-2 font-bold tracking-tight text-gray-900">
                    Name : {user.name ? user.name : 'New User'}</h1>
                <h3 className="text-xl  font-bold tracking-tight text-red-900">
                    Email Address : {user.email}</h3>
               {user.role==="admin" && <h3 className="text-xl  font-bold tracking-tight text-red-900">
                    Role : {user.role}</h3>}

                <div className="border-t lg:px-0 border-gray-200 mt-7 py-4 sm:px-6">
                    {!showAddressForm?<button onClick={e=>{setShowAddressForm(true);setSelectedEditIndex(-1)//if koi edit vaala khula hoga toh close hojayega 
                    }}
                        type="submit"
                        className="rounded-md mb-4 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add New Address
                    </button>:null}
                    {showAddressForm? <form noValidate onSubmit={handleSubmit((data) => {
                                        // ...user.addresses isliye so that previouse addresses ka bhi record rahe 
                                        handleAdd(data)
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
                                                                {...register('name', { required: "name is required" })}
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
                                                                {...register('email', { required: "email is required" })}
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
                                                                {...register('phone', { required: "phone no. is required" })}
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
                                                                {...register('street', { required: "street is required" })}
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
                                                                {...register('city', { required: "city is required" })}
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
                                                                {...register('state', { required: "state is required" })}
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
                                                                {...register('pinCode', { required: "pin code is required" })}
                                                                id="pinCode"
                                                                autoComplete="pinCode"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                                <button onClick={e => setShowAddressForm(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Add Address
                                                </button>
                                            </div>

                                        </div>


                                    </form> : null}
                    <p className="mt-0.5  text-sm text-gray-500">Your Addresses : </p>
                    <div >
                        {/* sun agar tu esa karega lilke .map(()=>{}) so iske under tujhe return bhi toh likhna padega  */}
                        {user.addresses.map((address, index) => (
                            <>
                                <div className=" py-3 bg-white px-4 lg:col-span-3">
                                    {selectedEditIndex === index ? <form noValidate onSubmit={handleSubmit((data) => {
                                        // ...user.addresses isliye so that previouse addresses ka bhi record rahe 
                                        handleEdit(data, index)
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
                                                                {...register('name', { required: "name is required" })}
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
                                                                {...register('email', { required: "email is required" })}
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
                                                                {...register('phone', { required: "phone no. is required" })}
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
                                                                {...register('street', { required: "street is required" })}
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
                                                                {...register('city', { required: "city is required" })}
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
                                                                {...register('state', { required: "state is required" })}
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
                                                                {...register('pinCode', { required: "pin code is required" })}
                                                                id="pinCode"
                                                                autoComplete="pinCode"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                                <button onClick={e => setSelectedEditIndex(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Edit Address
                                                </button>
                                            </div>

                                        </div>


                                    </form> : null}
                                </div>
                                <div className='px-5 border-solid border-2  border-gray-200'>
                                    <div className="  flex justify-between gap-x-6 py-5 ">
                                        <div>
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
                                    </div>
                                    <div className="flex mb-2 gap-x-3">
                                        {/* when passing the value in the function so e=> karke likhna jaroori hota hai ya bolo it is a callback function , means call back function mai likhna jaroori hota ha i  */}
                                        <button onClick={e => handleEditForm(index)}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Edit
                                        </button>
                                        <button onClick={e => handleRemove(e, index)}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}

                    </div>

                </div>
            </div>
        </>
    );
}
export default UserProfile;