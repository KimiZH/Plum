define(['jquery', '../../require/config/main'], function ($, config) {
    var cssMgr,
        limit = { is: $.browser.msie },
        cacheSvr = (config && config.paths && config.paths.cacheSvr) ? config.paths.cacheSvr : '',
        isDebug = (config && config.debug) ? config.debug : false,
        isIE6 = $.browser.msie && (parseInt($.browser.version) <= 6);

    if ($.browser.msie && (parseInt($.browser.version) <= 9)) {
        limit.styleSheets = 31;
        limit.rules = 4095;
        limit.imports = 3;
    }
    else if ($.browser.msie) {
        limit.styleSheets = 4095;
        limit.rules = 65534;
        limit.imports = 4095;
    }

    function createStyle(args) {
        if (document.styleSheets.length >= limit.styleSheets) {
            throw 'too many styleSheets';
            return false;
        }
        else {
            var style = document.createElement('style'),
                $container = (args && args.container) ? $(args.container) : $(document.getElementsByTagName('head')[0]),
                container = $container.length ? $(args.container).get(0) : undefined,
                $target = $container.length ? $container.find('style[title=etCss]:last') : undefined;
            style.type = 'text/css';
            style.setAttribute('title', 'etCss');
            if ($container && $container.length && $target && $target.length) {
                $target.after(style);
            }
            else if ($container && $container.length) {
                $container.append(style);
            }
            else {
                throw 'not found container';
                return false;
            }
            return style;
        }
    };

    function getCurrentStyle(args) {
        var $container = (args && args.container) ? $(args.container) : $(document.getElementsByTagName('head')[0]),
            container = $container.length ? $(args.container).get(0) : undefined,
            $target = $container.length ? $container.find('style[title=etCss]:last') : undefined;
        if ($container && $container.length && $target && $target.length) {
            return {
                style: $target.get(0),
                lenRules: limit.is ? $target.get(0).styleSheet.rules.length : 0
            };
        }
        else if ($container && $container.length) {
            return;
        }
        else {
            throw 'not found container';
            return;
        }
    };

    function countRules(cssText) {
        var lenRules = 0,
            tmpStyle = document.createElement('style');
        tmpStyle.type = 'text/css';
        if (tmpStyle.styleSheet) {
            tmpStyle.styleSheet.cssText = cssText;
            lenRules = tmpStyle.styleSheet.rules.length;
        }
        tmpStyle = null;
        return lenRules;
    };

    function getStyle(cssText, args) {
        var currentStyle = getCurrentStyle(args);
        if (!limit.is || isIE6) {
            if (!currentStyle) {
                return createStyle(args);
            }
            return currentStyle.style;
        }
        else {
            var lenRules = countRules(cssText);
            if ((lenRules + (currentStyle ? currentStyle.lenRules : 0)) <= limit.rules) {
                if (!currentStyle) {
                    return createStyle(args);
                }
                return currentStyle.style;
            }
            else if (lenRules > limit.rules) {
                throw 'too many rules';
                return false;
            }
            else {
                return createStyle(args);
            }
        }
    };

    function parseCssText(cssText, args) {
        if (args && args.stamp && isExist(args)) {
            return '';
        }
        else if (args && args.url && isDebug) {
            return debugURL(args);
        }
        cssText = cssText.replace(/(url\s*?\([\s\'\"]*?)(\/_imgs\/)/ig, '$1' + cacheSvr + '$2');
        return cssText;
    };
    
    function debugURL(args) {
        var re = '';
        if (args && args.url) {
            args.url = (typeof args.url == 'string') ? [args.url] : ((args.url instanceof Array) ? args.url : []);
            for (var i = 0; i < args.url.length; i++) {
                re += '@import url(' + (
                        /^http/ig.test(args.url[i]) ? args.url[i] : (cacheSvr + args.url[i])
                    ) + ');\n\r';
            }
        }
        return re;
    };

    function isExist(args) {
        var re = true;
        if (args && args.stamp) {
            args.stamp = (typeof args.stamp == 'string') ? [args.stamp] : ((args.stamp instanceof Array) ? args.stamp : []);
            for (var i = 0; (i < args.stamp.length) && re; i++) {
                var $stamp = $('<div id="' + args.stamp[i] + '"></div>').appendTo(document.body);
                if (!$stamp.is(':hidden')) {
                    re = false;
                }
                $stamp.remove();
            }
        }
        return re;
    };

    function append(cssText, args) {
        var _this = this;
        args = args || {};
        if (_this.container) {
            args.container = _this.container;
        }
        cssText = parseCssText(cssText, args);
        if (cssText == '') {
            return _this;
        }
        var style = getStyle(cssText, args);
        if (style) {
            var $style = $(style),
                bakInnerText = '',
                innerText = '';
            if (style.styleSheet) {
                innerText = $style.data('innerText');
                if (!innerText) {
                    innerText = '';
                }
                else {
                    bakInnerText = innerText;
                }
                innerText += cssText;
            }
            else if ('innerText' in style) {
                innerText = style.innerText + cssText;
            }
            else {
                innerText = cssText;
            }

            if (style.styleSheet) {
                style.styleSheet.cssText = innerText;
                if (isIE6 && style.styleSheet.rules.length >= limit.rules) {
                    style.styleSheet.cssText = bakInnerText;
                    style = createStyle(args);
                    if (style) {
                        $style = $(style);
                        style.styleSheet.cssText = cssText;
                        $style.data('innerText', cssText);
                    }
                }
                else {
                    $style.data('innerText', innerText);
                }
            }
            else if ('innerText' in style) {
                style.innerText = innerText;
            }
            else {
                style.appendChild(document.createTextNode(innerText))
            }
        }
        return _this;
    };

    cssHelper = function ($container) {
        return $.extend(true, {container: $container}, cssHelper);
    };
    cssHelper.isExist = isExist,
    cssHelper.append = append;

    return cssHelper;
});
