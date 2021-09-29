
const { MongoMemoryServer } = require("mongodb-memory-server");
const MongoClient = require("mongodb").MongoClient;
let mongod;  //= new MongoMemoryServer();
const database=require('../util/database.js');

exports.dbConnect = async () => {
   mongod = await MongoMemoryServer.create();
  const uri =  mongod.getUri();


const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = new MongoClient(uri, mongoOptions);
  await client.connect();
  
};

exports.dbDisconnect = async () => {
 
  //await database.mongoDBDisconnect();
  await mongod .stop();
};

