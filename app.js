var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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
// MongoConnector({
// 	host		: "localhost", 
// 	port		: "27017",
// 	dbname 		: "picasso_db", 
// 	username	: "", 
// 	password	: ""
// });


//Initialize routes
//==============================
Bootstrap(app);

module.exports = app;
