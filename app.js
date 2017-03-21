const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

global.configs = require('./configs.json');

const MongoConnector = require('./mongoConnector');
const Bootstrap = require('./app/bootstrap');

var app = express();

//App Setup
//==============================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Connect to database
//==============================
MongoConnector({
	host		: "localhost",
	port		: "27017",
	dbname 		: "picasso_db",
	username	: "",
	password	: ""
});


//Initialize routes
//==============================
Bootstrap(app);

module.exports = app;
