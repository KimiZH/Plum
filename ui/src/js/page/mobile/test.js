define([
    '../masterpage/main',
    'jquery'
], function (masterpage, $) {
    $('body').scrollTop(1);

    $(function () {
        var $form = $('form');
        $('.section-btn-right').bind('click', function () {
            window.document.body.scrollTop = parseInt($form.offset().top);
        });
    });
});