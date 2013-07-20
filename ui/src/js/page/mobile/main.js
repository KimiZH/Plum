define([
    '../masterpage/main',
    '../../widget/css-render/main',
    'csstemplate!./default.css',
    'template!./default.html',
    'jquery'
], function (masterpage, cssRender, cssTxt, innerHTML, $) {
    cssRender.append(cssTxt);

    $('body').scrollTop(1);

    $(function () {
        var $form = $('form');
        $('.section-btn-right').bind('click', function () {
            window.document.body.scrollTop = parseInt($form.offset().top);
        });
    });
});