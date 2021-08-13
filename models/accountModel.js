const sqlite3 = require('sqlite3').verbose();
const userModel = require('./userModel.js');
const helper = require('../common/helper/helper.js');


let db = new sqlite3.Database('./db/tais.db');

function getAccounts(userID) {
  return new Promise((resolve, reject) => {
    db.all('Select * From Accounts Where UserID =' + userID + ' And Deleted = 0', (err, row) => { return resolve(row); });
  }).then(async (value) => { let data = await helper.setAccountsDateTime(value); return data; });
}

function updateAccount(account) {
  let id = account.ID;
  let name = account.Name;
  let email = account.Email
  let cheese = account.Cheese;

  return new Promise((resolve, reject) => {
    db.run("Update Accounts Set Name = '" + name + "' ,Email = '" + email + "' ,Cheese = '" + cheese + "' Where ID = '" + id + "'", (err, row) => { return resolve(); });
  }).then(value => { return true; });
}

module.exports = {
  getAccounts,
  updateAccount
};
