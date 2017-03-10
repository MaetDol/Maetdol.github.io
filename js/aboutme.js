$(document).ready (function () {
  $("#Card").addClass ('turnOver');

  $("#Email .svg").hover (function () {
    $(this).siblings (".description").stop ().fadeTo (200, 1);
    $(this).siblings (".arrow").stop ().fadeTo (200, 1);
  }, function () {
    $(this).siblings (".description").stop ().fadeTo (100, 0);
    $(this).siblings (".arrow").stop ().fadeTo (100, 0);
  });

  $("#Github .svg").hover (function () {
    $(this).parents ().siblings (".description").stop ().fadeTo (200, 1);
    $(this).parents ().siblings (".arrow").stop ().fadeTo (200, 1);
  }, function () {
    $(this).parents ().siblings (".description").stop ().fadeTo (100, 0);
    $(this).parents ().siblings (".arrow").stop ().fadeTo (100, 0);
  });
});
