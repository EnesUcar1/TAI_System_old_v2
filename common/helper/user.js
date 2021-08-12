const cache = require('memory-cache');
const crypto = require('crypto');
const md5 = require('md5');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/tais.db');

async function loginUser(req, res, data) {
  let name = data.Name;
  let pass = createHash(data.Password);

  return new Promise((resolve, reject) => {
    db.all('Select * From Users Where Name = "' + name + '" And Password = "' + pass + '"', (err, row) => {return resolve(row); });
  }).then(value =>
    {
      if(value[0]) {
        let user = value[0];
        let token = createToken();
        return new Promise((resolve, reject) => {
          db.run("Update Users Set Token = '" + token + "' Where Name = '" + name + "'", (err, row) => { return resolve(); });
        }).then(value =>  {
          user.Token = token;
          res.cookie('userToken', token);
          cache.put('user_' + token, user);

          return true;
        });
      }
      else {
        return false;
      }
    });
}

function registerUser(data) {
  let created = new Date().toLocaleString();
  let name = data.Name;
  let pass = createHash(data.Password);
  let deleted = 0;

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO Users (Created, Name, Password, Deleted) VALUES ('" + created + "', '" + name + "', '" + pass + "', '" + deleted + "');", (err, row) => { return resolve(row); });
  }).then(value => {(value) ? true : false;  });
}

function isLogin(req, res, next) {
  if (req.cookies.userToken != null) {
    next();
  }
  else {
    res.redirect("/sign-in");
  }
}

async function currentUser(userToken) {

  if(!(cache.get('user_' + userToken))) {
    console.log("girdi")
    let user = await getByToken(userToken);
    cache.put('user_' + userToken, user);
  }

  return cache.get('user_' + userToken)
}

async function getByToken(userToken) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From Users Where Token = "' + userToken + '"', (err, row) => {return resolve(row); });
  }).then(value => { return value; });
}

function createToken() {
  return crypto.randomBytes(64).toString('hex');
}

function createHash(text) {
  return md5(text)
}

module.exports = {
  isLogin,
  currentUser,
  loginUser,
  registerUser
};
