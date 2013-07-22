using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var err = false;
        var msgErr = "";

        var requestUserName = "";
        var requestPassWord = "";

        try
        {
            requestUserName = Request.Form["user"].ToString();
        }
        catch
        {
            err = true;
            msgErr = "user error";
        }

        try
        {
            requestPassWord = Request.Form["password"].ToString();
        }
        catch
        {
            err = true;
            msgErr = "password error";
        }

        if (!err) {
            if (requestUserName.Trim() == "")
            {
                err = true;
                msgErr = "user empty";
            }
            else if (requestPassWord.Trim() == "")
            {
                err = true;
                msgErr = "password empty";
            }
        }

        if (!err)
        {
            var connStr = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["PlumDB"].ToString();
            System.Data.SqlClient.SqlConnection conn = new System.Data.SqlClient.SqlConnection(connStr);
            conn.Open();
            System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand(
                "select * from [PlumDB].[dbo].[user] with(nolock) where [username] = @username and [password] = @password ",
                conn
            );

            cmd.Parameters.Add("@username", System.Data.SqlDbType.NChar);
            cmd.Parameters["@username"].Value = requestUserName.Trim();

            cmd.Parameters.Add("@password", System.Data.SqlDbType.NChar);
            cmd.Parameters["@password"].Value = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(requestPassWord.Trim(), "MD5");

            System.Data.SqlClient.SqlDataAdapter adapter = new System.Data.SqlClient.SqlDataAdapter(cmd);
            System.Data.DataSet ds = new System.Data.DataSet();
            adapter.Fill(ds);
            if (ds.Tables[0].Rows.Count < 1)
            {
                err = true;
                msgErr = "wrong username or wrong password";
            }
            else
            {
                Session["userid"] = int.Parse(ds.Tables[0].Rows[0]["userid"].ToString());
                Session["username"] = ds.Tables[0].Rows[0]["username"].ToString().Trim();
                Session["auth"] = int.Parse(ds.Tables[0].Rows[0]["auth"].ToString());
            }
            ds.Dispose();
            adapter.Dispose();
            cmd.Dispose();
            conn.Close();
        }

        if (err)
        {
            Response.Redirect("/admin/?err=" + System.Web.HttpUtility.UrlEncode(msgErr, System.Text.Encoding.GetEncoding(65001)).Replace("+", "%20"));
        }
        else
        {
            Response.Redirect("/admin/list.aspx");
        }
        Response.End();
    }
}