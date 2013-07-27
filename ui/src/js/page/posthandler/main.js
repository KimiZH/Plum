define([
    '../masterpage/main',
    '../../widget/css-render/main',
    'csstemplate!./default.css',
    'template!./default.html',
    'jquery',
], function (masterpage, cssRender, cssTxt, innerHTML, $) {
    cssRender.append(cssTxt);

    $('body').scrollTop(1);
});