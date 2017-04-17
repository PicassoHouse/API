'use strict';

const LightHistory = require("../models/lightHistory");
const AccessHistory = require("../models/accessHistory");

//Get AccessHistory - List Access History
//========================================
exports.listAccessHistory = (req,res) => {
    AccessHistory.find({})
        .then(docs => res.json(docs))
        .catch(err => res.sendStatus(400));
};


//Get LightHistory - List light history
//========================================
exports.listLightHistory = (req,res) => {
    LightHistory.find({})
        .then(docs => res.json(docs))
        .catch(err => res.sendStatus(400));
};


//Get month reports - report from lasted 6 months
//========================================
exports.listMonthReports = (req,res) => {
    //TODO: list lasted 6 months data to put in the chart
    res.json([])
};

//Get month reports - report from lasted 6 months
//========================================
exports.getMonthReports = (req,res) => {
    //TODO: get info from req.param.month
    res.json([])
};
