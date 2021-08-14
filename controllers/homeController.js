const userModel = require('../models/userModel.js');

const home_index = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  res.render(__dirname + '/../views/home/home-page.handlebars', {homePageLeftSideClass: 'active', pageName:"Ana Sayfa", userData: user});
};

module.exports = {
  home_index
};
