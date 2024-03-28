// A mock function to mimic making an async request for data
export default function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/auth/signup' , {
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

export  function loginUser(logInInfo) {
  return new Promise(async (resolve , reject) =>{

  try{  const response = await fetch(`/auth/login`,{
      method:'POST',
      body:JSON.stringify(logInInfo),
      headers:{'content-type':'application/json'},
    });
    // when we are calling above api so there whenever we will send status 401 it means error or bad request so in this time response.ok get false and in the good request like in the status 200 it will make true to response.ok so means yes user exist in our database 
    if(response.ok){
      console.log("hello")
      const data = await response.json();
      console.log("this is the data:"+data)
      resolve({data})
    }
    else{
      // always remember that whenever your promise will be rejected so it will go back to the thunk and since the api function it called get rejected due to a error so you can use try catch there in the thunk to catch the error i sent in the reject 
      const error = await response.text();

      reject(error);
    }
  }catch(err){
    console.log("this is in the catch ")
    console.log("this is an error" + err)
    reject(err)
  }
    
});
}
// this checkAuth we made because when we are logged in and if you will refresh the page so you will redirect to the login page and you will have to login again but here now after someone will refresh so first we will check in the backend if user still exist means if it is still logged in so we will not redirect him in the login page rather will redirect to home page 
export  function checkAuth(logInInfo) {
  return new Promise(async (resolve , reject) =>{

  try{  const response = await fetch(`/auth/check`);
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

export  function signOut() {
  return new Promise(async (resolve , reject) =>{
//you know if we have to do logout feature means here we have to remove the session from the backend , so that if you did logout you go to the sigin page but when you do refresh you will be logged in again automatically because it will check the session on the refresh and it will log you in  automatically  
  try{  const response = await fetch(`/auth/logout`); 
    if(response.ok){
      // very important here that it is the get request but from the backend we are not sending anything which means here response has nothing so it will not be changed to json so it can create a error and then it can be rejected so simply do not write await response.json()
      // const data = await response.json();
      resolve({data:'success'})
    }
    else{
      const error = await response.text();
      reject(error);
    }
  }catch(err){
    reject(err)
  }
    
});
}
// basically here user is just requesting to reset the password but password it not reset yet because until user wont click on the link sent to the gmail password will not be reset so for that on click the reset link we will make another api to reset the password 
export  function resetPasswordRequest(email) {
  return new Promise(async (resolve , reject) =>{
// console.log("helloin inside of api")
  try{  
    const response = await fetch(`/auth/reset-password-request`,{
      method:'POST',
      body:JSON.stringify({email}),
      headers:{'content-type':'application/json'}
    });
    // when we are calling above api so there whenever we will send status 401 it means error or bad request so in this time response.ok get false and in the good request like in the status 200 it will make true to response.ok so means yes user exist in our database 
    if(response.ok){
      console.log("helllo anuj")
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
export  function resetPassword(data) {
  return new Promise(async (resolve , reject) =>{
// console.log("helloin inside of api")
  try{  
    const response = await fetch(`/auth/reset-password`,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{'content-type':'application/json'}
    });

    if(response.ok){
      // console.log("helllo anuj")
      const data = await response.json();
      resolve({data})
    }
    else{
      const error = await response.text();

      reject(error);
    }
  }catch(err){
    console.log("this is in the catch ")
    reject(err)
  }
    
});
}
export  function otpgeneration(email) {
  return new Promise(async (resolve , reject) =>{
// console.log("helloin inside of api")
  try{  
    console.log("this is email:",email)
    const response = await fetch(`/auth/otp`,{
      method:'POST',
      // below thing is like we are getting a string or just email so we can not directly pass it to the JSON.sttingify because it is expecting a json but you are putting a string instead whicih will give you a error 
      body:JSON.stringify({email}),
      headers:{'content-type':'application/json'}
    });

    if(response.ok){
      console.log("helllo anuj")
      const res = await response.json();
      const data = res.OTP;
      resolve({data})
    }
    else{
      console.log("here is the error")
      console.log("this is the response:",response)
      const error = await response.text();

      reject(error);
    }
  }catch(err){
    console.log("this is in the catch ")
    reject(err)
  }
    
});
}