const userModel = require('../models/userModel.js');
const accountModel = require('../models/accountModel.js');
const cheeseCounterModel = require('../models/cheeseCounterModel.js');

const cheeseCounter_index = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  let counters = await cheeseCounterModel.getCounter(user.ID);
  if (counters.length > 0) {
    let startingDate = counters[0].StartingDate.replace(".","/").replace(".", "/").split("/");
    startingDate = new Date(+startingDate[2], startingDate[1] - 1, +startingDate[0]);

    const date1 = new Date(startingDate);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    counters[0].AccountsSumCheese = await accountModel.getAccountSumCheese(user.ID);
    counters[0].TotalCheese = (counters[0].MarketCheese - counters[0].StartingCheese + counters[0].AccountsSumCheese + counters[0].SpentCheese);
    counters[0].AverageCheese = Math.round(counters[0].TotalCheese / diffDays * 100) / 100;
    counters[0].EstimatedCheese = (counters[0].MarketCheese + counters[0].AccountsSumCheese);
    counters[0].TargetCheesePercentage = Math.round((counters[0].TotalCheese / counters[0].TargetCheese * 100) * 100) / 100;
  }
  res.render(__dirname + '/../views/home/cheese-counter.handlebars', {cheeseCounterLeftSideClass: 'active', cheeseCounters: counters, userData: user});
};

const cheeseCounter_add = async (req, res) => {
  let user = await userModel.currentUser(req.cookies.userToken);
  if (Array.isArray(user)) {
    user = user[0]
  }
  req.body.UserID = user.ID;
  var result = await cheeseCounterModel.addCounter(req.body);
  console.log(result)
};

module.exports = {
  cheeseCounter_index,
  cheeseCounter_add
};
