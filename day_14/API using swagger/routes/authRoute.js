const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Register & Login
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          login:
 *                type: object
 *                required:
 *                  - email
 *                  - password
 *                properties:
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  password:
 *                      type: password
 *                      description: password of user
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
 *                  - password
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
 *                  password:
 *                      type: password
 *                      description: password of user
 *                  token:
 *                      type: string
 *                  followings:
 *                      type: array
 *                  followers:
 *                      type: array
 */
/**
 * @swagger
 * /register:
 *     post:
 *        description: login
 *        tags: [Authentication]
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
 */
router.post("/register", userController.addSignup);
/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: login
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/login'
 *
 *   responses:
 *       201:
 *         description: Created
 */
router.post("/login", userController.getsignin);

module.exports = router;
