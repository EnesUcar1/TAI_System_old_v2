const userModel = require('../models/userModel.js');
const settingsModel = require('../models/settingsModel.js');

const home_index = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }

  let settings = await settingsModel.getSettings(user.ID);
  res.render(__dirname + '/../views/home/home-page.handlebars', {homePageLeftSideClass: 'active',  accountListSlice: settings[0].AccountListSlice, pageName:"Ana Sayfa", userData: user});
};

module.exports = {
  home_index
};
