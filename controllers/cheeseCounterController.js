const userModel = require('../models/userModel.js');
const accountModel = require('../models/accountModel.js');
const furModel = require('../models/furModel.js');
const cheeseCounterModel = require('../models/cheeseCounterModel.js');

const cheeseCounter_index = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  var counters = await cheeseCounterModel.getCounter(user.ID);
  if (counters.length > 0) {
    var i = 0;
    let furs = await furModel.getFurs(user.ID);
    let fursCheeseSum = await furModel.getSumFurCheese(user.ID);
    fursCheeseSum = fursCheeseSum[0]['Sum(Cheese)'];

    for (let i = 0; i < counters.length; i++) {
      var startingDate = counters[i].StartingDate.replace(".", "/").replace(".", "/").split("/");
      startingDate = new Date(+startingDate[2], startingDate[1] - 1, +startingDate[0]);

      var date1 = new Date(startingDate);
      var date2 = new Date();
      var diffTime = Math.abs(date2 - date1);
      var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      counters[i].AccountsSumCheese = await accountModel.getAccountSumCheese(user.ID);
      counters[i].TotalCheese = (counters[i].MarketCheese - counters[i].StartingCheese + counters[i].AccountsSumCheese + counters[i].SpentCheese);
      counters[i].AverageCheese = Math.round(counters[i].TotalCheese / diffDays * 100) / 100;
      counters[i].EstimatedCheese = (counters[i].MarketCheese + counters[i].AccountsSumCheese);
      counters[i].TargetCheesePercentage = Math.round((counters[i].TotalCheese / counters[i].TargetCheese * 100) * 100) / 100;
      counters[i].FullCheeseCount = await accountModel.getFullCheeseAccountCount(user.ID);
      counters[i].fursCheeseRemainder = (fursCheeseSum - counters[i].EstimatedCheese < 0) ? ("+" + Math.abs(fursCheeseSum - counters[i].TotalCheese)) : (fursCheeseSum - counters[i].EstimatedCheese);
    }
  }

  res.render(__dirname + '/../views/home/cheese-counter.handlebars', {
    cheeseCounterLeftSideClass: 'active',
    pageName: "Peynir Sayacı",
    cheeseCounters: counters.reverse(),
    userData: user
  });
};

const cheeseCounter_add = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  req.body.UserID = user.ID;
  var result = await cheeseCounterModel.addCounter(req.body);
  res.redirect("/cheese-counter")
};

const cheeseCounter_edit = async (req, res) => {
  let result = await cheeseCounterModel.updateCounter(req.body);
  res.redirect("/cheese-counter")
};

const cheeseCounter_delete = async (req, res) => {
  let result = await cheeseCounterModel.deleteCounter(req.body.ID);
  res.redirect("/cheese-counter")
};

module.exports = {
  cheeseCounter_index,
  cheeseCounter_add,
  cheeseCounter_edit,
  cheeseCounter_delete
};
