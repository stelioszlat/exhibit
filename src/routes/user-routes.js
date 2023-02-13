const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');

// /api/users
router.get('/all', userController.getUsers);
router.get('/user/:uid', userController.hasValidId, userController.getUserById);
router.post('/user', userController.addUser);
router.put('/user/:uid', userController.hasValidId, userController.updateUser);
router.delete('/user/:uid', userController.hasValidId, userController.deleteUser);


module.exports = router;