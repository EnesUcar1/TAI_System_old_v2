$(document).ready(function() {
  let cheeseElement = $(".badge")
  $.each(cheeseElement, function(key, value) {
    let cheese = $(value).html();
    if (cheese >= 200)
      $(value).addClass("bg-gradient-success");
    else if (cheese >= 100)
      $(value).addClass("bg-gradient-info");
    else
      $(value).addClass("bg-gradient-secondary");
  });

  dataNothing();
});

function dataNothing() {
  console.log($(".account-data").length)
  if ($(".account-data").length == 0) {
    $("#tbody-accounts").append('<tr class="nothing-data">' +
      '<td class="">' +
      '<div class="d-flex px-2 py-1">' +
      '<div class="d-flex flex-column justify-content-center">' +
      '<h6 class="mb-0 text-sm">Kayıt bulunamadı. Eklemek için <a href="javascript:;" class="" data-bs-toggle="modal" data-bs-target="#add-account" data-toggle="tooltip" data-original-title="Add user">buraya</a> tıklayınız.</h6>' +
      '</div>' +
      '</div>' +
      '</td>' +
      '</tr>');
  } else {
    if ($(".nothing-data").length > 0) {
      $(".nothing-data").remove();
    }
  }
}

$(document).on("click", ".button-edit", function(e) {
  let userID = $(this).data("userId");
  let userName = $("tr[data-user-id-tr='" + userID + "'] td.account-data div:nth-child(2) h6").html();
  let userEmail = $("tr[data-user-id-tr='" + userID + "'] td.account-data div:nth-child(2) p").html();
  let userCheese = $("tr[data-user-id-tr='" + userID + "'] td.account-cheese-data span").html();

  $(".modal-title-edit").html(userName);
  $('#userID-edit').val(userID);
  $('#userName-edit').val(userName);
  $('#userEmail-edit').val(userEmail);
  $('#userCheese-edit').val(userCheese);
});

$(document).on("click", ".submit-button-edit", function(e) {
  let userID = $("#userID-edit").val();
  let userName = $("#userName-edit").val();
  let userEmail = $("#userEmail-edit").val();
  let userCheese = $("#userCheese-edit").val();

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
    if (result) {
      let oldCheese = $("tr[data-user-id-tr='" + userID + "'] td.account-cheese-data span").html();
      $("tr[data-user-id-tr='" + userID + "'] td.account-data div:nth-child(2) h6").html(userName);
      $("tr[data-user-id-tr='" + userID + "'] td.account-data div:nth-child(2) p").html(userEmail);
      $("tr[data-user-id-tr='" + userID + "'] td.account-cheese-data span").html(userCheese);
      $("tr[data-user-id-tr='" + userID + "'] td.account-cheese-data span").toggleClass(getCheeseClass(oldCheese) + " " + getCheeseClass(userCheese));

      function getCheeseClass(cheese) {
        if (cheese >= 200)
          return "bg-gradient-success";
        else if (cheese >= 100)
          return "bg-gradient-info";
        else
          return "bg-gradient-secondary";
      }

      document.getElementById("modal-user-edit-close").click();
    }
  });
});

$(document).on("click", ".submit-button-add", function(e) {
  let userName = $("#userName-add").val();
  let userEmail = $("#userEmail-add").val();
  let userCheese = $("#userCheese-add").val();

  let accountData = {
    "Name": userName,
    "Email": userEmail,
    "Cheese": userCheese
  }

  $.ajax({
    url: "/accounts/add-account",
    type: "post",
    data: accountData
  }).done(function(result) {
    result = result[0];
    let cheesetoggleClass = null;
    console.log(result.Cheese)
    if (result.Cheese >= 200)
      cheesetoggleClass = "bg-gradient-success";
    else if (result.Cheese >= 100)
      cheesetoggleClass = "bg-gradient-info"
    else
      cheesetoggleClass = "bg-gradient-secondary"

    $("#tbody-accounts").prepend('<tr data-user-id-tr=' + result.ID + '>' +
      '<td class="account-data">' +
      '<div class="d-flex px-2 py-1">' +
      '<div>' +
      '<img src="https://www.nicepng.com/png/detail/144-1446162_pin-businessman-clipart-png-flat-user-icon.png" class="avatar avatar-sm me-3" alt="user1">' +
      '</div>' +
      '<div class="d-flex flex-column justify-content-center">' +
      '<h6 class="mb-0 text-sm">' + result.Name + '</h6>' +
      '<p class="text-xs text-secondary mb-0">' + result.Email + '</p>' +
      '</div>' +
      '</div>' +
      '</td>' +
      '<td>' +
      '<p class="text-xs font-weight-bold mb-0">Kullanıcı</p>' +
      '<p class="text-xs text-secondary mb-0">Peynirci</p>' +
      '</td>' +
      '<td class="align-middle text-center text-sm account-cheese-data">' +
      '<span class="badge badge-sm + ' + cheesetoggleClass + '">' + result.Cheese + '</span>' +
      '</td>' +
      '<td class="align-middle text-center">' +
      '<span class="text-secondary text-xs font-weight-bold">' + result.Date + '</span>' +
      '</td>' +
      '<td class="align-middle">' +
      '<a href="javascript:;" class="button-add text-secondary font-weight-bold text-xs" data-bs-toggle="modal" data-bs-target="#add-account" data-toggle="tooltip" data-original-title="Add user">' +
      '<i class="fas fa-plus-circle" aria-hidden="true"></i>' +
      '</a>' +

      '<a href="javascript:;"style="margin-left:5%" class="button-edit text-secondary font-weight-bold text-xs" data-bs-toggle="modal" data-bs-target="#edit-account" data-toggle="tooltip" data-original-title="Edit user" data-user-id="' + result.ID + '" data-user-email="' + result.Email + '" data-user-name="' + result.Name + '" data-user-cheese="' + result.Cheese + '">' +
      ' ' +
      '<i class="fas fa-edit" aria-hidden="true"></i>' +
      '</a>' +

      '<a href="javascript:;" data-user-id="' + result.ID + '" style="margin-left:5%" class="submit-button-delete button-edit text-secondary font-weight-bold text-xs">' +
      ' ' +
      '<i class="fas fa-trash-alt"></i>' +
      '</a>' +
      '</td>' +
      '</tr>');

    dataNothing();
    document.getElementById("modal-user-add-close").click();
  });
});

$('body').delegate('.submit-button-delete', 'click', function() {
  let userID = $(this).data("userId");
  $.ajax({
    url: "/accounts/delete-account",
    type: "post",
    data: {
      "ID": userID
    }
  }).done(function(result) {
    $("tr[data-user-id-tr='" + userID + "']").remove();
    dataNothing();
  });
});

$('#userName-add').on('input', function() {
  $(".modal-title-add").html($("#userName-add").val());
});
