const mongodb =require("mongodb");
const  express= require('express');;
const app = express();
const database=require('./util/database.js');
const logger=require('./util/logger.js');
let db
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000);
logger.info('running on port 3000');
async function getconnection(){
  
  db = await database();
 logger.info("connection intialized ");
 return db;
}
getconnection();
app.get('/users/',async (req, res)=>{
    // let db = await database.connect();
   
       try {
           let users = await db.collection('test').find().toArray(); 
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
   });

app.patch('/users/:id',async (req, res)=>{
    try{
        //logger.info("req=",req);
        let { id } = req.params;
        let {firstname,lastname,email}=req.body;
        let user={
          firstname:firstname,
          lastname:lastname,
          email:email
        }
        const foundUser= await db.collection('test').updateOne({_id:new mongodb.ObjectId(id)},{ $set:user  },{ upsert: true });
        //let foundUser=dataArray.find((user) => user.id == id);
        
        res.json(foundUser).status(200);    
        logger.info("update user API success");
      }catch (error) {
        res.json("update user API failed").status(400);
        logger.error("update user API failed:", error); 
      }    
});


app.get('/users/aggregate',async (req, res)=>{
    // let db = await database.connect();
   
       try {
           let users = await db.collection('test').aggregate([
            { $match: { firstname: "r" } },
            { $group: { _id: "$firstname", total: "$count" } },
            { $sort: { total: -1 } }
          ]) .toArray();
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
   });

