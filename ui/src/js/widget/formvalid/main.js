define(['jquery'], function($){
    return function(config) {
        var forms = [],
            controls = [],
            //$controls = $(''),
            defaultConfig = {
                fakename: {
                    valid: function () {
                        var valLastName = $.trim($($(this).get(0).form).find("[name='lastname']").val()),
                            valFirstName = $.trim($($(this).get(0).form).find("[name='firstname']").val());
                        return ((valLastName != '') && (valFirstName != '')) ? true : false;
                    },
                    data: { errormessage: '请输入您的姓名' }
                },
                lastname: { valid: isNotEmpty, data: { errormessage: 'getJSSafeTrans::97019' } },
                firstname: { valid: isNotEmpty, data: { errormessage: 'getJSSafeTrans::97017' } },
                faketelephone: { valid: validTel, data: { errormessage: 'getJSSafeTrans::103336' } },
                telephone: { valid: validTel, data: { errormessage: 'getJSSafeTrans::103336' } },
                email: { valid: validEmail, data: { errormessage: 'getJSSafeTrans::97020' } },
                age: { valid: isOption, data: { errormessage: 'getJSSafeTrans::97027' } },
                citypicker: {
                    valid: function () {
                        var valCity = $.trim($($(this).get(0).form).find("[name='city']").val()),
                            valState = $.trim($($(this).get(0).form).find("[name='state']").val());
                        return ((valCity != '') && (valState != '')) ? true : false;
                    },
                    data: { errormessage: 'getJSSafeTrans::97023' }
                },
                city: { valid: isNotEmpty, data: { errormessage: 'getJSSafeTrans::97023' } },
                district: { valid: isNotEmpty, data: { errormessage: 'getJSSafeTrans::97026' } },
                school: { valid: isNotEmpty, data: { errormessage: 'getJSSafeTrans::177799' } },
                state: { valid: isNotEmpty, data: { errormessage: 'getJSSafeTrans::4462' } }
            },
            dataName = 'valid';

        config = (typeof(config) != 'undefined' && $.isPlainObject(config)) ? config : {};
        config = $.extend(true, {}, defaultConfig, config);

        function isNotEmpty() {
            return $.trim($(this).val()) != '';
        };
        function isOption() {
            var $control = $(this),
                val = $.trim($control.val());
            if ((val != '') && (function () {
                    $options = $control.find('option');
                    var isContain = false;
                    for (var i = 0; i < $options.length; i++) {
                        if (val == $options.eq(i).attr('value')) {
                            isContain = true;
                            break;
                        }
                    }
                    return isContain;
                })()) {
                return true;
            }
            else {
                return false;
            }
        };
        function validTel() {
            var val = $.trim($(this).val());
            return /^\d{6,12}$/ig.test(val) || /^1\d{10}$/ig.test(val) || /^1\d{2}\-\d{4}\-\d{4}$/ig.test(val);
        };
        function validEmail() {
            var val = $.trim($(this).val());
            return /^[^@\s]+@[A-Za-z0-9-\u4e00-\u9fa5]+(?:\.[A-Za-z0-9-\u4e00-\u9fa5]+)+$/ig.test(val);
        };

        function getFiledConfig() {
            return this.name ? ((this.name in config) ? config[this.name] : undefined) : undefined;
        };
        function getFiledRule() {
            var fieldConfig = getFiledConfig.apply(this);
            return (typeof(fieldConfig) != 'undefined' && ('valid' in fieldConfig) && typeof(fieldConfig.valid) == 'function') ? fieldConfig.valid : undefined;
        };

        function addControls() {
            var i = getControlsIndexByFrom(this.form),
                $controls,
                data;
            if (typeof(i) == 'number') {
                $controls = controls[i];
            }
            if ($controls) {
                controls[i] = $controls.add($(this));
            }
            else {
                forms.push(this.form);
                controls.push($(this));
                i = controls.length - 1;
            }
            $controls = controls[i];
            if (data = $(this.form).data(dataName)) {
                data.$controls = $controls;
            }
            else {
                $(this.form).data(dataName, {$controls: $controls});
            }
            return $controls;
        };
        function notControls() {
            var i = getControlsIndexByFrom(this.form),
                $controls,
                data;
            if (typeof(i) == 'number') {
                $controls = controls[i];
            }
            if ($controls) {
                $controls = controls[i] = $controls.not($(this));
                if ($controls.length == 0) {
                    controls.splice(i, 1);
                    forms.splice(i, 1);
                    if (data = $(this.form).data(dataName)) {
                        delete data.$controls;
                    }
                }
                else {
                    if (data = $(this.form).data(dataName)) {
                        data.$controls = $controls;
                    }
                    else {
                        $(this.form).data(dataName, {$controls: $controls});
                    }
                }
            }
            return $controls;
        };
        function getControlsIndexByFrom(form) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i] == form) {
                    return i;
                }
            }
        };
        function getControlsByForm(form) {
            var i = getControlsIndexByFrom(form);
            if (typeof(i) == 'number') {
                return controls[i];
            }
        };

        function extendField(fieldConfig) {
            var $control = $(this);
            if (!$control.data('errormessage') && ('data' in fieldConfig) && $.isPlainObject(fieldConfig.data) && ('errormessage' in fieldConfig.data)) {
                $control.data('errormessage', fieldConfig.data.errormessage);
            }
        }

        function mark(isValid) {
            var $control = $(this);
            if (isValid) {
                $control.trigger('hideValidMessage');
                $control.trigger('hideValidMark');
            }
            else {
                $control.trigger('showValidMark');
            }
        };
        function message(isValid, type) {
            var $control = $(this), msg;
            if (isValid) {
                $control.trigger('hideValidMessage');
            }
            else {
                msg = $control.data('errormessage');
                if ($.isPlainObject(msg)) {
                    for (var i in msg) {
                        if (type) {
                            if (i == type && typeof(msg[i].text) == 'string') {
                                msg = msg[i].text;
                                break;
                            }
                        }
                        else {
                            if (typeof(msg[i].text) == 'string') {
                                msg = msg[i].text;
                                break;
                            }
                        }
                    }
                    if (typeof(msg) != 'string') {
                        msg = '';
                    }
                }
                else if (typeof(msg) != 'string') {
                    msg = '';
                }

                $control.trigger('showValidMessage', msg);
            }
        };

        function change(event) {
            var $control = $(this),
                data = $control.data(dataName),
                isValid = this.isValid({mark: false, message: false});
            if (data.isKeyPress || (event && event.data && event.data.mark)) {
                mark.apply(this, [isValid]);
            }
            if (event && event.data && event.data.message) {
                message.apply(this, [isValid]);
            }
            if (isValid) {
                data.isKeyPress = true;
            }
        };
        function changeAsync(event) {
            var _this = this
                _arguments = arguments;
            setTimeout(function () {
                change.apply(_this, _arguments);
            }, 0);
        };
        function blur(event) {
            var $control = $(this),
                data = $control.data(dataName);
            data.isKeyPress = true;
            change.apply(this, arguments);
        };
        function pressKey(event) {
            var $control = $(this),
                data = $control.data(dataName),
                val = $control.val();
            if (data.val != val) {
                change.apply(this, arguments);
            }
            data.val = val;
        };

        function valid(evt, args) {
            var $control = $(this),
                data = $control.data(dataName),
                fnRule = $.isPlainObject(data) ? data.rule : function () { return true },
                isMark = true,
                isMessage = false,
                result = false, isValid, type;

            if ($.isPlainObject(args)) {
                fnRule = (('rule' in args) && typeof(args.rule) == 'function') ? args.rule : fnRule;
                isMark = (('mark' in args) && typeof(args.mark) == 'boolean') ? args.mark : isMark;
                isMessage = (('message' in args) && typeof(args.message) == 'boolean') ? args.message : isMessage;
            }

            try {
                result = fnRule.apply(this);
            }
            catch (ex) { };

            if ($.isPlainObject(result)) {
                isValid = result.isValid;
            }
            else if (typeof(result) == 'boolean') {
                isValid = result;
            }

            if (isMark) {
                mark.apply(this, [isValid]);
            }
            if (isMessage) {
                if ($.isPlainObject(result) && typeof(result.type) == 'string') {
                    type = result.type;
                }
                if (isValid) {
                    message.apply(this, [isValid]);
                }
                else {
                    message.apply(this, [isValid, type]);
                }
            }

            return isValid;
        };

        function isvalid(args) {
            if ($.isPlainObject(args)) {
                if (!args.mark) {
                    args.mark = false;
                }
            }
            else {
                args = {mark: false};
            }
            return valid.apply(this, [{}, args]);
        };
        function submit() {
            var $controls = getControlsByForm(this),
                re = true;
            if ($controls && $controls.length) {
                $controls.each(function () {
                    var $control = $(this),
                        isValid = valid.apply(this, [{}, {mark: true, message: true}]),
                        data;
                    if (data = $control.data(dataName)) {
                        data.isKeyPress = true;
                    }
                    else {
                        $control.data(dataName, {isKeyPress: true});
                    }
                    re = re && isValid;
                });
            }
            return re;
        };

        function bind() {
            var $controls = this.form ? getControlsByForm(this.form) : undefined,
                $control = $(this),
                fieldConfig = getFiledConfig.apply(this),
                rule = getFiledRule.apply(this);

            if ($controls && $controls.filter($control).length) {
                return;
            }

            //$controls = $controls.add($control);
            $controls = addControls.apply(this);

            if (fieldConfig) {
                extendField.apply(this, [fieldConfig]);
            }

            $control.data(dataName, {rule: rule ? rule : function () {return true;}});

            this.isValid = isvalid;
            $control
                .bind('valid', valid)
                .unbind('bindValid', bind)
                .bind('unbindValid', unbind);

            switch (this.tagName.toLowerCase()) {
                case ('select'):
                    $control.bind('change', change);
                    break;
                default:
                    $control
                        .bind('focus', change)
                        .bind('blur', blur)
                        .bind('keydown', pressKey)
                        .bind('keyup', pressKey)
                        .bind('paste', change)
                        .bind('cut', change);
                    break;
            };

            if ($controls.length == 1) {
                this.form.isValid = submit;
                $(this.form).bind('valid', submit);
            };
        };

        function unbind() {
            var $controls = this.form ? getControlsByForm(this.form) : undefined,
                $control = $(this);
            if (!$controls || !$controls.filter($control).length) {
                return;
            }

            message.apply(this, [true]);
            mark.apply(this, [true]);

            if ($controls.length == 1) {
                $(this.form).unbind('valid', submit);
                try {
                    delete this.form.isValid
                }
                catch (ex) {
                    this.form.isValid = undefined;
                };
            }

            switch (this.tagName.toLowerCase()) {
                case ('select'):
                    $control.unbind('change', change);
                    break;
                default:
                    $control
                        .unbind('focus', change)
                        .unbind('blur', blur)
                        .unbind('keydown', pressKey)
                        .unbind('keyup', pressKey)
                        .unbind('paste', change)
                        .unbind('cut', change);
                    break;
            };

            $control
                .unbind('unbindValid', unbind)
                .bind('bindValid', bind)
                .unbind('valid', valid);
            try {
                delete this.isValid;
            }
            catch (ex) {
                this.isValid = undefined;
            };

            $control.removeData(dataName);

            //$controls = $controls.not($control);
            $controls = notControls.apply(this);
        };

        this.bind = function () {
            if (this.tagName.toLowerCase() == 'form') {
                $(this).find(':input').filter(':not(:submit)').filter(':visible').each(bind);
            }
            else {
                bind.apply(this);
            }
        };
    };
});