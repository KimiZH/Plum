define([
    '../../masterpage/main',
    '../../../widget/css-render/main',
    'csstemplate!./default.css',
    'jquery'
], function (masterpage, cssRender, cssTxt, $) {
    cssRender.append(cssTxt);

    $(function ($) {
        var msgErr = window.location.href.match(/[\?&]err=([^&]*)(&|$)/i);
        if (msgErr) {
            $('#msgErr').html(decodeURIComponent(msgErr[1]));
        }
    });
});