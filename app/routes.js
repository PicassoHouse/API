'use strict';

const passport = require('passport');
const express = require('express');
const router = express.Router();

const AuthController = require('./controllers/authController');
const UserController = require('./controllers/userController');
const ReportsController = require('./controllers/reportsController');
const RoomController = require('./controllers/roomController');
const HouseController = require('./controllers/houseBridgeController');

// Only support can use this endpoint
// For use this method, should be request sending req.body.auth 
//=======================================
router.post('/users/master', (req, res, next) => {
	if(req.body.auth_code == global.configs.MASTER_AUTH_CODE){
		req.user = {
			isMasterUser : true,
			auth_code : req.params.auth_code,
			role : 'admin'
		};
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


// Reports
//================================================
router.get('/reports/accesshistory', ReportsController.listAccessHistory);
router.get('/reports/lightshistory', ReportsController.listLightHistory);
router.get('/reports/monthlighthistory', ReportsController.listMonthtLightReports);
router.get('/reports/currentmonthlightinfo', ReportsController.getCurrentMonthLightInfo);


// Rooms
//================================================
router.get('/rooms', RoomController.listRooms);

// House Bridge
//================================================
router.get('/house', HouseController.getHouseInfo);
router.post('/house/turnlighton', HouseController.turnLightOn);
router.post('/house/openGarage', HouseController.openGarage);
router.post('/house/openWindows', HouseController.openWindows);
router.post('/house/lockHouse', HouseController.lockHouse);


module.exports = router;