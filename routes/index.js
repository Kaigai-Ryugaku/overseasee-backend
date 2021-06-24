const express = require('express');

const router = express.Router();

const checkUserAuth = require('../policies/checkUserAuth');
const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');

router.post('/auth/login', AuthController.login);
router.post('/auth/signup', AuthController.signup);
router.get('/auth/facebook/callback', AuthController.facebookLoginCallback);
router.get('/auth/google/callback', AuthController.googleLoginCallback);

router.get('/user', checkUserAuth, UserController.getUserInfo);

module.exports = router;
