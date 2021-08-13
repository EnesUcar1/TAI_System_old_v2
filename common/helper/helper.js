function setAccountsDateTime(accounts) {
  return new Promise(async (resolve, reject) => {
    let i = 0;
    await accounts.forEach((account) => {
      accounts[i].Date = account.Created.toString().split(' ')[0];
      accounts[i].Time = account.Created.toString().split(' ')[1];
      ++i;
    });
    resolve(accounts)
  }).then(value => { return value; });
}

module.exports = {
  setAccountsDateTime
};
