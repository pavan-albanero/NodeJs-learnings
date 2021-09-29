const axios= require('axios');

//get all
async function getAllUsers (){
  let Users=  await axios.get('http://localhost:3000/users');
    console.log("Users=",Users);
}
/*async function getAllUsers (){
    let Users=  await axios({url: 'http://localhost:3000/users'});
      console.log("Users=",Users);
  }*/
//get one user
async function getUser (){
    let User=  await axios.get( 'http://localhost:3000/users/614b0532efc26acf5fcd4bb8');
      console.log("User=",User.data);
  }
//add
async function addUser () {
    try {
        let User= await axios.post(
        'http://localhost:3000/users/',
         {
     
        firstname: "shubham",
         lastname: "patil", 
         email: "shubhampatil@gmail.com",
         followers: [],
           followings: []
       });
       console.log( "User=",User);
} catch (error) {
    console.error(error)
  }
  }

 //update user
 async function upadateUser () {
    try {
        let User= await axios.patch(
        'http://localhost:3000/users/614b1dbf62993a8ef6f47811',
         {
     
        firstname: "sangram",
         lastname: "rao", 
         email: "sangramrao@gmail.com",
         followers: [],
           followings: []
       });
       console.log( "User=",User);
} catch (error) {
    console.error(error)
  }
  } 

  //delete user
  async function deleteUser (){
    let User=  await axios.delete('http://localhost:3000/users/614b1dcb62993a8ef6f47812');
      console.log("User=",User.data);
  }


  async function follow (){
    try {
    let user1= '614b1dbf62993a8ef6f47811'; 
    let user2='614b1dcb62993a8ef6f47812';
    let a=await axios.put(`http://localhost:3000/users/${user1}`,{following:[user2]});
      let b=await axios.put(`http://localhost:3000/users/${user2}`,{follower:[user1]});
    console.log("a=",a);
    console.log("b=",b);
  }catch (error) {
    console.error(error)
  }
}
  //axios.put('https://reqres.in/api/articles/1', article)
  //addUser();
  //getAllUsers ();
  //upadateUser ();
  //getUser ();
  //deleteUser ();
  follow ();