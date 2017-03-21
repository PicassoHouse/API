'use strict';

const passport = require('passport');
const express = require('express');
const router = express.Router();


const AuthController = require('./controllers/authController');
passport.use(AuthController.AuthStrategy);

// Auth Endpoints
//================================================
router.post('/auth', AuthController.login);

// Authentication methods required
//================================================
router.use(passport.authenticate('bearer', { session: false }));

// Usuarios
//================================================
let UserController = require('./controllers/userController.js');
router.get('/user', UserController.list);
router.get('/user/:id', UserController.get);
router.post('/user', UserController.add);
router.delete('/user/:id', UserController.remove);

module.exports = router;