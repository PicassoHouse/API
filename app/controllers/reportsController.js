'use strict';

const LightHistory = require("../models/lightHistory");
const AccessHistory = require("../models/accessHistory");

//Get AccessHistory - List Access History
//========================================
exports.listAccessHistory = (req,res) => {
    AccessHistory.find({})
        .sort('-date')
        .populate({
            path : 'user',
            select: 'username displayName -_id'
        })
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
exports.listMonthtLightReports = (req,res) => {

    let reports = [
        { label: 'Dezembro', value : 27 },
        { label: 'Janeiro', value : 29 },
        { label: 'Fevereiro', value : 33 },
        { label: 'Março', value : 30 },
        { label: 'Abril', value : 28 },
        { label: 'Maio', value : 31 }
    ];

    res.json(reports)
};

//Get month reports - report from lasted 6 months
//========================================
exports.getCurrentMonthLightInfo = (req,res) => {
    //TODO: get info from req.param.month

    let monthReport = {
        hoursOn : 356,
        hoursOff : 158
    };

    res.json(monthReport)
};
