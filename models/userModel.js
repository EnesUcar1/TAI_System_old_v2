const cache = require('memory-cache');
const crypto = require('crypto');
const md5 = require('md5');
const settingsModel = require('./settingsModel.js');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/tais.db');

async function loginUser(req, res, data) {
  let name = data.Name;
  let pass = createHash(data.Password);

  return new Promise(async (resolve, reject) => {
    db.all('Select * From Users Where Name = "' + name + '" And Password = "' + pass + '"', (err, row) => {
      return resolve(row);
    });
  }).then(async (value) => {
    if (value[0]) {
      let user = value[0];
      let token = createToken();
      return new Promise((resolve, reject) => {
        db.run("Update Users Set Token = '" + token + "' Where Name = '" + name + "'", (err, row) => {
          return resolve();
        });
      }).then(async (value) => {
        user.Token = token;
        await res.cookie('userToken', token);
        await cache.put('user_' + token, user);

        return true;
      });
    } else {
      return false;
    }
  });
}

async function registerUser(data) {
  var dataUser = await getByName(data.Name);
  if (dataUser.length == 0) {
    let created = new Date().toLocaleString();
    let name = data.Name;
    let pass = createHash(data.Password);
    let deleted = 0;

    if (name == "" || name == null || name == undefined) {
      return {
        "Status": true,
        "Message": "Kullanıcı adı giriniz."
      }
    } else if (data.Password == "" || data.Password == null || data.Password == undefined) {
      return {
        "Status": true,
        "Message": "Şifre giriniz."
      }
    } else {
      return new Promise((resolve, reject) => {
        db.run("INSERT INTO Users (Created, Name, Password, Deleted) VALUES ('" + created + "', '" + name + "', '" + pass + "', '" + deleted + "');", (err, row) => {
          return resolve(row);
        });
      }).then(async (value) => {
        let created = new Date().toLocaleString();
        let deleted = 0;
        let user = await getByName(name);
        await new Promise((resolve, reject) => {
          db.run("INSERT INTO Settings (Created, UserID, Deleted) VALUES ('" + created + "', '" + user[0].ID + "', '" + deleted + "');", (err, row) => {
            return resolve();
          });
        }).then(async (value) => {
          return true;
        });
        return {
          "Status": true,
          "Message": "Başarıyla kayıt oldunuz."
        };
      });
    }
  }
  else {
    return {
      "Status": true,
      "Message": "Kullanıcı adı zaten mevcut."
    };
  }
}

function isLogin(req, res, next) {
  if (req.cookies.userToken != null) {
    next();
  } else {
    res.redirect("/sign-in");
  }
}

async function currentUser(userToken) {
  if (!(cache.get('user_' + userToken))) {
    let user = await getByToken(userToken);
    await cache.put('user_' + userToken, user);
  }

  return await cache.get('user_' + userToken)
}

async function getByToken(userToken) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From Users Where Token = "' + userToken + '"', (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return value;
  });
}

async function getByName(name) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From Users Where Name = "' + name + '"', (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return value;
  });
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
  registerUser,
  getByName
};
