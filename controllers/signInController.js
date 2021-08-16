const userModel = require('../models/userModel.js');

const signIn_index = (req, res) => {
  res.render(__dirname + '/../views/home/sign-in.handlebars', {layout: false});
};

const signIn_sign = async (req, res) => {
  var result = await userModel.loginUser(req, res, req.body);

  if(result)
    res.redirect('/')
  else
    res.render(__dirname + '/../views/home/sign-in.handlebars', {wrongForm: true, layout: false});
};

module.exports = {
  signIn_index,
  signIn_sign
};
