const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.addSignup);

/**
 * @swagger
 * /login:
 *   post:
 *     description: login
 *     parameters:
 *      - name: email
 *        description: email of user
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: password of user
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/login", userController.getsignin);

module.exports = router;
