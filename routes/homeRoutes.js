const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userModel = require('../models/userModel.js');

router.get('/', userModel.isLogin, homeController.home_index);

module.exports = router;
