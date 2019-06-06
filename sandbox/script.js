window.onpageshow = function() {

  let scrollTop = selector( '.scroll-top' )
  scrollTop.addEventListener( 'click', function() {
    window.scrollTo(0, 0)
  })
}

function selector(s) {
  let e = document.querySelectorAll(s)
  return e.length > 1 ? e : e[0]
}
