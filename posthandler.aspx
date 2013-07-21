<%@ Page Language="C#" AutoEventWireup="true" CodeFile="posthandler.aspx.cs" Inherits="posthandler" %><!DOCTYPE html>
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
        #msg
        {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin: 1em 0;
        }
        #msg span
        {
            font-size: 12px;
            font-weight: normal;
        }
        .section9
        {
            float: left;
            width: 100%;
            background-color: #58ac00;
            padding: 1em 0;
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
    <script type="text/javascript" src="<%if (debug) {%>/ui/src/js/require/2.0.4/main<%} else {%>/ui/dest/0.1.0/posthandler<%} %>.js"></script>
    <script type="text/javascript">
        require.config({context: window.km.config.context})(['cacheSvr/ui/src/js/require/config/main', 'require'], function (config, require) {
            require(['cacheSvr/ui/src/js/page/posthandler/main']);
        });
    </script>
</head>
<body>
    <div class="container">
        <img class="section1" src="/ui/src/js/page/mobile/_imgs/section1.jpg" />
        <div id="msg" runat="server">
            您的订单已提交成功！<br />
            您的瘦身顾问会在24小时内跟您核实订单，并进行配送，祝您瘦出美丽曲线！
        </div>
        <div class="section9">
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