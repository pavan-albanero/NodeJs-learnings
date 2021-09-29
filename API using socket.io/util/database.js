const MongoClient = require("mongodb").MongoClient;
//const { MongoClient } = require("mongodb");
const logger=require('./logger.js');
require('dotenv').config({ path: './.env' });

const host = process.env.DB_HOST;
const port = process.env.DB_PORT ;
const dbName = process.env.DB_NAME;

logger.info("host :", process.env.DB_HOST);
logger.info("port :", process.env.DB_PORT);
logger.info("database name:", process.env.DB_NAME); 

const uri = host+':'+port+"/" +dbName;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(uri, mongoOptions);

let _db;

const mongoDBConnection = async (app) => {
  try {
  
    await client.connect();
    _db = client.db(dbName);
    logger.info("database connected");
    return client.db(dbName);
    
  } catch (error) {
    return Promise.reject(error);
  }
};


module.exports = mongoDBConnection;


