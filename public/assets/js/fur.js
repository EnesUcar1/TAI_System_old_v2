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
});

function getNameAndCode(str) {
  var data = {
    "Name": str.split('#')[0],
    "Code": str.split('#')[1]
  }
  return data;
}

function deleteFur(furID, furCheese) {
  $.ajax({
    url: "/furs/delete-fur",
    type: "post",
    data: {
      "ID": furID
    }
  }).done(function(result) {
    $(".fur-" + furID).remove();
    let fursCheese = $("#totalCheese").html();
    $("#totalCheese").html(fursCheese - furCheese)
  });
}
