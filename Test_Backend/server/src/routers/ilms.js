const express = require('express');
const bodyParser = require('body-parser');

const ilmsModel = require('../model/home.js');
const courseModel = require('../model/announcelist.js');
const elearnModel = require('../model/elearn.js');
const router = express.Router();

router.use(bodyParser.json());

router.get('/login', function(req, res, next) {
    ilmsModel.getResult().then(courselist => {
        console.log(courselist);
        res.json(courselist);
    }).catch(next);
});

router.get('/course', function(req, res, next) {
    courseModel.getAnnounce().then(announce => {
        //console.log(announce);
        res.json(announce);
    }).catch(next);
});

module.exports = router;
