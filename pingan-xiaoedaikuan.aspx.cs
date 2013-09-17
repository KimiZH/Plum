using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pingan_xiaoedaikuan : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var url = "http://dk.360doo.com" + System.Text.RegularExpressions.Regex.Replace(Request.Url.PathAndQuery, "^/pasydk/", "/dk/");
        Response.Redirect(url, true);
    }
}