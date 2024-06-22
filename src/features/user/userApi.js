import { server } from "../../app/constants";

export  function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`${server}/orders/own`,{credentials:"include"} );
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
  });
}
export  function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`${server}/users/own` ,{credentials:"include"});
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
  });
}
export  function updateUser(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`${server}/users/`+update.id,{
      credentials:"include",
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{'content-type':"application/json"},
    } );
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
});
}