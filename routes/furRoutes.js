const express = require('express');
const router = express.Router();
const furController = require('../controllers/furController');
const userModel = require('../models/userModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', userModel.isLogin, furController.fur_index);
router.post('/add-fur', [userModel.isLogin, urlencodedParser], furController.fur_addFur);

module.exports = router;
