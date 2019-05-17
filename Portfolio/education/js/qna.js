$(function() {

    // 질문 보이기, 숨기기
    let questions = $('#qna li');
    questions.each(function() {
        let answer = $(this).find('.answer');
        let h = answer.innerHeight();
        answer.data('height', h);
        answer.css({ height: h });
        answer.addClass('collapse');
    });
    questions.click(function() {
        let self = this;
        questions.each(function() {
            let a = $(this).find('.answer');
            if( this != self && !a.hasClass('collapse') ) {
                a.addClass('collapse');
            }
        });
        $(self).find('.answer').toggleClass('collapse');
    });


    // 질문하기 모달
    let openBtn = $('#qna .open');
    let modal = $('.question-modal');
    openBtn.click(function() {
        modal.removeClass('hidden');
    });
    modal.find('.bg').click(function() {
        modal.addClass('hidden');
    })
    modal.find('.cancel').click(function() {
        modal.addClass('hidden');
    })

});
