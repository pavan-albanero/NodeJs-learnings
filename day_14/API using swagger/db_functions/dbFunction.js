const mongodb = require("mongodb");
const logger = require("../util/logger.js");
const database = require("../util/database.js");
let db;

async function getconnection() {
  db = await database();
  logger.info("connection intialized ");
  return db;
}
getconnection();
let findall = async () => await db.collection("users").find().toArray();

let findone = async (id) =>
  await db.collection("users").findOne({ _id: new mongodb.ObjectId(id) });

const insertone = async (user) => await db.collection("users").insertOne(user);

const deleteone = async (id) =>
  await db.collection("users").deleteOne({ _id: new mongodb.ObjectId(id) });

const updateone = async (id, user) =>
  await db
    .collection("users")
    .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: user });

const followone = async (myId, yourId) => {
  let UserId = await db
    .collection("users")
    .findOne({ _id: new mongodb.ObjectId(myId) });
  let currentUserId = await db
    .collection("users")
    .findOne({ _id: new mongodb.ObjectId(yourId) });

  let myfollowers = UserId._id;

  let userfollowings = currentUserId.followings;
  if (userfollowings) {
    let intersection = userfollowings.includes(myfollowers); //this should return true so we can avoid redundant followers
    console.log("Intersection=", intersection);
  }

  // if(intersection!==false){
  await db
    .collection("users")
    .updateOne(
      { _id: new mongodb.ObjectId(myId) },
      { $push: { followers: currentUserId._id } }
    );
  await db
    .collection("users")
    .updateOne(
      { _id: new mongodb.ObjectId(yourId) },
      { $push: { followings: UserId._id } }
    );
  return true;
  /* }
        return false;*/
};

const showfollowers = async (id) =>
  await db
    .collection("users")
    .findOne(
      { _id: new mongodb.ObjectId(id) },
      { projection: { followers: { $elemMatch } } }
    );

//signup
const signup = async (user) => await db.collection("users").insertOne(user);

//signIn
const signin = async (email) => await db.collection("users").findOne(email);

//find
let findByEmail = async (email) =>
  await db.collection("users").findOne({ email });

module.exports = {
  getconnection,
  findall,
  findone,
  insertone,
  deleteone,
  updateone,
  followone,
  showfollowers,
  signup,
  signin,
  findByEmail,
};
