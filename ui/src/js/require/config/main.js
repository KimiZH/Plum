define(function (config) {
    var config = (window.km && window.km.config) ? window.km.config : {
            context: '_',
            debug: false,
            paths: {
                cacheSvr: ''
            }
        },
        context = config.context ? config.context : '_',
        debug = config.debug ? config.debug : false,
        cacheSvr = (config.paths && config.paths.cacheSvr) ? config.paths.cacheSvr : '',
        configRequire = {
            context: context,
            debug: debug,
            paths: {
                'cacheSvr': cacheSvr,
                'jquery': cacheSvr + '/ui/src/js/jquery/1.7.2/main',
                'template': cacheSvr + '/ui/src/js/widget/template/main',
                'csstemplate': cacheSvr + '/ui/src/js/widget/css-template/main'
            }
        };
    
    window.require && window.require.config(configRequire);
    
    return configRequire;
});