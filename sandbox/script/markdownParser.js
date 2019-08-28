function parseMarkdown(page) {

  let paragraphs = page.split('\n')
  let tag = {}
  tag.list = []
  tag.close = _ => {
    if( tag.list.lastItem() != undefined ) {
      return '</'+tag.list.pop()+'>'
    }
    return ''
  }
  tag.open = t => {
    if( t == tag.list.lastItem() ) {
      return ''
    }
    tag.list.push(t)
    return '<'+t+'>'
  }
  tag.isOpened = t => tag.list.includes(t)
  tag.current = _ => tag.list.lastItem()
  tag.isEmpty = _ => tag.list.length == 0

  for( let i=0; i < paragraphs.length; i++ ) {

    let p = paragraphs[i]
    let parsed = parseParagraph( p, tag )
    
    paragraphs[i] = parsed.p
  }

  while( !tag.isEmpty ) {
    paragraphs.push( tag.close() )
  }

  return paragraphs.join('\n')
}

// Implemented markdown
// \    New line(Back slash)
// =    Embed tag
// #    Heading tag
// -    list item tag
// [0-9]  list item tag
// (),[]  anchor tag
function parseParagraph(p, tag) {
  p = p.trim()
  if( p == '' ) {
    return { p: tag.close(), tag: tag }
  }

  let brCount = p.match(/\\+$/)
  if( brCount != null ) {
    brCount = brCount[0].length
    p = p.slice(0, -brCount) + '<br>'.repeat(brCount)
  }

  switch( p[0] ) {
    case '=':
    p = tag.close() + 
        '<div class="embed-wrapper">' +
          '<embed type="text/html" src="/embed/' + p.slice(1) + 'index.html"></embed>' +
        '</div>'
    return { p:p, tag: tag }

    case '#':
    let nth = p.match(/^#+/)[0].length
    p = tag.close() + '<h'+nth+'>' + p.slice(nth).trim() + '</h'+nth+'>'
    break

    case '-':
    p = wrapListItem('ul', p, tag)
    break

    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7': case '8': case '9':
    p = wrapListItem('ol', p, tag)
    break

    default:
    if( !tag.isOpened('p') ) {
      p = tag.close() + tag.open('p') + p
    }
  }

  p = parseAnchor(p, tag)
  p = p.replace(/\\/gm, '')
  return { p:p, tag: tag }
}

function parseAnchor(p, tag) {
  const ANCHOR_REGEX = /(\[((\\[\[\]])|[^\[\]])*[^\\]\])|(\([^\(\)]*[^\\]\))/g
  let anchors = p.match( ANCHOR_REGEX )
  while( anchors != null && anchors.length != 0 ) {
    let link = anchors.shift()
    let text = link
    let originText = link

    if( link[0] == '[' ) {
      link = anchors.shift()
      originText = text + link
    }
    let aTag = wrapAnchor(link, text)
    p = p.replace( originText, aTag )
  }
  return p
}

function wrapListItem(listType, p, tag) {
  let otherType = listType == 'ol' ? 'ul' : 'ol'
  let prevTags = ''
  if( !tag.isOpened( otherType ) || tag.isOpened(listType) ) {
    prevTags = tag.close()
  }

  let isOpenedOtherList = tag.isOpened(listType) && 
      (tag.current() == otherType)
  if( isOpenedOtherList ) {
    prevTags += tag.close() + tag.close()
  } else {
    prevTags += tag.open(listType)
  }

  return prevTags + tag.open('li') + p.replace( /^((\d+\.?)|-)\s*/m, '')
}

function wrapAnchor(link, text) {
  return '<a href="' + link.slice(1, link.length-1) + '">' + text.slice(1, text.length-1) + '</a>'
}

function readLine( str, startIdx=0 ) {
  let r = { line:'', lastIdx:0 }
  for( let i=startIdx; i < str.length; i++ ) {
    if( str[i] == '\n' ) {
      break
    }
    r.line += str[i]
    r.lastIdx = i
  }
  return r
}

Array.prototype.lastItem = function() {
  if( this.length != 0 )
    return this[ this.length-1 ]
}
