using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_default : System.Web.UI.Page
{
    protected bool debug = bool.Parse(System.Web.Configuration.WebConfigurationManager.AppSettings["debug"].ToString());
    protected void Page_Load(object sender, EventArgs e)
    {

    }
}