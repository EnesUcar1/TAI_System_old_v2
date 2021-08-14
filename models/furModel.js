const sqlite3 = require('sqlite3').verbose();
const userModel = require('./userModel.js');
const helper = require('../common/helper/helper.js');

let db = new sqlite3.Database('./db/tais.db');

function getFurs(userID) {
  return new Promise((resolve, reject) => {
    db.all('Select * From Furs Where UserID ="' + userID + '" And Deleted = "0" Order By Priority DESC, Cheese DESC', (err, row) => { return resolve(row); });
  }).then(async (value) => { return value; });
}

function getSumFurCheese(userID) {
  return new Promise((resolve, reject) => {
    db.all('Select Sum(Cheese) From Furs Where UserID ="' + userID + '" And Deleted = "0"', (err, row) => { return resolve(row); });
  }).then(async (value) => { return value; });
}

function addFur(fur) {
  let created = new Date().toLocaleString();
  let userID = fur.UserID;
  let name = fur.Name;
  let link = fur.Link;
  let cheese = fur.Cheese;
  let priority = fur.Priority;
  let deleted = 0;

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO Furs (Created, UserID, Name, Link, Cheese, Priority, Deleted) VALUES ('" + created + "', '" + userID + "', '" +  name + "', '" + link + "', '" + cheese + "', '" + priority + "', '" + deleted + "');", (err, row) => { return resolve(err); });
  }).then(value => { return true; });
}

module.exports = {
  getFurs,
  addFur,
  getSumFurCheese
};
