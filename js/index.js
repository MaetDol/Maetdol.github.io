// 파이어 폭스에서 뒤로가기시, JS가 작동하지 않는 문제를 해결하기 위해 사용
window.onunload = function () {};

window.onpageshow = function (e) {

  if (e.persisted)
    $('#Card').removeClass('turnOver');

  $("#AboutMe").on ("click", function () {
    $("#Card").addClass ('turnOver').delay (400).queue (function () {
      location.href = 'AboutMe.html';
    });
  });

};
