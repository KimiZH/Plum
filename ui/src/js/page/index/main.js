define([
    '../../widget/cssHelper/main',
    'csstemplate!./default.css',
    'template!./default.html'
], function (cssHelper, cssTxt, innerHTML) {
    cssHelper.append(cssTxt);
});