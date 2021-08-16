const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const userModel = require('../models/userModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', userModel.isLogin, eventController.events_index);

module.exports = router;
