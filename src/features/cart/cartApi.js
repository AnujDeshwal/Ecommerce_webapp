// A mock function to mimic making an async request for data
import {server} from "../../app/constants"
export default function addToCart(item) {
  return new Promise(async (resolve) =>{
    
    const response = await fetch(`${server}/cart`, {
      credentials:"include",
      method:'POST',
      // right now we are not getting data from the server now we will send data to the server to get that stored 
      // A common use of JSON is to exchange data to/from a web server. When sending data to a web server, the data has to be a Json string. 
      body:JSON.stringify(item),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
});
} 
export  function fetchItemsInCartByUserId() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`${server}/cart` , {credentials:"include"} );
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
  });
}
// here like we change the itmes quantity so it is a update should be performed on the items in the cart 
export  function updateItem(update) {
  return new Promise(async (resolve) =>{
    // console.log("Uupdate",update)
    const response = await fetch(`${server}/cart/`+update.id,{
      credentials:"include",
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{'Content-Type':"application/json"},
    } );
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
});
}
export  function deleteItemFromCart(itemid) {
  return new Promise(async (resolve) =>{
    console.log("i was deleted")
    const response = await fetch(`${server}/cart/`+itemid,{
      credentials:"include",
      method:"DELETE",
      headers:{'content-type':"application/json"},
    } );
    const data = await response.json();
    // console.log("data is"+ data)
    // kuch response mai toh aaega nahi toh just sending the item id 
    resolve({data:{id:itemid}});
});
}
  // thunk function always expext a promise that why we do make new promise 
  export function resetCart() {
    // get all items of user's cart - and then delete each
    return new Promise(async (resolve) => {
      const response = await fetchItemsInCartByUserId();
      const items = response.data;
      // yaad rakho here we used for of loop not for in loop 
      for (let item of items) {
        await deleteItemFromCart(item.id);
      }
      resolve({status:'success'})
    });
  }
