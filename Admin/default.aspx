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

    <div style="margin: 6em auto 0 auto; width: 250px; text-align: center;">
        <div id="msgErr" style="color: Red; padding-bottom: 1em;">&nbsp;</div>
        <form method="post" action="/admin/login.aspx" target="_self">
            用户：<input name="user" type="text" /><br />
            密码：<input name="password" type="password" /><br />
            <br />
            <input type="submit" value="登陆" />
        </form>
    </div>

</body>
</html>
