define(['../../masterpage/main', 'jquery'], function (masterpage, $) {
    $(function ($) {
        var msgErr = window.location.href.match(/[\?&]err=([^&]*)(&|$)/i);
        if (msgErr) {
            $('#msgErr').html(decodeURIComponent(msgErr[1]));
        }
    });
});