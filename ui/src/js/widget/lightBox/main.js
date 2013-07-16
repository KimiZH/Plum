define(['jquery', 'template!./default.html', 'csstemplate!./default.css'], function ($, html, css) {
    return function(args){
        return $ ? (new (
            function (initParams, $) {
                var _this = this;

                var obj = {}, cover, parent, zIndex, closeBtn, close, init;
                function Params(pParams) {
                    if (pParams&&pParams.obj) {
                        if (pParams.obj.dom) {
                            obj.dom = pParams.obj.dom;
                        }
                        if (pParams.obj.html) {
                            obj.html = pParams.obj.html;
                        }
                        if (pParams.obj.url) {
                            obj.url = pParams.obj.url;
                        }
                    }
                    if (pParams&&pParams.cover) {
                        cover = pParams.cover;
                    }
                    if (pParams&&pParams.parent) {
                        parent = $(pParams.parent);
                    }
                    if (pParams&&pParams.zIndex) {
                        zIndex = pParams.zIndex;
                    }
                    if (pParams&&pParams.closeButton) {
                        closeBtn = pParams.closeButton;
                    }
                    if (pParams&&pParams.close) {
                        close = pParams.close;
                    }
                    if (pParams&&pParams.init) {
                        init = pParams.init;
                    }
                }
                Params(initParams);

                var isFixed = (/MSIE\s([\d\.]+?);/ig.test(navigator.appVersion)) ? ((parseInt(navigator.appVersion.match(/MSIE\s([\d\.]+?);/ig)[0].replace("MSIE ", "").replace(";", "")) > 6) ? true : false) : true;
                function clientWidth() {
                    return document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth;
                };
                function clientHeight() {
                    return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
                };

                var coverDiv;
                function coverResize() {
                    coverDiv.width(clientWidth() + 'px').height(clientHeight() + 'px');
                }
                function coverScroll() {
                    coverDiv.css('top', document.documentElement.scrollTop).css('left', document.documentElement.scrollLeft);
                }

                var container;
                function Resize() {
                    var domWidth = obj.dom.width();
                    if (!domWidth&&obj.dom&&obj.dom.length) {
                        domWidth = obj.dom.get(0).scrollWidth;
                    }
                    var domHeight = obj.dom.height();
                    if (!domHeight&&obj.dom&&obj.dom.length) {
                        domHeight = obj.dom.get(0).scrollHeight;
                    }
                    var halfWidth = parseInt(parseInt(domWidth) / 2);
                    var halfHeight = parseInt(parseInt(domHeight) / 2);
                    container.css('marginTop', (halfHeight * -1) + 'px').css('marginLeft', (halfWidth * -1) + 'px');
                };
                function Scroll() {
                    var halfClientWidth = parseInt(parseInt(clientWidth()) / 2);
                    var halfClientHeight = parseInt(parseInt(clientHeight()) / 2);
                    container.css('top', (halfClientHeight + parseInt(document.documentElement.scrollTop)) + 'px').css('left', (halfClientWidth + parseInt(document.documentElement.scrollLeft)) + 'px');
                };
                function ChangePosition() {
                    Resize();
                    Scroll();
                };
                this.Resize = Resize;
                this.resize = Resize;
                this.Scroll = Scroll;
                this.scroll = Scroll;
                this.ChangePosition = ChangePosition;
                this.changePosition = ChangePosition;

                this.Open = function (openParams) {
                    if (openParams) {
                        Params(openParams);
                    }

                    if (cover) {
                        if (typeof (cover) == 'object') {
                            var coverStyle = '';
                            for (var i in cover) {
                                if ((i != 'position')&&(i != 'width')&&(i != 'height')&&(i != 'top')&&(i != 'left')) {
                                    var styleName = i;
                                    var matchUppercase = styleName.match(/[A-Z]/);
                                    if (matchUppercase) {
                                        matchUppercase = matchUppercase[0];
                                        styleName = styleName.replace(matchUppercase, '-' + matchUppercase.toLowerCase());
                                    }
                                    coverStyle += styleName + ':';
                                    coverStyle += cover[i] + ';';
                                }
                            }
                            cover = coverStyle;
                        }
                        coverDiv = $('<div style="position:' + (isFixed ? 'fixed' : 'absolute') + ';width:' + (isFixed ? '100%' : (clientWidth() + 'px')) + ';height:' + (isFixed ? '100%' : (clientHeight() + 'px')) + ';top:' + (isFixed ? '0' : document.documentElement.scrollTop) + ';left:' + (isFixed ? '0' : document.documentElement.scrollLeft) + ';background-color:gray;opacity:0.5;filter:alpha(opacity=50);' + cover + '">' + (isFixed ? '' : '<iframe style="width:' + clientWidth() + 'px;height:' + clientHeight() + 'px;filter:alpha(opacity=0);" src="about:blank" marginwidth="0" marginheight="0" scrolling="no" frameborder="no"></iframe>') + '</div>');
                        if (parent) {
                            parent.append(coverDiv);
                        }
                        else {
                            $(document.body).append(coverDiv);
                        }
                        if (!isFixed) {
                            if (!parent) {
                                $(window).resize(coverResize).scroll(coverScroll);
                            }
                        }
                    }

                    if (obj.dom || obj.html || obj.url) {
                        if (obj.dom) {
                            if (typeof (obj.dom) == 'string') {
                                obj.dom = $(obj.dom);
                            }
                            Popup();
                        }
                        else if (obj.html) {
                            obj.dom = $(obj.html);
                            Popup();
                        }
                        else if (obj.url) {
                            $.ajax({
                                type: "GET",
                                /*cache: false,*/
                                url: obj.url,
                                success: function (innerHTML) {
                                    obj.dom = $(innerHTML);
                                    Popup();
                                }
                            });
                        }
                    }

                    function Popup() {
                        container = $('<div style="display:none;position:' + (isFixed ? 'fixed' : 'absolute') + ';' + (zIndex ? ('z-index:' + zIndex + ';') : '') + 'top:50%;left:50%;"></div>');
                        container.append(obj.dom);
                        container.css('display', 'inline-block');
                        if (parent) {
                            parent.append(container);
                        }
                        else {
                            $(document.body).append(container);
                        }
                        if (!isFixed) {
                            ChangePosition();
                            if (!parent) {
                                $(window).resize(ChangePosition).scroll(ChangePosition);
                            }
                        }
                        else {
                            Resize();
                        }
                        if (closeBtn) {
                            var clsBtn;
                            if (typeof (closeBtn) == 'string') {
                                clsBtn = container.find(closeBtn);
                            }
                            else {
                                clsBtn = closeBtn;
                            }
                            clsBtn.unbind('click', _this.Close).click(_this.Close);
                        }
                        if (init) {
                            init.apply(_this);
                        }
                    };
                };
                this.open = this.Open;

                this.Close = function () {
                    var returnClose = true;
                    if (close) {
                        returnClose = close.apply(_this);
                    }
                    if (returnClose) {
                        $(document).append(obj.dom);
                        if (!parent) {
                            $(window).unbind('resize', ChangePosition).unbind('scroll', ChangePosition);
                        }
                        container.remove();
                        if (coverDiv) {
                            if (!parent) {
                                $(window).unbind('resize', coverResize).unbind('scroll', coverScroll);
                            }
                            coverDiv.remove();
                        }
                    }
                };
                this.close = this.Close;
            }
        )(args, $)) : null;
    };
});