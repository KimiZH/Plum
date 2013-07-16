using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_list : System.Web.UI.Page
{
    protected int pagesize = 10;
    protected int page = 1;
    protected int count = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            page = int.Parse(Request["page"].ToString());
        }
        catch
        {
            page = 1;
        }
        if (page <= 0) {
            page = 1;
        }

        var connStr = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["PlumDB"].ToString();
        System.Data.SqlClient.SqlConnection conn = new System.Data.SqlClient.SqlConnection(connStr);
        conn.Open();
        System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand(
            "select top " + pagesize.ToString() + " "
            + "id, product.title as product_title, product_type.title as product_type, number, product_type.price, source.title as [source], customer.name as name, customer.mobile as mobile, customer.[address] as [address], customer.[zipcode] as [zipcode], [status].title as [status], insertDatetime "
            + "from (((((PlumDB.dbo.main inner join PlumDB.dbo.product on main.[productId] = product.productid) "
            + "inner join PlumDB.dbo.[product_type] on main.[type] = [product_type].typeid) "
            + "inner join PlumDB.dbo.[source] on main.[source] = [source].sourceid) "
            + "left join PlumDB.dbo.customer on main.customerId = customer.customerid) "
            + "inner join PlumDB.dbo.[status] on main.[status] = [status].statusid) "
            + ((page > 1) ? "where (id not in (select top " + pagesize.ToString() + "*" + (page - 1).ToString() + " id from PlumDB.dbo.main order by insertDatetime desc)) " : "")
            + "order by insertDatetime desc "
            + "select COUNT(*) from PlumDB.dbo.main "
            + "select * from PlumDB.dbo.status with(nolock) order by statusid asc ",
            conn
        );
        System.Data.SqlClient.SqlDataAdapter adapter = new System.Data.SqlClient.SqlDataAdapter(cmd);
        System.Data.DataSet ds = new System.Data.DataSet();
        adapter.Fill(ds);
        ds.Dispose();
        adapter.Dispose();
        cmd.Dispose();
        conn.Close();

        this.listRepeater.DataSource = ds.Tables[0];
        this.listRepeater.DataBind();

        count = int.Parse(ds.Tables[1].Rows[0][0].ToString());

        this.statusRepeater.DataSource = ds.Tables[2];
        this.statusRepeater.DataBind();
    }
}