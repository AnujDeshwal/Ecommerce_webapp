export  function fetchLoggedInUserOrders(userid) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders/?user.id='+userid );
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
  });
}
