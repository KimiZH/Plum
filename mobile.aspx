<%@ Page Language="C#" AutoEventWireup="true" CodeFile="mobile.aspx.cs" Inherits="mobile" %><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>泰尔</title>

    <script type="text/javascript">
        window.km = window.km || {};
        window.km.config = {
            context: 'plum',
            debug: (function () {
                var debug = document.location.toString().toLowerCase().match(/[\?&]debug=([^&]*)(&|$)/);
                if (debug) {
                    debug = debug[1];
                    if ((debug == '1') || (debug.toLowerCase() == 'true')) {
                        return true;
                    }
                }
                return false;
            }),
            paths: {
                'cacheSvr': window.location.protocol + '//' + window.location.host
            }
        };
        var require = window.km.config;
    </script>
    <script type="text/javascript" src="<%if (debug) {%>/ui/src/js/require/2.0.4/main<%} else {%>/ui/dest/0.1.0/mobile<%} %>.js"></script>
    <script type="text/javascript">
        require.config({context: window.km.config.context})(['cacheSvr/ui/src/js/require/config/main', 'require'], function (config, require) {
            require(['cacheSvr/ui/src/js/page/mobile/main']);
        });
    </script>
</head>
<body>
    <div class="box">
        <div class="head">
            <div style="height: 384px;">
                &nbsp;</div>
            <div class="head_info">
                <p>
                    Hoodia P57--南非食用蝴蝶亚仙人掌（Hoodia）的天然有效成分，全球唯一健康、安全的天然食欲调节剂，在人体内能模仿血糖向大脑发出“饱腹感”信息，从而实现控制食欲、减肥或控制体重的目的。欧美大量临床研究证实：南非仙人掌P57源自食用植物，对人体没有任何副作用，男女老少皆宜，是目前欧美减肥的主流健康食品之一。</p>
            </div>
            <div class="clear">
            </div>
            <div class="order">
                <a href="#">&nbsp;</a>
            </div>
        </div>
        <!--head end -->
        <div class="clear">
        </div>
        <div class="trait">
            <div class="td_tit">
                <img src="/ui/src/js/page/mobile/_imgs/td_tit.gif" />
                <div class="clear">
                </div>
                <p>
                    <span>1.只减脂肪不减水分</span></p>
                <p>
                    泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品,</p>
                <p>
                    <span>2.是运动减肥的10倍</span></p>
                <p>
                    泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品，</p>
                <p>
                    <span>3.史上最安全的减肥</span></p>
                <p>
                    泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品，</p>
            </div>
            <!--td_tit end -->
            <div class="clear">
            </div>
            <div class="td_j">
                <img src="/ui/src/js/page/mobile/_imgs/td_j.gif" />
                <div class="clear">
                </div>
                <div class="left">
                    80:1高倍专利浓缩物（4倍于美国普通浓缩物），摄入1小时后让人产生饱腹感，体内有效作用时间15小时左右，能有效控制食欲，帮助减肥者和体重控制者减少热量和只放摄取，其减肥作用显著而持久，且健康、安全，对人体没有任何副作用。
                </div>
                <div class="right">
                    InterHealth nutraceuticals公司营养专利ChromeMate&amp;reg,维生素B3和营养元素铬的有机复合物，高活性的有机营养铬，参与人体能量及脂肪代谢，促进人体脂肪分解，其减肥作用由全球大量临床验证。
                </div>
                <div class="clear">
                </div>
            </div>
            <!--td_j -->
            <div class="clear">
            </div>
            <img src="/ui/src/js/page/mobile/_imgs/ad1.gif" />
            <div class="clear">
            </div>
            <div class="p57">
                <div class="g1">
                    <p>
                        <span>泰尔超级p57</span></p>
                    <p>
                        泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品，泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12。</p>
                </div>
                <div class="g2">
                    <p>
                        <span>泰尔超级p57</span></p>
                    <p>
                        泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品，泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12。</p>
                </div>
            </div>
            <!--p57 end -->
            <div class="order">
                <a href="#">&nbsp;</a>
            </div>
            <div class="clear">
            </div>
        </div>
        <!--trait end -->
        <div class="buy">
            <form id="form1" name="form1" method="post" action="posthandler.aspx" target="_self">
                <div class="form">
                    <input name="number" type="hidden" value="1" />
                    <input name="source" type="hidden" value="1" />
                    <asp:Repeater ID="typeidRepeater" runat="server">
                        <ItemTemplate>
                            <p>
                                <label>
                                    <input name="typeid" type="radio" value="<%# Eval("typeid") %>" />
                                    <%# Eval("title") %>
                                </label>
                            </p>
                        </ItemTemplate>
                    </asp:Repeater>
                </div>
                <input class="name" name="name" type="text" value="Kimi" maxlength="5" />
                <div class="clear">
                </div>
                <div class="area1">
                    <select name="area1" id="area1">
                        <option>上海</option>
                    </select>
                </div>
                <div class="area2">
                    <select name="area2" id="area2">
                        <option>上海</option>
                    </select>
                </div>
                <div class="clear">
                </div>
                <input class="adress" name="address" type="text" value="上海市徐汇区" maxlength="25" />
                <div class="clear">
                </div>
                <input class="adress" name="zipcode" type="text" value="200000" maxlength="10" />
                <div class="clear">
                </div>
                <input class="adress" name="mobile" type="text" value="13800001111" maxlength="11" />
                <div class="clear">
                </div>
                <button class="button" type="submit"></button>
            </form>
        </div>
        <!--buy end -->
    </div>
    <!--box end -->
</body>
</html>