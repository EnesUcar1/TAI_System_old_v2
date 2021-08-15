const userModel = require('../models/userModel.js');
const accountModel = require('../models/accountModel.js');
const settingsModel = require('../models/settingsModel.js');

const account_index = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  let accounts = await accountModel.getAccounts(user.ID)
  accounts = accounts.reverse();

  let settings = await settingsModel.getSettings(user.ID);

  if(settings[0].AccountListSlice != null && settings[0].AccountListSlice != 0) {
    accounts = accounts.slice(0, settings[0].AccountListSlice)
  }

  res.render(__dirname + '/../views/home/accounts.handlebars', {
    accountsPageLeftSideClass: 'active',
    pageName: "Hesaplar",
    accounts: accounts,
    accountListSlice: settings[0].AccountListSlice,
    userData: user
  });
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

const account_edit_account_list_slice = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }

  req.body.UserID = user.ID;
  let result = await settingsModel.editAccountListSlice(req.body);
  res.redirect("/")
};

module.exports = {
  account_index,
  account_update,
  account_add,
  account_delete,
  account_edit_account_list_slice
};
