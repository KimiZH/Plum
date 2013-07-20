<%@ Page Language="C#" AutoEventWireup="true" CodeFile="mobile.aspx.cs" Inherits="mobile" %><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>泰尔</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    <style type="text/css">
        body
        {
            margin: 0;
            padding: 0;
            font-family: Microsoft YaHei, SimSun;
            font-size: 12px;
            color: #222;
        }
        .container
        {
            margin: 0 auto;
            min-width: 320px;
            max-width: 768px;
        }
        .section1
        {
            width: 100%;
        }
        .section2 
        {
            text-indent: 2em;
            margin: 0 5% 1em 5%;
        }
        .section-btn
        {
            margin: 0 5%;
        }
        .section-btn-left,
        .section-btn-right
        {
            display: block;
            float: left;
        }
        .section-btn-left
        {
            width: 65%
        }
        .section-btn-right
        {
            width: 33%;
            margin-left: 2%;
        }
        .section-btn-left img,
        .section-btn-right img
        {
            width: 100%;
        }
        .section3
        {
            width: 100%;
            margin-top: 1em;
        }
        .section5
        {
            background-color: #ccff9a;
            margin-top: -1%;
            padding: 1em 5%;
        }
        .section5 p
        {
            font-weight: bold;
            margin: 0.5em 0;
        }
        .section6
        {
            background-color: ##f7fff6;
            padding: 1em 5% 0 5%;
        }
        .section6-left,
        .section6-right
        {
            width: 42%;
        }
        .section6-middle
        {
            width: 16%;
        }
        .section6-left,
        .section6-middle
        {
            float: left;
        }
        .section6-right
        {
            float: right;
        }
        .section6-left img,
        .section6-right img
        {
            width: 68%;
            margin: 0 16%;
        }
        .section6-middle img
        {
            width: 49%;
            margin: 0 25.5%;
        }
        .section7
        {
            width: 100%;
            margin-bottom: 1em;
        }
        .section8
        {
            position: relative;
            float: left;
            width: 100%;
            margin-top: 1em;
        }
        .section8 img
        {
            /*position: absolute;*/
            width: 100%;
        }
        .section8-txt1,
        .section8-txt2
        {
            position: absolute;
            left: 24.17%;
            width: 74.58%;
            height: 36.29%;
            overflow: hidden;
        }
        .section8-txt1
        {
            top: 8.45%;
        }
        .section8-txt2
        {
            top: 58.35%;
        }
        .section8 p
        {
            margin: 0 5%;
        }
        .section8 .section8-title
        {
            font-size: 18px;
            padding: 0.4em 0;
        }
        @media (min-width: 320px) and (max-width: 449px) 
        {
            .section8 p
            {
                font-size: 10px;
            }
            .section8 .section8-title
            {
                font-size: 16px;
                padding: 0 0 0.1em 0;
            }
        }
        .section9
        {
            float: left;
            width: 100%;
            background-color: #58ac00;
            padding: 1em 0;
        }
        .form-radio
        {
            position: relative;
            margin: 0 5%;
            background: url(/ui/src/js/page/mobile/_imgs/section9-line.jpg) repeat-x center bottom;
        }
        .form-radio img
        {
            width: 7.64%;
            margin: 0.5em 0;
        }
        .form-radio input
        {
            /*
            position: absolute;
            height: 80%;
            width: 7.64%;
            margin-left: -7.64%;
            */
        }
        .form-radio span
        {
            /*
            position: absolute;
            top: 50%;
            margin-top: -14px;
            */
            font-size: 18px;
            line-height: 2.5em;
            color: #fff;
            margin-left: 0.5em;
        }
        .form-table
        {
            margin: 0 12.64%;
            padding: 2em 0 0 0;
        }
        .form-lable
        {
            font-size: 18px;
            color: #fff;
            text-align: right;
            /*
            letter-spacing: 0.5em;
            width: 6.5em;
            */
            width: 4.5em;
        }
        .form-input-container
        {
            position: relative;
        }
        .form-input-bg
        {
            width: 0.46%;
        }
        .form-input
        {
            width: 100%;
            /*
            position: absolute;
            top: 0;
            left: 0;
            width: 90%;
            padding-left: 5%;
            padding-right: 5%;
            height: 100%;
            border: 0;
            */
            font-size: 16px;
            color: #222;
            /*
            background: transparent url(/ui/src/js/page/mobile/_imgs/input.png) no-repeat center center;
            background-size: cover;
            */
        }
        .form-submit
        {
            position: relative;
            text-align: center;
            margin: 1.5em 0;
        }
        .form-submit img
        {
            width: 40%;
        }
        .form-submit button
        {
            position: absolute;
            top: 0;
            left: 30%;
            width: 40%;
            height: 100%;
            padding: 0;
            border: 0;
            background: transparent;
            cursor: pointer;
        }
        
        .section10
        {
            margin: 0 12%;
            background-color: #8cc552;
            font-size: 15px;
            color: #16410c;
            padding: 1em 5%;
        }
        .section11
        {
            text-align: center;
            position: relative;
            margin-top: 1em;
        }
        .section11 img
        {
            width: 50%;
        }
        .section11 a
        {
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -25%;
            width: 50%;
            height: 100%;
            text-indent: -99999px;
        }
        .section12
        {
            height: 2px;
            margin: 1em 5%;
            background: url(/ui/src/js/page/mobile/_imgs/section9-line.jpg) repeat-x center center;
        }
        .section13
        {
            margin: 0 12%;
            background-color: #8cc552;
            font-size: 15px;
            color: #16410c;
            padding: 1em 5%;
        }
        .section13-container
        {
            margin-left: 50%;
        }
        .section13 p
        {
            margin: 0 0 0 -4.5em;
            padding-left: 12px;
            background: url(/ui/src/js/page/mobile/_imgs/icon-hook.png) no-repeat left 6px;
        }
        .section13 p img
        {
            height: 100%;
            margin-right: 0.5em;
        }
        .section14
        {
            margin-top: 1.2em;
            text-align: center;
            font-size: 16px;
            color: #fff;
        }
    </style>

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
    <div class="container">
        <img class="section1" src="/ui/src/js/page/mobile/_imgs/section1.jpg" />
        <div class="section2">
            Hoodia P57--南非食用蝴蝶亚仙人掌（Hoodia）的天然有效成分，全球唯一健康、安全的天然食欲调节剂，在人体内能模仿血糖向大脑发出“饱腹感”信息，从而实现控制食欲、减肥或控制体重的目的。欧美大量临床研究证实：南非仙人掌P57源自食用植物，对人体没有任何副作用，男女老少皆宜，是目前欧美减肥的主流健康食品之一。
        </div>
        <div class="section-btn">
            <a class="section-btn-left" href="tel:4001889892"><img src="/ui/src/js/page/mobile/_imgs/btn-tel.jpg" /></a>
            <a class="section-btn-right" href="javascript:void(0);"><img src="/ui/src/js/page/mobile/_imgs/btn-order.jpg" /></a>
        </div>
        <img class="section3" src="/ui/src/js/page/mobile/_imgs/section3.jpg" />
        <div class="section5">
            <p>1.只减脂肪不减水分</p>
            <p>泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品,</p>
            <p>2.是运动减肥的10倍</p>
            <p>泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品，</p>
            <p>3.史上最安全的减肥</p>
            <p>泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品，</p>
        </div>
        <div class="section6">
            <div class="section6-left">
                <img src="/ui/src/js/page/mobile/_imgs/section6-left.jpg" />
                <p>80:1高倍专利浓缩物（4倍于美国普通浓缩物），摄入1小时后让人产生饱腹感，体内有效作用时间15小时左右，能有效控制食欲，帮助减肥者和体重控制者减少热量和只放摄取，其减肥作用显著而持久，且健康、安全，对人体没有任何副作用。</p>
            </div>
            <div class="section6-middle">
                <img src="/ui/src/js/page/mobile/_imgs/section6-middle.jpg" />
            </div>
            <div class="section6-right">
                <img src="/ui/src/js/page/mobile/_imgs/section6-left.jpg" />
                <p>InterHealth nutraceuticals公司营养专利ChromeMate&reg,维生素B3和营养元素铬的有机复合物，高活性的有机营养铬，参与人体能量及脂肪代谢，促进人体脂肪分解，其减肥作用由全球大量临床验证。</p>
            </div>
        </div>
        <img class="section7" src="/ui/src/js/page/mobile/_imgs/section7.jpg" />
        <div class="section-btn">
            <a class="section-btn-left" href="tel:4001889892"><img src="/ui/src/js/page/mobile/_imgs/btn-tel.jpg" /></a>
            <a class="section-btn-right" href="javascript:void(0);"><img src="/ui/src/js/page/mobile/_imgs/btn-order.jpg" /></a>
        </div>
        <div class="section8">
            <img src="/ui/src/js/page/mobile/_imgs/section8.jpg" />
            <div class="section8-txt1">
                <p class="section8-title">泰尔超级p57</p>
                <p class="section8-desc">泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品，泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12。</p>
            </div>
            <div class="section8-txt2">
                <p class="section8-title">泰尔超级p57</p>
                <p class="section8-desc">泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12、泰尔维亭、斐姿Ⅱ、膳通等保健品，泰尔超级p57商城是保健品行业领先的绿色服务商城，公司专注于绿色健康领域，已连续多年在中国市场内获得用户青睐。产品包括：超级p57、突击12。</p>
            </div>
        </div>
        <div class="section9">
            <form method="post" action="posthandler.aspx" target="_self">
                <input name="number" type="hidden" value="1" />
                <input name="source" type="hidden" value="1" />
                <asp:Repeater ID="typeidRepeater" runat="server">
                    <ItemTemplate>
                        <div class="form-radio">
                            <!--<img src="/ui/src/js/page/mobile/_imgs/radio-btn.jpg" />-->
                            <input name="typeid" type="radio" value="<%# Eval("typeid") %>" />
                            <span><%# Eval("title") %></span>
                        </div>
                    </ItemTemplate>
                </asp:Repeater>
                <div class="form-table">
                    <table style="width:100%;">
                        <tr>
                            <td class="form-lable">收&nbsp;&nbsp;件&nbsp;&nbsp;人&nbsp;</td>
                            <td class="form-input-container">
                                <!--<img class="form-input-bg" src="/ui/src/js/page/mobile/_imgs/input-bg.jpg" />-->
                                <input class="form-input" name="name" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="form-lable">地&nbsp;&nbsp;址&nbsp;</td>
                            <td class="form-input-container">
                                <!--<img class="form-input-bg" src="/ui/src/js/page/mobile/_imgs/input-bg.jpg" />-->
                                <input class="form-input" name="address" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="form-lable">邮&nbsp;&nbsp;编&nbsp;</td>
                            <td class="form-input-container">
                                <!--<img class="form-input-bg" src="/ui/src/js/page/mobile/_imgs/input-bg.jpg" />-->
                                <input class="form-input" name="zipcode" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="form-lable">收件电话&nbsp;</td>
                            <td class="form-input-container">
                                <!--<img class="form-input-bg" src="/ui/src/js/page/mobile/_imgs/input-bg.jpg" />-->
                                <input class="form-input" name="mobile" type="text" />
                            </td>
                        </tr>
                    </table>
                    <div class="form-submit">
                        <img src="/ui/src/js/page/mobile/_imgs/submit.png" />
                        <button type="submit"></button>
                    </div>
                </div>
            </form>
            <div class="section10">
                提交订单不会扣话费，我们的客服人员会尽快和您确认订单信息。
            </div>
            <div class="section11">
                <img src="/ui/src/js/page/mobile/_imgs/tel.png" />
                <a href="tel:4001889892">4001889892</a>
            </div>
            <div class="section12">&nbsp;</div>
            <div class="section13">
                <div class="section13-container">
                    <p>全国免费送货</p>
                    <p>货到付款 资料保密</p>
                    <p>正品保证 假一陪十</p>
                </div>
            </div>
            <div class="section14">
                订购电话：400-188-9892<br />
                荣誉：中国电商协会认证网站
            </div>
        </div>
    </div>
</body>
</html>