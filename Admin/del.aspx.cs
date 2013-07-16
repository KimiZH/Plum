using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_del : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var err = false;
        var msgErr = "";

        var requestURL = "";
        var requestId = "";

        try
        {
            requestURL = Request["url"].ToString();
        }
        catch
        {
            err = true;
            msgErr = "url error";
        }
        if (!err)
        {
            try
            {
                requestId = Request["id"].ToString();
            }
            catch
            {
                err = true;
                msgErr = "id error";
            }
        }

        if (!err)
        {
            if (String.IsNullOrEmpty(requestURL))
            {
                err = true;
                msgErr = "url error";
            }
            else if (String.IsNullOrEmpty(requestId) || !System.Text.RegularExpressions.Regex.IsMatch(requestId, "\\d+"))
            {
                err = true;
                msgErr = "id error";
            }
        }

        if (!err)
        {
            var connStr = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["PlumDB"].ToString();
            System.Data.SqlClient.SqlConnection conn = new System.Data.SqlClient.SqlConnection(connStr);
            conn.Open();
            System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand(
                "select id from PlumDB.dbo.main with(nolock) where id = " + requestId + " ",
                conn
            );
            System.Data.SqlClient.SqlDataAdapter adapter = new System.Data.SqlClient.SqlDataAdapter(cmd);
            System.Data.DataSet ds = new System.Data.DataSet();
            adapter.Fill(ds);
            if (ds.Tables[0].Rows.Count < 1)
            {
                err = true;
                msgErr = "id error";
            }
            ds.Dispose();

            var result = 0;
            if (!err)
            {
                cmd = new System.Data.SqlClient.SqlCommand(
                    "delete from PlumDB.dbo.main where id = " + requestId + " ",
                    conn
                );
                result = cmd.ExecuteNonQuery();
            }

            adapter.Dispose();
            cmd.Dispose();
            conn.Close();

            if (result < 1)
            {
                err = true;
                msgErr = "delete error";
            }
        }

        if (err)
        {
            Response.Write(msgErr);
        }
        else
        {
            Response.Redirect(requestURL);
        }
    }
}