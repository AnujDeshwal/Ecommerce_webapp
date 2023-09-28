import React from 'react';
import {useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const Order = () => {
    const items = useSelector(state=>state.cart.items);
    const dispatch = useDispatch();
    const handleRemove =(e,itemid)=>{ 
        dispatch(deleteItemFromCartAsync(itemid))
    }
    return (
        <>
       
        </>
    );
}
export default Order