define([
    '../masterpage/main',
    '../../widget/css-render/main',
    'csstemplate!./default.css',
    'template!./default.html',
    'jquery',
    '../../widget/form/main',
    '../../widget/formvalid/main'
], function (masterpage, cssRender, cssTxt, innerHTML, $, form, formvalid) {
    cssRender.append(cssTxt);

    $('body').scrollTop(1);

    $(function () {
        var $form = $('form');
         $('.section16-right a').each(function (i) {
            $(this).bind('click', function () {
                $('.form-radio').eq(i).click();
            });
        });
        $('.btn-order, .section16-right a').bind('click', function () {
            window.document.body.scrollTop = parseInt($form.offset().top);
        });

        $('.form-radio').bind('click', function () {
            $(this).find('input').get(0).checked = 'checked';
        });
    });

    var configForm = {
        $form: 'form',
        formConfig: {
            method: 'post',
            target: '_self',
            action: 'posthandler.aspx',
            fields: {
                name: {
                    title: '收件人',
                    placeholder: '收件人'
                },
                mobile: {
                    title: '手机号',
                    placeholder: '手机号'
                },
                address: {
                    title: '地址',
                    placeholder: '地址'
                },
                zipcode: {
                    title: '邮编',
                    placeholder: '邮编'
                }
            }
        },
        fnConfig: [
            {
                data: (function () {
                    function isNotEmpty() {
                        return this.value.replace(/(^\s*)|(\s*$)/g, '') != '';
                    };
                    function validMobile() {
                        var val = $.trim($(this).val());
                        return /^1\d{10}$/ig.test(val);
                    };
                    function validZipCode() {
                        var val = $.trim($(this).val());
                        return (val == '') || /^\d+$/ig.test(val);
                    };
                    return {
                         Valid:{
                            typeid: { valid: isNotEmpty, data: { errormessage: '请选择产品' } },
                            name: { valid: isNotEmpty, data: { errormessage: '请填写正确的收件人' } },
                            mobile: { valid: validMobile, data: { errormessage: '请填写正确的手机号码' } },
                            address: { valid: isNotEmpty, data: { errormessage: '请填写正确的地址' } },
                            zipcode: { valid: validZipCode, data: { errormessage: '请填写正确的邮编' } }
                        }
                    }
                })(),
                Valid: function (handle) {
                    var $form = handle.$form,
                        config = ('data' in handle.fn) && $.isPlainObject(handle.fn.data) ? (('Valid' in handle.fn.data) && $.isPlainObject(handle.fn.data.Valid) ? handle.fn.data.Valid : {}) : {},
                        valid = new formvalid(config);

                    var $name = $form.find("[name='name']");

                    function showValidMessage() {
                        alert($(this).data('errormessage'));
                    };

                    $form.find(':input').filter(':not(:submit)').filter(':visible')
                        .each(valid.bind)
                        .bind('showValidMessage', showValidMessage);

                    $form.submit(function () {
                        var re = true,
                            $form = $(this),
                            $typeid = $form.find('[name=typeid]:checked'),
                            data = $form.data('valid'),
                            $controls = data ? data.$controls : undefined;
                        if ($typeid.length < 1) {
                            re = false;
                            $form.find('[name=typeid]').eq(0).trigger('showValidMessage');
                        }
                        if (re && $controls && $controls.length) {
                            $controls.each(function () {
                                if ((this.type != 'radio') && re) {
                                    if (this.isValid({mark: false, message: true})) {
                                        re = true;
                                    }
                                    else {
                                        re = false;
                                    }
                                }
                            });
                        }
                        if (!re) {
                            return re;
                        }
                    });
                }
            }
        ]
    };

    $(function () {
        form(configForm);
    });
});