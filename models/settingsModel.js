const sqlite3 = require('sqlite3').verbose();
const userModel = require('./userModel.js');
const helper = require('../common/helper/helper.js');

let db = new sqlite3.Database('./db/tais.db');

function getSettings(userID) {
  return new Promise((resolve, reject) => {
    db.all('Select * From Settings Where UserID ="' + userID + '" And Deleted = "0"', (err, row) => { return resolve(row); });
  }).then(async (value) => { return value; });
}

function editAccountListSlice(account) {
  let userID = account.UserID;
  let slice = account.AccountListSlice;

  return new Promise((resolve, reject) => {
    db.run("Update Settings Set AccountListSlice = '" + slice + "' Where UserID = '" + userID + "'", (err, row) => {
      return resolve();
    });
  }).then(value => {
    return true;
  });
}
module.exports = {
  getSettings,
  editAccountListSlice
};
