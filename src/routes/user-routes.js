const express = require('express');

const router = express.Router();
const userController = require('../auth/user-controller');
const { authenticate, isAdmin, isSelf, isSelfOrAdmin, userExists } = require('../auth/auth-util');

// /api/user
router.get('', userController.getUsers);
router.post('', userExists, userController.createUser);
router.get('/:uid', userController.getUserById);
router.put('/:uid', userController.updateUserById);
router.delete('/:uid', userController.deleteUserById);


module.exports = router;