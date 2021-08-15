const userModel = require('../models/userModel.js');
const furModel = require('../models/furModel.js');
const settingsModel = require('../models/settingsModel.js');

const fur_index = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  let furs = await furModel.getFurs(user.ID);
  let fursCheeseSum = await furModel.getSumFurCheese(user.ID);
  fursCheeseSum = fursCheeseSum[0]['Sum(Cheese)'];

  let settings = await settingsModel.getSettings(user.ID);
  res.render(__dirname + '/../views/home/furs.handlebars', {fursLeftSideClass: 'active', accountListSlice: settings[0].AccountListSlice, furs: furs, pageName: "Kürkler", fursCheeseSum: fursCheeseSum, userData: user});
};

const fur_addFur = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  req.body.UserID = user.ID;
  await furModel.addFur(req.body);
  res.redirect("/furs");
};

const fur_deleteFur = async (req, res) => {
  await furModel.deleteFur(req.body.ID);
  res.end();
};

module.exports = {
  fur_index,
  fur_addFur,
  fur_deleteFur
};
