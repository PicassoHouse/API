'use strict';

const passport = require('passport');
const express = require('express');
const router = express.Router();

const AuthController = require('./controllers/authController');
const UserController = require('./controllers/userController');


// Only support can use this endpoint
// For use this method, should be request sending req.body.auth 
//=======================================
router.post('/users', (req, res, next) => {
	if(req.body.auth_code == global.configs.MASTER_AUTH_CODE){
		req.user = {
			isMasterUser : true,
			auth_code : req.params.auth_code,
			role : 'admin'
		};
		next();
	} else {
		res.sendStatus(401);
	}
}, UserController.add);


passport.use(AuthController.AuthStrategy);

// Auth Endpoints
//================================================
router.post('/auth', AuthController.login);

// Authentication methods required
//================================================
router.use(passport.authenticate('bearer', { session: false }));

// Usuarios
//================================================
router.get('/users', UserController.list);
router.get('/users/:id', UserController.get);
router.post('/users', UserController.add);
router.delete('/users/:id', UserController.remove);

module.exports = router;