
export default function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/orders' , {
      method:'POST',
      body:JSON.stringify(order),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
});
}

export  function updateOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/orders/'+ order.id , {
      method:'PATCH',
      body:JSON.stringify(order),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
});
}

export  function fetchAllOrders(sort , pagination) {
  //here in the part of admin there could be many orders from the millions of people so pagination is required
  let queryString ='';
  for(let key in pagination){

    queryString += `${key}=${pagination[key]}&`
}
for(let key in sort){
  queryString += `${key}=${sort[key]}&`
}
console.log("this is querystrign" + queryString)

return new Promise(async (resolve) =>{
  const response = await fetch(`/orders?${queryString}`);
  const data = await response.json();
  // we are using x-total count because due to some restriction the server could send only subset of the totla items so we are ordering to send the all totalitems in the server 
  const totalOrders = await response.headers.get('X-Total-Count');
  resolve({data:{orders:data,totalOrders:+totalOrders}});
});
}
