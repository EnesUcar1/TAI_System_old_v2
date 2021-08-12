const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', signUpController.signUp_index);
router.post('/', urlencodedParser, signUpController.signUp_sign);

module.exports = router;
