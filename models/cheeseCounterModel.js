const sqlite3 = require('sqlite3').verbose();
const userModel = require('./userModel.js');
const helper = require('../common/helper/helper.js');

let db = new sqlite3.Database('./db/tais.db');

function getCounter(userID) {
  return new Promise((resolve, reject) => {
    db.all('Select * From CheeseCounter Where UserID ="' + userID + '" And Deleted = "0"', (err, row) => { return resolve(row); });
  }).then(async (value) => { let data = await helper.setAccountsDateTime(value); return data; });
}

function addCounter(counter) {
  let created = new Date().toLocaleString();
  let userID = counter.UserID;
  let name = counter.Name;
  let startingDate = counter.StartingDate;
  let startingCheese = counter.StartingCheese;
  let marketCheese = counter.MarketCheese;
  let spentCheese = counter.SpentCheese;
  let targetCheese = counter.TargetCheese;
  let deleted = 0;

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO CheeseCounter (Created, UserID, Name, StartingDate, StartingCheese, MarketCheese, SpentCheese, TargetCheese, Deleted) VALUES ('" + created + "', '" + userID + "', '" +  name + "', '" + startingDate + "', '" + startingCheese + "', '" + marketCheese + "', '" + spentCheese +  "', '" + targetCheese + "', '" + deleted + "');", (err, row) => { return resolve(err); });
  }).then(value => { return true; });
}

module.exports = {
  getCounter,
  addCounter
};
