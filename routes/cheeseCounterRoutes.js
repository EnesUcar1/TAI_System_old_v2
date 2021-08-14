const express = require('express');
const router = express.Router();
const cheeseCounterController = require('../controllers/cheeseCounterController');
const userModel = require('../models/userModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', userModel.isLogin, cheeseCounterController.cheeseCounter_index);
router.post('/add-counter', [userModel.isLogin, urlencodedParser], cheeseCounterController.cheeseCounter_add);
router.post('/edit-counter', [userModel.isLogin, urlencodedParser], cheeseCounterController.cheeseCounter_edit);
router.post('/delete-counter', [userModel.isLogin, urlencodedParser], cheeseCounterController.cheeseCounter_delete);

module.exports = router;
