$(document).ready(async function() {
  let user = getNameAndCode($('#userName').text());

  let userData = await new Promise(async (resolve, reject) => {
    var data = await getUserPosition(user)
    resolve(data);
  }).then(value => {
    return value;
  });

  if(userData.Position != null)
    $('#sequence').text(userData.Position)
  else {
    $('#sequence').text("1000000")
  }
console.log(userData)
  $('#rounds').text(userData.stats.mouse.rounds)
  $('#cheese').text(userData.stats.mouse.cheese)
  $('#first').text(userData.stats.mouse.first)

});

function getNameAndCode(str) {
  var data = {
    "Name": str.split('#')[0],
    "Code": str.split('#')[1]
  }
  return data;
}

function getUserPosition(user) {
  return new Promise(async (resolve, reject) => {
    $.ajax({
      url: "https://cheese.formice.com/api/players/" + user.Name + "-" + user.Code,
      type: "get"
    }).done(function(result) {
      resolve(result)
    });
  }).then(value => {
    return value;
  });
}
