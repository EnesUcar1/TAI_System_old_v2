$(document).ready(function() {
  let cheeseElement = $(".badge")
  $.each(cheeseElement, function(key, value) {
    let cheese = $(value).html();
    if (cheese == 200)
      $(value).addClass("bg-gradient-success");
    else if (cheese >= 100)
      $(value).addClass("bg-gradient-info");
    else
      $(value).addClass("bg-gradient-secondary");
  });
});

$(document).on("click", ".button-edit", function(e) {
  let userID = $(this).data("userId");
  let userName = $(this).data("userName");
  let userEmail = $(this).data("userEmail");
  let userCheese = $(this).data("userCheese");

  $(".modal-title").html(userName);
  $('#userID').val(userID);
  $('#userName').val(userName);
  $('#userEmail').val(userEmail);
  $('#userCheese').val(userCheese); // .val kullan yukarıda
});

$(document).on("click", ".submit-button-edit", function(e) {
  let userID = $("#userID").val();
  let userName = $("#userName").val();
  let userEmail = $("#userEmail").val();
  let userCheese = $("#userCheese").val();

  let accountData = {
    "ID": userID,
    "Name": userName,
    "Email": userEmail,
    "Cheese": userCheese
  }

  $.ajax({
    url: "/accounts/edit-account",
    type: "post",
    data: accountData
  }).done(function(result) {
    document.getElementById("modal-user-edit-close").click();
  });
});
