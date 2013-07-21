using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class mobile : System.Web.UI.Page
{
    protected bool debug = bool.Parse(System.Web.Configuration.WebConfigurationManager.AppSettings["debug"].ToString());
    protected void Page_Load(object sender, EventArgs e)
    {
        var err = false;
        var msgErr = "";

        var requestProduct = "";

        try
        {
            requestProduct = Page.RouteData.Values["product"].ToString();
        }
        catch
        {
            err = true;
            msgErr = "product error";
        }
        if (err) {
            requestProduct = "1";
        }

        if (!err)
        {
            if (String.IsNullOrEmpty(requestProduct) || !System.Text.RegularExpressions.Regex.IsMatch(requestProduct, "\\d+"))
            {
                err = true;
                msgErr = "product error";
            }
        
        }

        if (!err)
        {
            var connStr = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["PlumDB"].ToString();
            System.Data.SqlClient.SqlConnection conn = new System.Data.SqlClient.SqlConnection(connStr);
            conn.Open();
            System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand(
                "select product_type.*, product.title as product_title from (PlumDB.dbo.product_type inner join PlumDB.dbo.product on product_type.productid = [product].productid) "
                + "where product_type.productid = " + requestProduct + " "
                + " order by typeid asc ",
                conn
            );
            System.Data.SqlClient.SqlDataAdapter adapter = new System.Data.SqlClient.SqlDataAdapter(cmd);
            System.Data.DataSet ds = new System.Data.DataSet();
            adapter.Fill(ds);
            ds.Dispose();
            adapter.Dispose();
            cmd.Dispose();
            conn.Close();

            this.typeidRepeater.DataSource = ds.Tables[0];
            this.typeidRepeater.DataBind();
        }
    }
}