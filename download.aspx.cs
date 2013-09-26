using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class download : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var path = "";
        try
        {
            path = Page.RouteData.Values["path"].ToString();
        }
        catch (Exception ex) {
            ;
        }

        if ((path != "") && System.IO.File.Exists(AppDomain.CurrentDomain.BaseDirectory + path))
        {
            var arrPath = path.Split('\\');
            Response.AddHeader("Content-Disposition", "attachment;filename=" + arrPath[arrPath.Length - 1]);
            Response.ContentType = "application/octet-stream";
            Response.WriteFile(AppDomain.CurrentDomain.BaseDirectory + path);
        }
    }
}