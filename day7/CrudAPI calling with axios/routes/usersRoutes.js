const  express= require('express');
const router = express.Router();
const mongodb =require("mongodb");
const MongoClient = require('mongodb').MongoClient;
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
let db

const connectionString = `mongodb://localhost:27017/crud`

MongoClient.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
   
  }
)


router.get('/',  function(req, res) {
    
    db.collection('users')
    .find()
    .toArray(function (err, items) {
      res.send(items)
    })

});

//get by id
router.get('/:id', async function(req, res) {
    let {id}  = req.params;
    console.log(id);

   let foundUser= await db.collection('users').findOne({"_id": new mongodb.ObjectId(id)});
   res.json(foundUser);
    res.status(200);
    
    
});

//add
router.post('/', async function(req, res) {
    console.log(req.body);
    let user1 = req.body;
    const insertResult = await db.collection('users').insert(req.body);
    console.log(insertResult);
     res.json(insertResult);
    res.status(200);
    
});

//delete
router.delete('/:id', async function(req, res) {
  let id  = req.params.id;
  
  await db.collection('users').deleteOne({_id:new mongodb.ObjectId(id)},
  function(){
    res.json(`User with id : ${id} deleted successfully!`);
    res.status(200);
  });
  
  
});

//update
router.patch('/:id',async function(req, res) {
  let { id } = req.params;
  let {firstname,lastname,email}=req.body;
  let user={
    firstname:firstname,
    lastname:lastname,
    email:email
  }
  const foundUser= await db.collection('users').findOneAndUpdate({_id:new mongodb.ObjectId(id)},{ $set:user  });
  //let foundUser=dataArray.find((user) => user.id == id);
  
  res.json(foundUser);    
});

//follow
router.put('/:id/follow',async function(req, res) {
    if(req.body.userid !== req.params.id){
        try{
        let UserId  =await db.collection('users').findOne({"_id": new mongodb.ObjectId(req.params.id)},{"projection":{"id":2}}); 
        let currentUserId =await db.collection('users').findOne({"_id": new mongodb.ObjectId(req.body.userid)},{"projection":{"id":2}});
        let UserExists =await db.collection('users').findOne({followers:{"_id": new mongodb.ObjectId(req.body.userid)}});
        console.log("current=",currentUserId);
        if(UserExists!=currentUserId){
          await db.collection('users').updateOne({"_id": new mongodb.ObjectId(req.params.id)},{$push: {followers:currentUserId}}); 
          await db.collection('users').updateOne({"_id": new mongodb.ObjectId(req.body.userid)},{$push: {followings:UserId}}); 
            //UserId.followers.push(req.body.userid);
           // currentUserId.followings.push(req.params.id);
            res.status(200).send("user has been followed");
        }else{
            res.status(403).send('you already follow this user');
        }
    } catch(err) {
            res.status(500).send(err);
            console.log(err)
        }
    }else{
        res.status(403).send('you cant follow yourself');
    }
   
});

 //get all followers
router.get('/:id/followers',async function(req, res) {
    //console.log(req.params.id);
    let UserId  = await db.collection('users').findOne({"_id": new mongodb.ObjectId(req.params.id)},{"projection":{"followers":{"_id":1}}}); 
    //var followers = UserId.followers;
    console.log(UserId);

    let followerId= await db.collection('users').findOne(UserId,{"projection":{"followers":{"_id":1}}});
    console.log( "followerId=: " , followerId );
  res.json(followerId).status(200);

});


module.exports = router;