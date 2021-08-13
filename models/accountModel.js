const sqlite3 = require('sqlite3').verbose();
const userModel = require('./userModel.js');
const helper = require('../common/helper/helper.js');


let db = new sqlite3.Database('./db/tais.db');

function getAccounts(userID) {
  return new Promise((resolve, reject) => {
    db.all('Select * From Accounts Where UserID =' + userID + ' And Deleted = 0', (err, row) => {
      return resolve(row);
    });
  }).then(async (value) => {
    let data = await helper.setAccountsDateTime(value);
    return data;
  });
}

async function getAccountSumCheese(userID) {
  let accounts = await getAccounts(userID);
  let totalCheese = 0;

  return new Promise(async (resolve, reject) => {
    let totalCheese = 0;
    await accounts.forEach((account) => {
      totalCheese += account.Cheese;
    });
    resolve(totalCheese)
  }).then(value => {
    return value;
  });
}

function getAccountByNameAndUserID(name, userID) {
  return new Promise((resolve, reject) => {
    db.all('Select * From Accounts Where Name ="' + name + '" And UserID = "' + userID + '" And Deleted = 0', (err, row) => {
      return resolve(row);
    });
  }).then(async (value) => {
    data = await helper.setAccountsDateTime(value);
    return data;
  });
}

function addAccount(account) {
  let created = new Date().toLocaleString();
  let userID = account.UserID;
  let name = account.Name;
  let email = account.Email;
  let cheese = account.Cheese;
  let deleted = 0;

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO Accounts (Created, UserID, Name, Email, Cheese, Deleted) VALUES ('" + created + "', '" + userID + "', '" + name + "', '" + email + "', '" + cheese + "', '" + deleted + "');", (err, row) => {
      return resolve();
    });
  }).then(async (value) => {
    return await getAccountByNameAndUserID(name, userID);
  });
}

function updateAccount(account) {
  let id = account.ID;
  let name = account.Name;
  let email = account.Email
  let cheese = account.Cheese;

  return new Promise((resolve, reject) => {
    db.run("Update Accounts Set Name = '" + name + "' ,Email = '" + email + "' ,Cheese = '" + cheese + "' Where ID = '" + id + "'", (err, row) => {
      return resolve();
    });
  }).then(value => {
    return true;
  });
}

function deleteAccount(accountID) {
  let deleted = 1;
  return new Promise((resolve, reject) => {
    db.run("Update Accounts Set Deleted = '" + deleted + "' Where ID = '" + accountID + "'", (err, row) => {
      return resolve();
    });
  }).then(value => {
    return true;
  });
}

module.exports = {
  getAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
  getAccountSumCheese
};
