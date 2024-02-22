const Router = require('express');

const authController = require('../auth/auth-controller');
const { authenticate, isSelf, userExists } = require('../auth/auth-util');

const router = Router();

// /api/auth
router.post('/login', authController.login);
router.post('/logout', authenticate, isSelf, authController.logout);
router.post('/reset', authenticate, isSelf, authController.reset);
router.post('/register', userExists, authController.register);

module.exports = router;