// A mock function to mimic making an async request for data
export default function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/auth/signup' , {
      method:'POST',
      // right now we are not getting data from the server now we will send data to the server to get that stored 
      // A common use of JSON is to exchange data to/from a web server. When sending data to a web server, the data has to be a Json string. 
      body:JSON.stringify(userData),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
});
}

export  function checkUser(logInInfo) {
  return new Promise(async (resolve , reject) =>{

  try{  const response = await fetch(`http://localhost:8080/auth/login`,{
      method:'POST',
      body:JSON.stringify(logInInfo),
      headers:{'content-type':'application/json'},
    });
    // when we are calling above api so there whenever we will send status 401 it means error or bad request so in this time response.ok get false and in the good request like in the status 200 it will make true to response.ok so means yes user exist in our database 
    if(response.ok){
      const data = await response.json();
      resolve({data})
    }
    else{
      // always remember that whenever your promise will be rejected so it will go back to the thunk and since the api function it called get rejected due to a error so you can use try catch there in the thunk to catch the error i sent in the reject 
      const error = await response.text();

      reject(error);
    }
  }catch(err){
    console.log("this is in the catch ")
    // console.log(err)
    reject(err)
  }
    
});
}
// A mock function to mimic making an async request for data
export function signOut (userid) {
  return new Promise(async (resolve) =>{
    resolve({data:'success'});
});
}

