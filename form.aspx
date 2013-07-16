<%@ Page Language="C#" AutoEventWireup="true" CodeFile="form.aspx.cs" Inherits="form" %><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Plum</title>
</head>
<body>
    
    <form method="post" action="posthandler.aspx" target="_self">
        产品：<br />
        <asp:Repeater ID="typeidRepeater" runat="server">
            <ItemTemplate>
                <input name="typeid" type="radio" value="<%# Eval("typeid") %>" /><%# Eval("product_title") %>-<%# Eval("title") %> 价格：<%# Eval("price") %><br />
            </ItemTemplate>
        </asp:Repeater>

        数量：<input name="number" type="text" value="2" maxlength="5" /><br />
        来源：<input name="source" type="text" value="2" maxlength="2" /><br />
        名称：<input name="name" type="text" value="Kimi" maxlength="5" /><br />
        电话：<input name="mobile" type="text" value="13800001111" maxlength="11" /><br />
        地址：<input name="address" type="text" value="上海市徐汇区" maxlength="25" /><br />
        邮编：<input name="zipcode" type="text" value="200000" maxlength="10" /><br />

        <button type="submit">确定</button>
    </form>

</body>
</html>