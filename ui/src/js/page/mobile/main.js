define([
    '../masterpage/main',
    '../../widget/css-render/main',
    'csstemplate!./default.css',
    'template!./default.html'
], function (masterpage, cssRender, cssTxt, innerHTML) {
    cssRender.append(cssTxt);
});