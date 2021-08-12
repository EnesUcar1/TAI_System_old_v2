const userModel = require('../models/userModel.js');


const signUp_index = (req, res) => {
  res.render(__dirname + '/../views/home/sign-up.handlebars', {layout: false});
};

const signUp_sign = async (req, res) => {
  var data = await userModel.registerUser(req.body);
  res.render(__dirname + '/../views/home/sign-up.handlebars', {layout: false});
};

module.exports = {
  signUp_index,
  signUp_sign
};
