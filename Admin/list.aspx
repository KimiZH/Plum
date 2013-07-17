<%@ Page Language="C#" AutoEventWireup="true" CodeFile="list.aspx.cs" Inherits="Admin_list" %><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Admin List</title>

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
        
        document.write('<scr' + 'ipt type="text/javascr' + 'ipt" src="' + window.km.config.paths.cacheSvr + 
            (window.km.config.debug ? '/ui/src/js/require/2.0.4/main' : '/ui/dist/0.1.0/masterpage') 
        + '.js"></scr' + 'ipt>');
    </script>
    <script type="text/javascript">
        require.config({context: window.km.config.context})(['cacheSvr/ui/src/js/require/config/main', 'require'], function (config, require) {
            require(['cacheSvr/ui/src/js/page/admin/list/main']);
        });
    </script>
</head>
<body>
    <%if (auth >= 0)
      {%>
    <table width="100%">
        <tr>
            <td>订单号</td>
            <td>产品</td>
            <td>套餐</td>
            <td>数量</td>
            <td>价格</td>
            <td>来源</td>
            <td>客户</td>
            <td>电话</td>
            <td>地址</td>
            <td>邮编</td>
            <td>状态</td>
            <td>时间</td>
            <%if (auth < 1000)
                {%>
            <td align="center">操作</td>
            <%} %>
        </tr>
        <asp:Repeater ID="listRepeater" runat="server">
            <ItemTemplate>
                <tr class="plum-admin-list-item">
                    <td class="plum-admin-list-id-feild"><%# Eval("id") %></td>
                    <td><%# Eval("product_title") %></td>
                    <td><%# Eval("product_type") %></td>
                    <td><%# Eval("number") %></td>
                    <td><%# Eval("price") %></td>
                    <td><%# Eval("source") %></td>
                    <td><%# Eval("name") %></td>
                    <td><%# Eval("mobile") %></td>
                    <td><%# Eval("address") %></td>
                    <td><%# Eval("zipcode") %></td>
                    <td class="plum-admin-list-status-feild"><%# Eval("status").ToString().Trim() %></td>
                    <td><%# Eval("insertDatetime") %></td>
                    <%if (auth < 1000)
                        {%>
                    <td align="center">
                        <button class="plum-admin-list-btn-status">确定</button>
                        <button class="plum-admin-list-btn-del">删除</button>
                    </td>
                    <%} %>
                </tr>
            </ItemTemplate>
        </asp:Repeater>
    </table>

    <br />

    <div class="plum-page"><%=pageLink%></div>

    <div id="plum-hide" style="display:none;">
        <select name="status">
            <asp:Repeater ID="statusRepeater" runat="server">
                <ItemTemplate>
                    <option value="<%# Eval("statusid") %>"><%# Eval("title").ToString().Trim() %></option>
                </ItemTemplate>
            </asp:Repeater>
        </select>

        <form id="plum-admin-list-frm-status" method="post" action="/admin/updatestatus.aspx" target="_self">
            <input name="url" type="hidden" />
            <input name="id" type="hidden" />
            <input name="status" type="hidden" />
        </form>
        <form id="plum-admin-list-frm-del" method="post" action="/admin/del.aspx" target="_self">
            <input name="url" type="hidden" />
            <input name="id" type="hidden" />
        </form>
    </div>
    <%} %>
</body>
</html>