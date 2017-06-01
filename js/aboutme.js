function appear (ele) {
  ele.stop ().show ().fadeTo (200, 1);
}

function disappear (ele) {
  ele.stop ().fadeTo (150, 0).hide();
}

$(document).ready (function () {
  $("#Card").addClass ('turnOver');

  $("#Email .svg").hover (function () {
    appear ($(this).siblings (".tooltipBubble"));
    appear ($(this).siblings (".tooltipArrow"));
  }, function () {
    disappear ($(this).siblings (".tooltipBubble"));
    disappear ($(this).siblings (".tooltipArrow"));
  });

  $("#Github .svg").hover (function () {
    appear ($(this).parents ().siblings (".tooltipBubble"));
    appear ($(this).parents ().siblings (".tooltipArrow"));
  }, function () {
    disappear ($(this).parents ().siblings (".tooltipBubble"));
    disappear ($(this).parents ().siblings (".tooltipArrow"));
  });

  $('#Email .svg').on ('click', function (e) {
    $('.copied').remove ();

    var content = $(this).next ();
    var range   = document.createRange ();
    range.selectNode (content[0]);
    window.getSelection ().addRange (range);

    var successful = document.execCommand ('copy');

    $('.tooltipBubble.copyEmail').after (
      '<span class="copied">복사완료!</span>',
      '<div  class="copied"></div>');
    $('.copied').fadeTo (200, 1).delay (1000).fadeTo (200, 0).queue (
      function () { $(this).remove(); });

    window.getSelection ().removeAllRanges ();
  });

});
