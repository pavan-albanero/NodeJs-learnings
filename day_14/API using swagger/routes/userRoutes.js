const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
/**
 * @swagger
 * tags:
 *   name: users
 *   description: Register & Login
 *
 */
/**
 * @swagger
 * components:
 *      schemas:
 *          getfollower:
 *               type: object
 *               required:
 *                  - followers
 *               properties:
 *                  followers:
 *                      type: array
 *                      items:
                            type: string
 */
/**
 * /**
 * @swagger
 * components:
 *      schemas:
 *          updateuser:
 *               type: object
 *               properties:
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  followings:
 *                      type: array
 *                  followers:
 *                      type: array
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          user:
 *               type: object
 *               required:
 *                  - firstname
 *                  - lastname
 *                  - email
 *                  - followers
 *                  - followings
 *
 *               properties:
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  followings:
 *                      type: array
 *                  followers:
 *                      type: array
 */
/**

/**
 * @swagger
 * / :
 *   get:
 *     description: Get all Users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: Success
 *
 */

//get all /users/
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /{userid}:
 *   get:
 *     description: Get one User
 *     tags: [users]
 *     parameters:
 *      -  in: path
 *         name: userid
 *         schema:
 *              type: string
 *              required: true
 *              description: id of user
 *     responses:
 *       200:
 *         description: Success
 *
 */

//get user /users/:id
router.get("/:id", userController.getOneUser);

/**
 * @swagger
 * /:
 *     post:
 *        description: login
 *        tags: [users]
 *        consumes:
 *          - application/json
 *        requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/user'
 *     responses:
 *       201:
 *         description: Created
 *
 */
//add one user  /users/
router.post("/", userController.addOneUser);

/**
 * @swagger
 * /{userid}:
 *   delete:
 *     description: Get one User
 *     tags: [users]
 *     parameters:
 *      -  in: path
 *         name: userid
 *         schema:
 *              type: string
 *              required: true
 *              description: delete user
 *     responses:
 *       200:
 *         description: Success
 *
 */
//delete user /users/:id
router.delete("/:id", userController.deleteOneUser);

/**
 * @swagger
 * /{userid}:
 *   patch:
 *     description: Get one User
 *     tags: [users]
 *     parameters:
 *      -  in: path
 *         name: userid
 *         schema:
 *              type: string
 *              required: true
 *              description: id of user
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/updateuser'
 *     responses:
 *              200:
 *                  description: The book was updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/updateuser'
 *              404:
 *                  description: The book was not found
 *              500:
 *                  description: Some error happened
 *
 *
 */
//update user /users/:id
router.patch("/:id", userController.updateOneUser);

/**
 * @swagger
 * /{userid}/follow:
 *   put:
 *     description: Get one User
 *     tags: [users]
 *     parameters:
 *      -  in: path
 *         name: userid
 *         schema:
 *              type: string
 *              required: true
 *              description: id of user
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  name: id
 *                  schema:
 *                      type: string
 *                      required: true
 *                      description: id of following
 *     responses:
 *              200:
 *                  description: The user followed
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/updateuser'
 *              404:
 *                  description: The book was not found
 *              500:
 *                  description: Some error happened
 *
 *
 */

//add follower /users/
router.put("/:id/follow", userController.followUser);

/**
 * @swagger
 * /{userid}/followers:
 *   get:
 *     description: Get followers
 *     tags: [users]
 *     parameters:
 *      -  in: path
 *         name: userid
 *         schema:
 *              type: string
 *              required: true
 *              description:  get followers
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/getfollower'
 *
 */
//get all followers /users/:id/followers
router.get("/:id/followers", userController.getAllFollowers);

module.exports = router;
