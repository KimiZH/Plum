define([
    '../../widget/tagger/main',
    '../../widget/cssHelper/main',
    'csstemplate!./default.css',
    'template!./default.html',
    '../../widget/html5/main'
], function (tagger, cssHelper, cssTxt, innerHTML, html5) {
    (new tagger()).tag();
    cssHelper.append(cssTxt);
});