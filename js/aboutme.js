$(document).ready( function () {

  $("#Card").addClass('turnOver');

  $('.previous').click( function() {
    $(this).removeClass('slid-down').delay(100).queue(function() {
      $(this).removeClass('show')
    });
    $('#Card').addClass('to-left').delay(200).queue(
      function() {
        location.href = $('.previous a').attr('href')
    });

    return false;
  });

  setTimeout( function() {
    $(".previous").addClass('show slid-down');
  }, 200);

  s = 0;
  (function t() {
    $('.previous').css('top')
    s = setTimeout( t, 100)
  })();
  setTimeout( function() {
    clearTimeout(s);
  }, 200);


});


function bounce( elem, delay ) {
  if( isNaN( parseFloat(delay) ) )
    delay = 0;

  pos = $(elem).css('position');
  if( pos != 'absolute' && pos != 'relative' )
    pos = 'relative';


  $(elem).css({ position: pos })
}
