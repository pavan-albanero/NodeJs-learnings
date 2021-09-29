var  express= require('express');
var router = express.Router();


var dataArray =[{id: 1, firstname: "John", lastname: "Smith", email: "Jsmith123@gmail.com",followers:[],followings:[]},
                {id: 2, firstname: "Jack", lastname: "Johnson", email: "JackJohnson@gmail.com",followers:[],followings:[]},
                {id: 3, firstname: "rose", lastname: "black", email: "roseblack@gmail.com",followers:[],followings:[]},
            ];

 //get all
router.get('/', function(req, res) {
    
    res.json(dataArray);
});

//get by id
router.get('/:id', function(req, res) {
    let { id } = req.params;
    
    let foundUser=dataArray.find((user) => user.id == id);
    res.send(foundUser);
    
    
});

//add
router.post('/', function(req, res) {
    
    dataArray.push(req.body);
    res.send(`User with name : ${req.body.firstname} added successfully!`);
    
});

//delete
router.delete('/:id', function(req, res) {
    let { id } = req.params;
    
    dataArray=dataArray.filter((user) => user.id != id);
     res.send(`User with id : ${id} deleted successfully!`);
    
    
});

//update
router.patch('/:id', function(req, res) {
    let { id } = req.params;
    let {firstname,lastname,email}=req.body;
    
    let foundUser=dataArray.find((user) => user.id == id);
    if(firstname){
        foundUser.firstname=firstname;
    }
    if(lastname){
        foundUser.lastname=lastname;
    }
    if(email){
        foundUser.email=email;
    }
    res.send(foundUser);    
});

 //follow
router.put('/:id/follow', function(req, res) {
    if(req.body.userid !== req.params.id){
        try{
        let UserId  = dataArray.find((user) => user.id == req.params.id); 
        let currentUserId =dataArray.find((user) => user.id ==  req.body.userid);
        if(!UserId.followers.includes(req.body.userid)){
            UserId.followers.push(req.body.userid);
            currentUserId.followings.push(req.params.id);
            res.status(200).send("user has been followed");
        }else{
            res.status(403).send('you already follow this user');
        }
    } catch(err) {
            res.status(500).send(err);
        }
    }else{
        res.status(403).send('you cant follow yourself');
    }
   
});

 //get all followers
router.get('/:id/followers',function(req, res) {
    //console.log(req.params.id);
    let UserId  = dataArray.find((user) => user.id == req.params.id); 
  let followers = UserId.followers;
  console.log(followers);
  
  
  var filtered=dataArray.filter(user => followers.includes(user.id));

    res.send(filtered);
    console.log(filtered);

});

module.exports = router;