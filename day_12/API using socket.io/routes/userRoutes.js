const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const getio= require('../util/io.js');
let data ="user followed"

//get all /users/
router.get('/',userController.getAllUsers);

//get user /users/:id
router.get('/:id',userController.getOneUser);

//add one user  /users/
router.post('/',userController.addOneUser);

//delete user /users/:id
router.delete('/:id',userController.deleteOneUser);

//update user /users/:id
router.patch('/:id',userController.updateOneUser);

//add follower /users/
router.put('/:id/follow',userController.followUser);

//get all followers /users/:id/followers
router.get('/:id/followers',userController.getAllFollowers);

module.exports = router;