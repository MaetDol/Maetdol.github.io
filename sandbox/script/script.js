window.onpageshow = function() {

  let scrollTop = selector( '.scroll-top' )
  scrollTop.addEventListener( 'click', function() {
    window.scrollTo(0, 0)
  })

  mdWrapper = selector('.markdown')
  let htmlContent= parseMarkdown( mdWrapper.textContent )
  mdWrapper.innerHTML = htmlContent
}



function selector(s) {
  let e = document.querySelectorAll(s)
  return e.length > 1 ? e : e[0]
}

function each( e, f ) {
  for( let i=0; i < e.length; i++ ) {
    f(e[i], i)
  }
}
