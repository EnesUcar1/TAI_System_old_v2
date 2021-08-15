$(document).ready(async function() {

});

function deleteFur(furID, furCheese) {
  $.ajax({
    url: "/furs/delete-fur",
    type: "post",
    data: {"ID": furID}
  }).done(function(result) {
    $(".fur-" + furID).remove();
    let fursCheese = $("#totalCheese").html();
    $("#totalCheese").html(fursCheese - furCheese)
  });
}
