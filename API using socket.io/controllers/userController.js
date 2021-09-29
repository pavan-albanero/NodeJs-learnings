const logger = require("../util/logger.js");
const io = require("../util/io.js");
const crud = require("../db_functions/dbFunction.js");
crud.getconnection();

//to get all users
getAllUsers = async (req, res) => {
  try {
    let users = await crud.findall();
    res.json(users).status(200);
    logger.info("Get all API success");
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
    logger.error("database status in get api:");
    logger.error("Get all API failed:", error);
  }
};

//to get one users
getOneUser = async (req, res) => {
  try {
    let { id } = req.params;
    let foundUser = await crud.findone(id);
    res.json(foundUser);
    res.status(200);
    logger.info("Get by id API success");
  } catch (error) {
    res.status(200).json("Get by id API failed");
    logger.info("Get by id API failed:", error);
  }
};

//add one user
addOneUser = async (req, res) => {
  try {
    const insertResult = await crud.insertone(req.body);
    console.log(insertResult);
    res.json(insertResult);
    res.status(200);
    logger.info("add user API success");
  } catch (error) {
    res.status(400).json(" failed");
    logger.error("add user API failed:", error);
  }
};

//delete one user
deleteOneUser = async (req, res) => {
  try {
    let id = req.params.id;
    let deleteOne = await crud.deleteone(id);
    if (deleteOne.deletedCount != 0) {
      console.log("delete=", deleteOne);
      res.json(`User with id : ${id} deleted successfully!`);
      res.status(200);
      logger.info("delete user API success");
    } else {
      res.status(404).json(`User with id : ${id} not found!`);
    }
  } catch (error) {
    res.status(400).json("delete API failed");
    logger.error("delete API failed:", error);
  }
};

//update user
updateOneUser = async (req, res) => {
  try {
    let { id } = req.params;
    let { firstname, lastname, email } = req.body;
    let user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
    };
    const foundUser = await crud.updateone(id, user);
    res.json(foundUser).status(200);
    logger.info("update user API success");
  } catch (error) {
    res.json("update user API failed").status(400);
    logger.error("update user API failed:", error);
  }
};

//follow a user
followUser = async (req, res) => {
  if (req.body.userid !== req.params.id) {
    try {
      let getbool = await crud.followone(req.params.id, req.body.userid);
      //getbool will ruturn true if followed  false otherwise.
      if (getbool) {
        let data = "user has been followed";

        io.getIO().emit("follow-notification", data);
        res.status(200).json("user has been followed");
        logger.info(` has been followed`);
      } else {
        res.status(403).json("you already follow this user");
        logger.info(`you already follow this `);
      }
    } catch (err) {
      res.status(500).json(err);
      logger.error("follow API failed:", err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
    logger.info(` you cant follow yourself`);
  }
};

//get all followers
getAllFollowers = async (req, res) => {
  try {
    //console.log(req.params.id);
    let followers = await crud.showfollowers(req.params.id);

    res.json(followers).status(200);
    logger.info("view followers API success");
  } catch (error) {
    res.json("view followers API failed").status(400);
    logger.error("view followers API failed", error);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getAllFollowers,
  addOneUser,
  updateOneUser,
  deleteOneUser,
  followUser,
};
