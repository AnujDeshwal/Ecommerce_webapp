// A mock function to mimic making an async request for data
export default function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/users' , {
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
    const email =logInInfo.email;
    const password = logInInfo.password;
    const response = await fetch(`http://localhost:8080/users?email=${email}`);
    const data = await response.json();
    // console.log("data is"+ data)
    if(data.length){
      if(password===data[0].password){
        resolve({data:data[0]})
      }
      else{
        reject({message:'wrong credential'});
      }
    }
    else{
      reject({message:'user not found'})
    }
});
}

export  function updateUser(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/users/'+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{'content-type':"application/json"},
    } );
    const data = await response.json();
    // console.log("data is"+ data)
    resolve({data});
});
}