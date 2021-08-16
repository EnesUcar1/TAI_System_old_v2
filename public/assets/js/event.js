$(document).ready(async function() {
  let user = getNameAndCode($('#userName').text());
  let userData = await new Promise(async (resolve, reject) => {
    $.ajax({
      url: "https://cheese.formice.com/api/players/" + user.Name + "-" + user.Code,
      type: "get"
    }).done(function(result) {
      resolve(result)
    });
  }).then(value => {
    return value;
  });

  let eventBadges = ["0", "1", "6", "7", "9", "16", "17", "18", "28", "29", "30", "33", "34", "35", "42", "46", "47", "50", "51", "54", "55", "57", "58", "59", "64", "65", "69", "71", "73", "129", "130", "131", "132", "133", "134", "139", "142", "143", "144", "145", "147", "153", "154", "158", "161", "163", "169", "170", "174", "181", "182", "184", "188", "190", "193", "198", "202", "209", "218", "219", "221", "225", "230", "240", "249", "255", "257", "264", "267", "269", "272", "276", "281", "290", "291", "293", "297", "303", "310", "317", "324"];
  let notOwnedBadges = []
  for (var i = 0; i < eventBadges.length; i++) {
    if (!userData.badges.includes(eventBadges[i])) {
      notOwnedBadges.push(eventBadges[i])
    }
  }

  $.each(userData.badges, function(index, value) {
    $("#ownedBadges").append('<img style="margin-left: 5px" src="http://www.transformice.com/images/x_transformice/x_badges/x_' + value +'.png">')
  });

  $.each(notOwnedBadges, function(index, value) {
    $("#notOwnedBadges").append('<img style="margin-left: 5px" src="http://www.transformice.com/images/x_transformice/x_badges/x_' + value +'.png">')
  });
});

function getNameAndCode(str) {
  var data = {
    "Name": str.split('#')[0],
    "Code": str.split('#')[1]
  }
  return data;
}
