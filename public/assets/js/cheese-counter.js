$(document).on("click", ".button-edit", function(e) {
  let counterID = $(this).data("id");
  let name = $(this).data("name");
  let startingDate = $(this).data("startingdate");
  let startingCheese = $(this).data("startingcheese");
  let marketCheese = $(this).data("marketcheese");
  let spentCheese = $(this).data("spentcheese");
  let targetCheese = $(this).data("targetcheese");

  $(".modal-title-edit").html("Sayaç Düzenle - " + name);
  $('#counterID-edit').val(counterID);
  $('#counterName-edit').val(name);
  $('#counterStartingDate-edit').val(startingDate);
  $('#counterStartingCheese-edit').val(startingCheese);
  $('#counterMarketCheese-edit').val(marketCheese);
  $('#counterSpentCheese-edit').val(spentCheese);
  $('#counterTargetCheese-edit').val(targetCheese);
});
