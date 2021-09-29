const mongodb =require("mongodb");
const logger=require('../util/logger.js');
const database=require('../util/database.js');
let db

async function getconnection(){
  
  db = await database.mongoDBConnection();
 logger.info("connection intialized ");
 return db;
}
getconnection();

//to get all users
getAllUsers = async (req, res)=>{
 // let db = await database.connect();

    try {
     
        
        let users = await db.collection('users').find().toArray(); 
        res.json(users).status(200);
        logger.info("Get all API success");
        logger.info("database status in get api:");
    
      }
      catch (error) {
        res.status(400).json({
          message: "Something went wrong"
        });
        logger.error("database status in get api:");
        logger.error("Get all API failed:", error);
      }
}

//to get one users
getOneUser = async (req, res)=>{
    try{
     
      
        let {id}  = req.params;
       let foundUser= await db.collection('users').findOne({"_id": new mongodb.ObjectId(id)});
       res.json(foundUser);
        res.status(200);
        logger.info("Get by id API success");
      }catch (error) {
        res.status(200).json("Get by id API failed");
        logger.info("Get by id API failed:",error);
      }
}

//add one user
addOneUser= async (req, res)=>{
    try{ 
     
        let user1 = req.body;
        const insertResult = await db.collection('users').insertOne(req.body);
        console.log(insertResult);
         res.json(insertResult);
        res.status(200);
        logger.info("add user API success");
      }catch (error) {
        res.status(400).json(" failed");
        logger.error("add user API failed:", error);
      }
}

//delete one user 
deleteOneUser = async (req, res)=>{
    try{
     
            let id  = req.params.id;
            await db.collection('users').deleteOne({_id:new mongodb.ObjectId(id)},
            function(){
            res.json(`User with id : ${id} deleted successfully!`);
            res.status(200);
            logger.info("delete user API success");
        });
        }catch (error) {
            res.status(400).json("delete API failed");
            logger.error("delete API failed:", error);
      }     
}

//update user
updateOneUser = async (req, res)=>{
    try{
     
        let { id } = req.params;
        let {firstname,lastname,email}=req.body;
        let user={
          firstname:firstname,
          lastname:lastname,
          email:email
        }
        const foundUser= await db.collection('users').findOneAndUpdate({_id:new mongodb.ObjectId(id)},{ $set:user  });
        //let foundUser=dataArray.find((user) => user.id == id);
        
        res.json(foundUser).status(200);    
        logger.info("update user API success");
      }catch (error) {
        res.json("update user API failed").status(400);
        logger.error("update user API failed:", error); 
      }    
}

//follow a user 
followUser= async (req, res)=>{
    if(req.body.userid !== req.params.id){
        try{
         
        let UserId  =await db.collection('users').findOne({"_id": new mongodb.ObjectId(req.params.id)},{"projection":{"id":2}}); 
        let currentUserId =await db.collection('users').findOne({"_id": new mongodb.ObjectId(req.body.userid)},{"projection":{"id":2}});
        let UserExists =await db.collection('users').findOne({followers:{"_id": new mongodb.ObjectId(req.body.userid)}});
        
        if(UserExists!=currentUserId){
          await db.collection('users').updateOne({"_id": new mongodb.ObjectId(req.params.id)},{$push: {followers:currentUserId}}); 
          await db.collection('users').updateOne({"_id": new mongodb.ObjectId(req.body.userid)},{$push: {followings:UserId}}); 
            //UserId.followers.push(req.body.userid);
           // currentUserId.followings.push(req.params.id);
            res.status(200).json("user has been followed");
            logger.info(`${UserId} has been followed`);
        }else{
            res.status(403).json('you already follow this user');
            logger.info(`you already follow this ${UserId}`); 
        }
    } catch(err) {
            res.status(500).json(err);
            logger.error("follow API failed:", error); 
        }
    }else{
        res.status(403).json('you cant follow yourself');
        logger.info(`${currentUserId} you cant follow yourself`);
    }
       
}

 //get all followers
getAllFollowers= async (req, res)=>{
    try{
    
        //console.log(req.params.id);
        let UserId  = await db.collection('users').findOne({"_id": new mongodb.ObjectId(req.params.id)},{"projection":{"followers":{"_id":1}}}); 
        //var followers = UserId.followers;
        //console.log(UserId);
        //let followerId= await db.collection('users').findOne(UserId,{"projection":{"followers":{"_id":1}}});
       // console.log( "followerId=: " , UserId );
      res.json(UserId).status(200);
      logger.info("view followers API success");
      }catch (error) {
        res.json("view followers API failed").status(400);
      logger.error("view followers API failed",error);
      }
}

module.exports ={getAllUsers,
                getOneUser,
                getAllFollowers,
                addOneUser,
                updateOneUser,
                deleteOneUser,
                followUser
                }