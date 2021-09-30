const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @swagger
 * /:
 *   get:
 *     description: Get all Users
 *     responses:
 *       200:
 *         description: Success
 *
 */

//get all /users/
router.get("/", userController.getAllUsers);

/**
 * @method get
 * @param id
 * @description get one user
 */

//get user /users/:id
router.get("/:id", userController.getOneUser);

/**
 * @method post
 * @description add a new user
 */

//add one user  /users/
router.post("/", userController.addOneUser);

/**
 * @method delete
 * @param id
 * @description delete the user
 */

//delete user /users/:id
router.delete("/:id", userController.deleteOneUser);

/**
 * @method patch
 * @param id
 * @description update the user
 */

//update user /users/:id
router.patch("/:id", userController.updateOneUser);

/**
 * @method post
 * @param id
 * @description follow the user
 */

//add follower /users/
router.put("/:id/follow", userController.followUser);

/**
 * @method get
 * @param id
 * @description get the user's followers list
 */

//get all followers /users/:id/followers
router.get("/:id/followers", userController.getAllFollowers);

module.exports = router;
