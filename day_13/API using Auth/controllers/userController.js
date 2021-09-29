const logger = require("../util/logger.js");
require("dotenv").config();
const io = require("../util/io.js");
const crud = require("../db_functions/dbFunction.js");
const event = require("../util/event.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
        let eventname = "follow";
        let eventdata = req.body.userid + " has been followed";
        event.getEvent(eventname);
        event.init().emit(eventname, eventdata);

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

addSignup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(
      "firstname= " +
        firstname +
        " lastname= " +
        lastname +
        " email=" +
        email +
        " password=" +
        password
    );

    // Validate user input
    if (!(email && password && firstname && lastname)) {
      res.status(400).json("All input is required");
    }

    const oldUser = await crud.findByEmail(email);
    console.log("oldUser= " + oldUser);

    if (oldUser) {
      res.status(409).json("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    console.log("encryptedPassword" + encryptedPassword);

    email.toLowerCase();
    const user = {
      firstname,
      lastname,
      email: email, // sanitize: convert email to lowercase
      password: encryptedPassword,
      token: "",
      followers: [],
      followings: [],
    };
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    console.log("user=" + user);
    const insertResult = await crud.signup(user);
    console.log(insertResult);
    res.json(insertResult);
    res.status(200);
    logger.info("signup API success");
  } catch (error) {
    res.status(400).json(" signup API failed");
    logger.error("signup API failed:", error);
  }
};

getsignin = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await crud.signin({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
      logger.info("signin API success");
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    logger.error("signin API failed:", error);
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
  addSignup,
  getsignin,
};
