$(function() {

    // 네비게이션 이벤트
    let navLinks = $("nav .top > li[class]");
    navLinks.mouseenter(function() {
        navLinks.each(function() {
            $(this).removeClass('click');
        });
        $(this).addClass('hover');
    });
    navLinks.mouseleave(function() {
        $(this).removeClass('hover');
    });
    navLinks.click(function() {
        let self = this;
        navLinks.each(function() {
            $(this).removeClass('hover');
            if( self == this ) {
                $(this).toggleClass('click');
            } else {
                $(this).removeClass('click');
            }
        });
    });

    // 배너 슬라이더
    let banner = $(".banner");
    let slider = $(".slider");
    let imgWidth = slider.children('img').width();
    var slideObj = {
        left: 0,
        toId: 0,
        sliding: false,
        slider: slider,
        imgCnt: slider.find('img').length,
        imgWidth: imgWidth,
        delay: 5000     // 슬라이드 이미지 대기시간
     };
    setSliderWidth( slideObj );
    slideObj.toId = setTimeout(function() { playSlide( slideObj ) }, slideObj.delay );
    banner.mouseenter(function() { stopSlide( slideObj ) });
    banner.mouseleave(function() {
        slideObj.toId = setTimeout(function() { playSlide( slideObj ) }, slideObj.delay );
    });
    // 슬라이더 왼쪽, 오른쪽 버튼
    let leftBtn = $(".banner [class*=left]");
    let rightBtn = $(".banner [class*=right]");
    leftBtn.click(function() { slide( slideObj, -1 ) });
    rightBtn.click(function() { slide( slideObj ) });



    // 일정 달력
    let calendar = $(".calendar").eq(0);
    let d = new Date( calendar.data("date") + "-01" );
    let lastDate = 0;

    switch( d.getMonth() ) {
        case 0: case 2: case 4:
        case 6: case 7: case 9: case 11:
            lastDate = 31;
            break;
        case 1:
            let y = d.getFullYear();
            lastDate = ( (y%4==0 && y%100!=0) || y%400==0 ) ? 29 : 28;
            break;
        default:
            lastDate = 30;
    }
    let cellWidth = Math.floor( (100 / lastDate) * 100 ) / 100;

    let startDays = d.getDay();
    for( let i=1; i <= lastDate; i++ ) {

        // 빨간날!
        let weekend = '';
        let days = ( i-1 + startDays ) % 7;
        if( days == 0 || days == 6 ) {
            weekend = " class='weekend'";
        }

        calendar.find(".days").append(
            "<span"+ weekend +">"+ i +"</span>"
        );
    }
    // 여기까지가 달력 그리기
    // 일정 적용
    let termList = [];
    calendar.find(".schedule span").each(function(i) {
        termList[i] = $(this).data("term").split(',');
        termList[i][0] = parseInt( termList[i][0] );
        termList[i][1] = parseInt( termList[i][1] );
        termList[i][2] = 0;

        $(this).append(""
            +"<span class='date'>"
            +   termList[i][0] + "일 ~ " + termList[i][1]
            +"일</span>"
        );
    });

    let lastLayer = 0;
    for( let i=0; i < termList.length; i++ ) {

        termList[i][2] = 1;
        for( let k=0; k < termList.length; k++ ) {

            if( i == k ) continue;
            if( termList[i][2] == termList[k][2] ) {
                // 겹치는 일정 확인
                if( ( termList[i][0] <= termList[k][0] && termList[i][1] >= termList[k][0] )
                || ( termList[i][0] <= termList[k][1] && termList[i][1] >= termList[k][1] )
                || ( termList[i][0] >= termList[k][0] && termList[i][1] <= termList[k][1] ) ) {
                    termList[i][2]++;
                    if( termList[i][2] > lastLayer )
                        lastLayer = termList[i][2];
                }
            }
        }
    }
    // 위치 조정
    for( let i=0; i < termList.length; i++ ) {

        let left = ( termList[i][0] -1 ) * cellWidth
        let width = ( termList[i][1] - termList[i][0] +1 ) * cellWidth
        let top = 16 + termList[i][2] * 32;

        calendar.find(".schedule > span").eq(i).css({
            left: left + "%",
            width: width + "%",
            top: top + "px"
        });
    }
    // 달력 크기조정
    calendar.find(".days > span").css({ width: cellWidth +"%" });
    if( lastLayer >= 4 ) {
        calendar.parent().css({
            height: 88 + 32*lastLayer + "px"
        });
    }



    // 창 크기변경에 따른 배너사이즈 변경
    $(window).resize(function () {

        if( $(window).width() >= 900 ) {
            setSliderWidth( slideObj );
        } else {
            setSliderWidth( slideObj );
        }
    });


});

function playSlide(o) {
    slide(o);
    o.toId = setTimeout( function() { playSlide(o) }, o.delay );
}

function stopSlide(o) {
    clearTimeout( o.toId );
}

function slide(o, n) {

    if( o.sliding ) return;

    o.sliding = true;
    n = ( n == undefined ) ? 1 : n;
    o.left -= n;
    if( o.left > 0 ) { o.left = 1-o.imgCnt }
    else if( o.left <= -o.imgCnt ) { o.left = 0 }
    o.slider.animate({ left: 100 * o.left + "%" }, 300, function() { o.sliding=false });
}

function setSliderWidth(s) {
    let imgWidth = s.slider.children('img').width();
    s.imgWidth = imgWidth;
    let width =  s.imgCnt * s.imgWidth;
    s.slider.css({ width: width + "px" });
}












//
