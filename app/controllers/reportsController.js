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

    let reports = [
        { label: 'dec', value : 27 },
        { label: 'jan', value : 29 },
        { label: 'feb', value : 33 },
        { label: 'mar', value : 30 },
        { label: 'apr', value : 28 },
        { label: 'may', value : 31 }
    ];

    res.json(reports)
};

//Get month reports - report from lasted 6 months
//========================================
exports.getMonthReports = (req,res) => {
    //TODO: get info from req.param.month

    let monthReport = {
        hoursOn : 256,
        hoursOff : 128
    };

    res.json(monthReport)
};
