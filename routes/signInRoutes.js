const express = require('express');
const router = express.Router();
const signInController = require('../controllers/signInController');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', signInController.signIn_index);
router.post('/', urlencodedParser, signInController.signIn_sign);

module.exports = router;
