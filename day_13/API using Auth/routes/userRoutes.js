const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth.js");

//get all /users/
router.get("/", auth, userController.getAllUsers);

//get user /users/:id
router.get("/:id", auth, userController.getOneUser);

//add one user  /users/
router.post("/", auth, userController.addOneUser);

//delete user /users/:id
router.delete("/:id", auth, userController.deleteOneUser);

//update user /users/:id
router.patch("/:id", auth, userController.updateOneUser);

//add follower /users/
router.put("/:id/follow", auth, userController.followUser);

//get all followers /users/:id/followers
router.get("/:id/followers", auth, userController.getAllFollowers);

router.post("/register", userController.addSignup);

router.post("/login", userController.getsignin);

module.exports = router;
