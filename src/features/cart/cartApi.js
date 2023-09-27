// A mock function to mimic making an async request for data
export default function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart' , {
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
export  function fetchItemsInCartByUserId(userid) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart?user='+userid );
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
  });
}
// here like we change the itmes quantity so it is a update should be performed on the items in the cart 
export  function updateItem(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{'content-type':"application/json"},
    } );
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
});
}
export  function deleteItemFromCart(itemid) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+itemid,{
      method:"DELETE",
      headers:{'content-type':"application/json"},
    } );
    const data = await response.json();
    // console.log("data is"+ data)
    // kuch response mai toh aaega nahi toh just sending the item id 
    resolve({data:{id:itemid}});
});
}