<%@ Page Language="C#" AutoEventWireup="true" CodeFile="default.aspx.cs" Inherits="Admin_default" %><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Admin Login</title>

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
    <script type="text/javascript" src="<%if (debug) {%>/ui/src/js/require/2.0.4/main<%} else {%>/ui/dest/0.1.0/admin/default<%} %>.js"></script>
    <script type="text/javascript">
        require.config({context: window.km.config.context})(['cacheSvr/ui/src/js/require/config/main', 'require'], function (config, require) {
            require(['cacheSvr/ui/src/js/page/admin/default/main']);
        });
    </script>
</head>
<body>

    <div class="plum-container plum-admin-body">
        <div class="plum-container plum-amdin-login">
            <div class="plum-amdin-login-top-left">Mobilize & Socialize</div>
            <div class="plum-amdin-login-top-right"></div>
        </div>
        <div class="plum-container plum-amdin-login-title">WE-ME 电子营销后台管理系统</div>
        <div class="plum-container plum-admin-login-table-container">
            <div id="msgErr" style="color: Red; padding-bottom: 1em;">&nbsp;</div>
            <div class="plum-container plum-admin-login-table">
                <form method="post" action="/admin/login.aspx" target="_self">
                    <div class="plum-admin-login-name"><input class="plum-admin-login-name" name="user" type="text" /></div>
                    <div class="plum-admin-login-password"><input class="plum-admin-login-password" name="password" type="password" /></div>
                    <div class="plum-admin-login-table-btn">
                        <button type="submit">登 陆</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="plum-container plum-amdin-login-icon1"></div>
        <div class="plum-container plum-amdin-bottom">All rights reserved © 2013 EWE Digital - 沪ICP备13016439号</div>
    </div>

</body>
</html>
