const userModel = require('../models/userModel.js');
const settingsModel = require('../models/settingsModel.js');

const events_index = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }

  let settings = await settingsModel.getSettings(user.ID);
  res.render(__dirname + '/../views/home/events.handlebars', {eventsLeftSideClass: 'active',  accountListSlice: settings[0].AccountListSlice, pageName: "Etkinlikler", userData: user});
};

module.exports = {
  events_index
};
