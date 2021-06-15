const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkUserAuth = require('../policies/checkUserAuth');
const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');

router.post('/auth/login', AuthController.login);
router.post('/auth/signup', AuthController.signup);

router.get('/user', checkUserAuth, UserController.getUserInfo);

module.exports = router;
