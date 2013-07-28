using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_list : System.Web.UI.Page
{
    protected bool debug = bool.Parse(System.Web.Configuration.WebConfigurationManager.AppSettings["debug"].ToString());
    protected int auth = -1;
    protected string username = "";
    protected int pagesize = 30;
    protected int page = 1;
    protected int count = 0;
    protected string pageLink = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            auth = int.Parse(Session["auth"].ToString());
        }
        catch { }
        if (auth < 0) {
            Response.Redirect("/admin");
            Response.End();
            return;
        }
        try
        {
            username = Session["username"].ToString();
        }
        catch { }

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
            + "id, product.title as product_title, left(product_type.title, 5) as product_type, number, cast(product_type.price as decimal(38,0)) as price, source.title as [source], customer.name as name, customer.mobile as mobile, customer.[address] as [address], customer.[zipcode] as [zipcode], [status].title as [status], convert(varchar(100), insertDatetime, 120) as insertDatetime "
            + "from (((((PlumDB.dbo.main inner join PlumDB.dbo.product on main.[productId] = product.productid) "
            + "inner join PlumDB.dbo.[product_type] on main.[type] = [product_type].typeid) "
            + "inner join PlumDB.dbo.[source] on main.[source] = [source].sourceid) "
            + "left join PlumDB.dbo.customer on main.customerId = customer.customerid) "
            + "inner join PlumDB.dbo.[status] on main.[status] = [status].statusid) "
            + ((page > 1) ? "where (id not in (select top " + (pagesize * (page - 1)).ToString() + " id from PlumDB.dbo.main order by insertDatetime desc)) " : "")
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

        var countPage = (count / pagesize) + ((count % pagesize) > 0 ? 1 : 0);
        var pageLinkSize = 4;
        var url = System.Text.RegularExpressions.Regex.Replace(Request.Url.ToString(), "[\\?&]page=[^&]*?$", "", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        url = System.Text.RegularExpressions.Regex.Replace(url, "([\\?&])page=[^&]*?&", "$1", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        var separator = System.Text.RegularExpressions.Regex.IsMatch(url, "\\?", System.Text.RegularExpressions.RegexOptions.IgnoreCase) ? "&" : "?";
        var begin = 1;
        var end = countPage;
        if ((pageLinkSize * 2 + 1) < countPage)
        {
            if ((page - pageLinkSize) < 1)
            {
                end = pageLinkSize * 2 + 1;
            }
            else if ((page + pageLinkSize) > countPage)
            {
                begin = end - (pageLinkSize * 2 + 1);
            }
            else {
                begin = page - pageLinkSize;
                end = page + pageLinkSize;
            }
        }
        for (var i = begin; i <= end; i++) {
            var link = "";
            if (i == 1)
            {
                link = url;
            }
            else
            {
                link = url + separator + "page=" + i;
            }
            if (i == page)
            {
                pageLink += "<span>" + i + "</span>";
            }
            else
            {
                pageLink += "<a href=\"" + link + "\">" + i + "</a>";
            }
        }
        if (begin > 1)
        {
            pageLink = "<a href=\"" + url + "\">首页</a>" + pageLink;
        }
        if (end < countPage)
        {
            pageLink += "<a href=\"" + url + separator + "page=" + countPage + "\">尾页</a>";
        }

        this.statusRepeater.DataSource = ds.Tables[2];
        this.statusRepeater.DataBind();
    }
}