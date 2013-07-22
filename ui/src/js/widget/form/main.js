define(['jquery', 'require'], function ($, require) {
    return function(config) {
        if (!$.isPlainObject(config)) { return; };

        var $forms = (config.$form instanceof $) ? config.$form : (typeof(config.$form) == 'string' && $(config.$form).length ? $(config.$form) : undefined),
            css = config.css,
            defaultFormConfig = { method: 'post', target: '_self', action: '#', fields: {} },
            formConfigs = $.isPlainObject(config.formConfig) ? $.extend(true, defaultFormConfig, config.formConfig) : {},
            fnConfigs = ($.isPlainObject(config.fnConfig) || (config.fnConfig instanceof Array)) ? config.fnConfig : [],
            dependence = $.isPlainObject(config.dependence) ? (function () { for (var i in config.dependence) { if (typeof(config.dependence[i]) != 'string') { delete config.dependence[i]; } } return config.dependence; })() : {},
            flgDependence,
            forms = [],
            leadsform = [];

        if (!$forms) { return };

        function LoadCSS(cssPath) {
            var pLink = document.createElement('link');
            pLink.href = cssPath;
            pLink.rel = 'stylesheet';
            pLink.type = 'text/css';
          
            document.getElementsByTagName('head')[0].appendChild(pLink);
        };

        if (typeof(css) == 'string') {
            LoadCSS(css);
        }
        else if ($.isPlainObject(css) || (css instanceof Array)) {
            for (var i in css) {
                LoadCSS(css[i]);
            }
        }

        $forms.each(function () {
            if ((typeof(this.nodeType) == 'undefined') || (this.nodeType != 1) || (this.tagName.toLowerCase() != 'form')) {
                return;
            }

            var $form = $(this),
                fnConfig = $.extend(true,{}, fnConfigs),
                publicObj = {
                    $form: $form,
                    config: $.extend(true,{}, formConfigs),
                    dependence: {},
                    fn: {},
                    load: load,
                    getRouteConfig: getRouteConfig
                },
                privateObj = {
                    stop: stop,
                    go: undefined,
                    on: on,
                    off: off,
                    trigger: trigger
                },
                onObj = {},
                iForms = (function () {
                    forms.push({
                        isStop: false
                    });
                    return (forms.length - 1);
                })();

            $form.submit(function () {
                var method = $form.attr('method'),
                    action = $form.attr('action'),
                    target = $form.attr('target');
                $form.attr('method', publicObj.config.method).attr('action', publicObj.config.action).attr('target', publicObj.config.target);
                setTimeout(function () {
                    if (typeof(method) != 'undefined') { $form.attr('method', method); } else { $form.removeAttr('method'); }
                    if (typeof(action) != 'undefined') { $form.attr('action', action); } else { $form.removeAttr('action'); }
                    if (typeof(target) != 'undefined') { $form.attr('target', target); } else { $form.removeAttr('target'); }
                }, 500);
            });

            (function () {
                var fields = publicObj.config.fields,
                    $lastVisiableControl = $form.find(':input').filter(':not(:submit)').filter(':not(:hidden)').filter(':last'),
                    $lastHiddenControl = $form.find(':input').filter(':not(:submit)').filter(':hidden').filter(':last');

                $form.find(':input').each(function () {
                    var $field = $(this),
                        attrData = $field.attr('data');
                    if (typeof(attrData) != 'undefined') {
                        eval('attrData = ' + attrData);
                        if ($.isPlainObject(attrData)) {
                            var data = $field.data();
                            $.extend(true, data, attrData, data);
                        }
                    }
                });

                function extendField($field, fieldConfig) {
                    for (var i in fieldConfig) {
                        switch (i) {
                            case ('tagName'):
                            case ('name'):
                                break;
                            case ('option'):
                                $field.each(function () {
                                    var $field = $(this);
                                    if (this.tagName.toLowerCase() == 'select') {
                                        if (!$field.find('option').length && (fieldConfig.option instanceof Array)) {
                                            for (var j = 0; j < fieldConfig.option.length; j++) {
                                                var $option = $('<option></option>');
                                                extendField($option, fieldConfig.option[j]);
                                                $field.append($option);
                                            }
                                        }
                                    }
                                });
                                break;
                            case ('text'):
                                if ($field.html() == '' && typeof(fieldConfig.text) == 'string') {
                                    $field.html(fieldConfig.text);
                                }
                                break;
                            case ('data'):
                                if ($.isPlainObject(fieldConfig.data)) {
                                    var data = $field.data(),
                                        dataConfig = $.extend(true, {}, fieldConfig.data);
                                    $.extend(true, data, dataConfig, data);
                                }
                                break;
                            default:
                                if (typeof(fieldConfig[i]) == 'string') {
                                    $field.each(function () {
                                        if (!this.getAttribute(i)) {
                                            this.setAttribute(i, fieldConfig[i]);
                                        }
                                    });
                                }
                                break;
                        };
                    }
                };

                for (var i in fields) {
                    var field = fields[i],
                        $control = $form.find("[name='" + i + "']");
                    if ($control.length) {
                        extendField($control, field);
                    }
                };
            })();

            function getRouteConfig(routeConfig) {
                var result,
                    fields = {};
                $form.find('[name]').each(function () {
                    $control = $(this);
                    if ($control.filter(':checkbox').length) {
                        fields[$control.attr('name')] = $control.get(0).checked ? 'checked' : '';
                    }
                    else {
                        fields[$control.attr('name')] = $control.val();
                    }
                });
                for (var i = 0; i < routeConfig.length; i++) {
                    var itemRouteConfig = routeConfig[i],
                        isRouteConfig = undefined,
                        hasRouteConfig = false;
                    for (var j in itemRouteConfig) {
                        var itemConfig = itemRouteConfig[j];
                        hasRouteConfig = true;
                        if (j in fields) {
                            if ($.inArray((typeof(fields[j]) == 'undefined' || fields[j] == null) ? '' : fields[j].toLowerCase(), itemConfig.toLowerCase().split('|')) < 0) {
                                isRouteConfig = false;
                                break;
                            }
                            else {
                                isRouteConfig = true;
                                continue;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                    if (isRouteConfig || (hasRouteConfig && (typeof(isRouteConfig) == 'undefined'))) {
                        result = itemRouteConfig;
                        break;
                    }
                }
                return result;
            };

            function Continue(handle, i) {
                for (var j in fnConfig) {
                    if (!$.isPlainObject(fnConfig[j])) {
                        continue;
                    }
                    handle.load(fnConfig[j], true);
                    if (!forms[i].isStop) {
                        delete fnConfig[j];
                    }
                    else {
                        flg = true;
                        break;
                    }
                }
            };

            function load(objConfig, isContinue) {
                if (!$.isPlainObject(objConfig)) {
                    return publicObj;
                }
                else if (!isContinue) {
                    fnConfig.push(objConfig);
                    if (!forms[iForms].isStop) {
                        Continue(publicObj, iForms);
                    }
                    return publicObj;
                }
                for (var i in objConfig) {
                    var isRequire;
                    if ($.isPlainObject(objConfig[i]) && ('require' in objConfig[i]) && (typeof(objConfig[i].require) == 'string')) {
                        isRequire = true;
                        forms[iForms].isStop = true;
                        require([objConfig[i].require], function () {
                            objConfig[i] = arguments.length ? arguments[0] : undefined;
                            forms[iForms].isStop = false;
                            Continue(publicObj, iForms);
                        });
                    }
                    else if (typeof(objConfig[i]) != 'function') {
                        if ($.isPlainObject(publicObj.fn[i]) && $.isPlainObject(objConfig[i])) {
                            $.extend(true, publicObj.fn[i], objConfig[i]);
                        }
                        else {
                            publicObj.fn[i] = objConfig[i];
                        }
                    }
                    else {
                        var tmpObj = {};
                        for (var j in privateObj) {
                            publicObj[j] = privateObj[j];
                        }
                        publicObj.go = function () {
                            if (forms[iForms].isStop) {
                                setTimeout(function () {
                                    publicObj = tmpObj;
                                    for (var j in privateObj) {
                                        delete publicObj[j];
                                    }
                                    forms[iForms].isStop = false;
                                    Continue(publicObj, iForms);
                                }, 0);
                            }
                        };
                        for (var j in publicObj) {
                            if (j != 'fn') {
                                tmpObj[j] = publicObj[j];
                            }
                            else {
                                tmpObj.fn = {};
                                for (var k in publicObj[j]) {
                                    tmpObj.fn[k] = publicObj[j][k];
                                }
                            }
                        }
                        var reObj = new objConfig[i](publicObj);
                        tmpObj.fn[i] = reObj;
                        if (!forms[iForms].isStop) {
                            publicObj = tmpObj;
                            for (var j in privateObj) {
                                delete publicObj[j];
                            }
                        }
                    }
                    if (!isRequire) {
                        delete objConfig[i];
                    }
                    if (forms[iForms].isStop) {
                        break;
                    }
                }
                return publicObj;
            };

            function stop() {
                forms[iForms].isStop = true;
            };

            function on(type, fn) {
                if (!arguments.length) {
                    var reArr = new Array();
                    for (var i in onObj) {
                        reArr.push(i);
                    }
                    return reArr;
                }
                else if (typeof(type) != 'string') {
                    return false;
                }
                else if (typeof(fn) != 'function') {
                    return (type in onObj);
                }
                if (!(type in onObj)) {
                    onObj[type] = new Array();
                }
                onObj[type].push(fn);
                return true;
            };

            function off(type, fn) {
                if (typeof(type) != 'string' || !(type in onObj)) {
                    return false;
                }
                if (typeof(fn) != 'function') {
                    delete onObj[type];
                    return true;
                }
                for (var i = 0; i < onObj[type].length; i++) {
                    if (onObj[type][i] == fn) {
                        onObj[type].splice(i, 1);
                        break;
                    }
                }
                if (!onObj[type].length) {
                    delete onObj[type];
                }
                return true;
            };

            function trigger(type) {
                if (typeof(type) != 'string' || !(type in onObj)) {
                    return false;
                }
                var args = [];
                if (arguments.length == 2 && (arguments[1] instanceof Array)) {
                    args = arguments[1];
                }
                else {
                    for (var i = 1; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                }
                for (var i = 0; i < onObj[type].length; i++) {
                    onObj[type][i].apply(this, args);
                }
                return true;
            };

            if (flgDependence) {
                publicObj.dependence = $.extend({}, dependence);
                Continue(publicObj, iForms);
            }
            else {
                var dependenceArr = new Array();
                for (var i in dependence) {
                    dependenceArr.push(dependence[i]);
                }
                if (dependenceArr.length) {
                    require(dependenceArr, function () {
                        var iDependence = 0;
                        for (var i in dependence) {
                            dependence[i] = arguments[iDependence++];
                        }
                        flgDependence = true;

                        publicObj.dependence = $.extend({}, dependence);
                        Continue(publicObj, iForms);
                    });
                }
                else {
                    Continue(publicObj, iForms);
                }
            }

            leadsform.push(publicObj);
        });

        return leadsform;
    };
});