const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const userModel = require('../models/userModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());


router.get('/', userModel.isLogin, accountController.account_index);
router.post('/edit-account', [userModel.isLogin, urlencodedParser], accountController.account_update);

module.exports = router;
