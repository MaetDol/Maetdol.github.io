function parseMarkdown(page) {

  let paragraphs = page.split('\n')
  let tag = []
  for( let i=0; i < paragraphs.length; i++ ) {

    let p = paragraphs[i]
    if( p == '' || i == paragraphs.length-1 ) {
      paragraphs[i] = closeTag(tag)
      continue
    }
    let parsed = parseParagraph( p, tag )
    paragraphs[i] = parsed.p
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
  if( p == '' )
    return { p:'', tag: tag }

  let brCount = p.match(/\\+$/)
  if( brCount != null ) {
    brCount = brCount[0].length
    p = p.slice(0, -brCount) + '<br>'.repeat(brCount)
  }

  let prevTag = ''
  switch( p[0] ) {
    case '=':

    p = closeTag(tag) + '\
        <div class="embed-wrapper">\
          <embed type="text/html" src="/embed/' + p.slice(1) + '/index.html"></embed>\
        </div>\
        '
    return { p:p, tag: tag }

    case '#':
    let nth = p.match(/^#+/)[0].length,
        tagLength = '<h1>'.length
    p = closeTag(tag) + '<h'+nth+'>' + p.slice(nth).trim() + '</h'+nth+'>'
    break

    case '-':
    prevTag = ''
    if( isTagOpened('ul', tag) && tag.lastItem() != 'ul' ) {
      prevTag = closeTag(tag) + closeTag(tag)
    } else if( isTagOpened('ol', tag) && !isTagOpened('li', tag) ) {
      prevTag = openTag('li', tag)
    }
    prevTag += openTag( 'ul', tag )
    p = prevTag + wrapListItem(p)
    break

    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7': case '8': case '9':
    prevTag = ''
    if( isTagOpened('ol', tag) && tag.lastItem() != 'ol' ) {
      prevTag = closeTag(tag) + closeTag(tag)
    } else if( isTagOpened('ul', tag) && !isTagOpened('li', tag) ) {
      prevTag = openTag('li', tag)
    }
    prevTag += openTag( 'ol', tag )
    p = prevTag + wrapListItem(p)
    break

    default:
      if( !isTagOpened('p', tag) ) {
        p = openTag( 'p', tag ) + p
      }
  }

  // Parse Anchor tag
  let anchors = p.match( /(\[((\\[\[\]])|[^\[\]])*[^\\]\])|(\([^\(\)]*[^\\]\))/g )
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

  p = p.replace(/\\/gm, '')
  return { p:p, tag: tag }
}

function isTagOpened(target, tag) {
  return tag.includes(target)
}

function openTag(target, tag) {
  if( target == tag.lastItem() ) {
    return ''
  }
  tag.push( target )
  return '<'+target+'>'
}

function closeTag( tag ) {
  return (tag.lastItem() != undefined) ? '</'+tag.pop()+'>' : ''
}

function wrapListItem(p) {
  p = p.replace( /^((\d+\.?)|-)\s*/m, '')
  return '<li>' + p + '</li>'
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
