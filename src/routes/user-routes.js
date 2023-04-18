const express = require('express');

const router = express.Router();
const userController = require('../auth/user-controller');
const { authenticate, isAdmin, isSelf, isSelfOrAdmin, userExists } = require('../auth/auth-util');

// /api/users
router.get('/all', userController.getUsers);
router.post('', userExists, userController.createUser);
router.get('/user/:uid', authenticate, isSelf, userController.getUserById);
router.put('/user/:uid', authenticate, isSelfOrAdmin, userController.updateUserById);
router.delete('/user/:uid', authenticate, isAdmin, userController.deleteUserById);


module.exports = router;