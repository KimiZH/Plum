define([
    '../../widget/tagger/main',
    '../../widget/css-render/main',
    'csstemplate!./default.css',
    'template!./default.html',
    '../../widget/html5/main'
], function (tagger, cssRender, cssTxt, innerHTML, html5) {
    (new tagger()).tag();
    cssRender.append(cssTxt);
});