$(document).ready( function () {

    // 리스트 좌 우로 넘기기
    o = {
        idx: 0,
        list: $('.preview').parent(),
        view: $('main > ul'),
        len: $('.preview').length,
        direction: ''
    };
    o.width = o.list.eq(0).width();
    r = RegExp("Arrow*");
    // cooldown
    up = true;
    down = true;
    // drag
    startPoint = 0;
    dragDistance = 0;
    $('body').bind({
        keydown:
        function (e) {
            if( r.test( e.key ) ) {
                o.direction = e.key.substr( 5, e.key.length ).toLowerCase();
                rotate(o);
            }
        },
        mousewheel:
        function (e) {
            o.direction = '';
            if( e.originalEvent.wheelDelta / 120 > 0 ) {

                if( up ) {
                    o.direction = 'left';
                    up = false;
                    setTimeout(function () { up=true }, 100);
                }
            } else {

                if( down ) {
                    o.direction = 'right';
                    down = false;
                    setTimeout(function () { down=true }, 100);
                }
            }
            rotate(o);
        },
        touchstart:
        function (e) {
            startPoint = e.originalEvent.touches[0].screenX;
            o.view.css({ 'transition-duration': '0s' });
        },
        touchmove:
        function (e) {
            pointX = e.originalEvent.touches[0].screenX;
            dragDistance = startPoint - pointX;
            setFocus(o, dragDistance);
        },
        touchend:
        function () {
            o.view.css({ 'transition-duration': '.2s' });
            o.direction = '';
            if( Math.abs(dragDistance) > o.width*0.3 ) {
        
                o.direction = 'left';
                if( dragDistance > 0 ) {
                    o.direction = 'right';
                }
                dragDistance = 0;
            }
            rotate(o);
        }
    });
});

function rotate(o) {

    if( o.direction == 'right' && o.len > o.idx+1 ) {
        o.idx++;
    } else if( o.direction == 'left' && o.idx > 0 ) {
        o.idx--;
    }

    setFocus(o);
}

function setFocus(o, offset) {

    if( !$.isNumeric(offset) ) {
        offset = 0;
    }
    margin = parseInt( o.list.eq(0).css('margin-right') );
    offset += o.idx * (o.width + margin);
  
    $('.focus').removeClass('focus');
    o.view.css({ left: 'calc(50% - ' + offset + 'px)' })
    o.list.eq(o.idx).addClass('focus');
}
