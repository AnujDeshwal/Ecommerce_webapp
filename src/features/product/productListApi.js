

// A mock function to mimic making an async request for data
export default function fetchAllProducts() {
  // ===This api call is just for that when you did not select any filter so at that case in just starting of react app as soon as react app opens this api call should  be executed so we used useEffect hook to do this functinality 
  return new Promise(async (resolve) =>{
    // firsly we did like we give data.json file to json-server package and it made api for us in below location in which that data.json files is being displayed .
    const response = await fetch(`http://localhost:8080/products`);
    const data = await response.json();
    // you know in js we always resolve a promise with a value means if it get fulfilled or it get succeed so it returns a result with that arguement which you passed to the resolve function basically resolve function can take any datatype and ones promise get fulfilled it returns that data here we resolved it with a object has a key data , that why in the productSlice we are getting the response that response is nothing but just this object which we passed and accessing the data by response.data 

    resolve({data});
});
}

export  function fetchAllProductsByFilter(filter,sort,pagination) {
 
  // here filter will come as object like //filter = {"category":["smartphones", "clothes"]}
  //sort ={_sort:"price",_order:"desc"}
  //pagination={_page:1 , _limit=10}
  let queryString ="";
  for(let key in filter){
    // console.log(filter[key])
    const categoryValues = filter[key];
    if(categoryValues.length>0){

      const lastCategoryValue = categoryValues[categoryValues.length-1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
      queryString += `${key}=${sort[key]}&`
  }
  // console.log("hereis"+pagination)
  for(let key in pagination){

      queryString += `${key}=${pagination[key]}&`
  }
  
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/products?${queryString}`);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:+totalItems}});
});
}
// we are not fetching brands and categories form the api 
export  function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/brands`);
    const data = await response.json();
    resolve({data});
  });
}
export  function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/categories`);
    const data = await response.json();
    resolve({data});
  });
}
export  function fetchDetails(id) {
  // console.log('anuj')
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/Products/${id}`);
    const data = await response.json();
    // console.log("datais"+data)
    resolve({data});
  });
}