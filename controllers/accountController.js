const userModel = require('../models/userModel.js');
const accountModel = require('../models/accountModel.js');

const account_index = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  let accounts = await accountModel.getAccounts(user.ID);
  res.render(__dirname + '/../views/home/accounts.handlebars', {accountsPageLeftSideClass: 'active', accounts: accounts, userData: user});
};

const account_add = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  req.body.UserID = user.ID;
  let result = await accountModel.addAccount(req.body);
  return res.send(result).end();
};

const account_update = async (req, res) => {
  let result = await accountModel.updateAccount(req.body);
  return res.send(result).end();
};

const account_delete = async (req, res) => {
  let result = await accountModel.deleteAccount(req.body.ID);
  return res.send(result).end();
};

module.exports = {
  account_index,
  account_update,
  account_add,
  account_delete
};
