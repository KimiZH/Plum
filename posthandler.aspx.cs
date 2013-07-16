using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class posthandler : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var err = false;
        var msgErr = "";

        var requestTypeId = "";
        var requestSource = "";
        var requestNum = "";
        var requestName = "";
        var requestMobile = "";
        var requestAddress = "";
        var requestZipCode = "";
        var productId = "";

        try
        {
            requestTypeId = Request["typeid"].ToString();
        }
        catch
        {
            err = true;
            msgErr = "type error";
        }
        if (!err)
        {
            try
            {
                requestSource = Request["source"].ToString();
            }
            catch
            {
                err = true;
                msgErr = "source error";
            }
        }
        if (!err) {
            try
            {
                requestNum = Request["number"].ToString();
            }
            catch
            {
                err = true;
                msgErr = "number error";
            }
        }
        if (!err)
        {
            try
            {
                requestName = Request["name"].ToString();
            }
            catch
            {
                err = true;
                msgErr = "name error";
            }
        }
        if (!err)
        {
            try
            {
                requestMobile = Request["mobile"].ToString();
            }
            catch
            {
                err = true;
                msgErr = "mobile error";
            }
        }
        if (!err)
        {
            try
            {
                requestAddress = Request["address"].ToString();
            }
            catch
            {
                err = true;
                msgErr = "address error";
            }
        }
        if (!err)
        {
            try
            {
                requestZipCode = Request["zipcode"].ToString();
            }
            catch
            {
                err = true;
                msgErr = "zipcode error";
            }
        }

        if (!err)
        {
            if (String.IsNullOrEmpty(requestName) || (requestName.Length > 10))
            {
                err = true;
                msgErr = "name error";
            }
            else if (String.IsNullOrEmpty(requestMobile) || !System.Text.RegularExpressions.Regex.IsMatch(requestMobile, "\\d{11}"))
            {
                err = true;
                msgErr = "mobile error";
            }
            else if (String.IsNullOrEmpty(requestAddress) || (requestAddress.Length > 50))
            {
                err = true;
                msgErr = "address error";
            }
            else if (!String.IsNullOrEmpty(requestZipCode))
            {
                if (requestZipCode.Length > 10)
                {
                    err = true;
                    msgErr = "zip code error";
                }
            }
            else if (String.IsNullOrEmpty(requestTypeId) || !System.Text.RegularExpressions.Regex.IsMatch(requestTypeId, "\\d+"))
            {
                err = true;
                msgErr = "product type error";
            }
            else if (String.IsNullOrEmpty(requestNum) || !System.Text.RegularExpressions.Regex.IsMatch(requestNum, "\\d+")) {
                err = true;
                msgErr = "number error";
            }
            else if (String.IsNullOrEmpty(requestSource) || !System.Text.RegularExpressions.Regex.IsMatch(requestMobile, "\\d+"))
            {
                err = true;
                msgErr = "source error";
            }
        }

        if (!err)
        {
            var connStr = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["PlumDB"].ToString();
            System.Data.SqlClient.SqlConnection conn = new System.Data.SqlClient.SqlConnection(connStr);
            conn.Open();
            System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand(
                "select typeid,productid from PlumDB.dbo.product_type with(nolock) order by typeid asc "
                + "select sourceid from PlumDB.dbo.source with(nolock) order by sourceid asc ",
                conn
            );
            System.Data.SqlClient.SqlDataAdapter adapter = new System.Data.SqlClient.SqlDataAdapter(cmd);
            System.Data.DataSet dsValid = new System.Data.DataSet();
            adapter.Fill(dsValid);
            dsValid.Dispose();
            var flg = false;
            for (var i = 0; i < dsValid.Tables[0].Rows.Count; i++)
            {
                if (requestTypeId == dsValid.Tables[0].Rows[i][0].ToString())
                {
                    productId = dsValid.Tables[0].Rows[i]["productid"].ToString();
                    flg = true;
                    break;
                }
            }
            if (!flg) {
                err = true;
                msgErr = "type error";
            }
            if (!err)
            {
                flg = false;
                for (var i = 0; i < dsValid.Tables[1].Rows.Count; i++)
                {
                    if (requestSource == dsValid.Tables[1].Rows[i][0].ToString())
                    {
                        flg = true;
                        break;
                    }
                }
                if (!flg)
                {
                    err = true;
                    msgErr = "source error";
                }
            }

            if (!err)
            {
                var customerId = 0;
                var mainId = 0;

                try
                {
                    cmd = new System.Data.SqlClient.SqlCommand(
                        "insert into PlumDB.dbo.customer values(@name, @mobile, @address, @zipcode) select IDENT_CURRENT('PlumDB.dbo.customer')",
                        conn
                    );
                    cmd.Parameters.Add("@name", System.Data.SqlDbType.NChar);
                    cmd.Parameters["@name"].Value = requestName;

                    cmd.Parameters.Add("@mobile", System.Data.SqlDbType.NChar);
                    cmd.Parameters["@mobile"].Value = requestMobile;

                    cmd.Parameters.Add("@address", System.Data.SqlDbType.NVarChar);
                    cmd.Parameters["@address"].Value = requestAddress;

                    cmd.Parameters.Add("@zipcode", System.Data.SqlDbType.NVarChar);
                    cmd.Parameters["@zipcode"].Value = requestZipCode;

                    try
                    {
                        adapter = new System.Data.SqlClient.SqlDataAdapter(cmd);
                        System.Data.DataSet ds = new System.Data.DataSet();
                        adapter.Fill(ds);
                        customerId = int.Parse(ds.Tables[0].Rows[0][0].ToString());
                        ds.Dispose();
                    }
                    catch { }

                    if (customerId > 0)
                    {
                        cmd = new System.Data.SqlClient.SqlCommand(
                            "insert into PlumDB.dbo.main (productId, type, source, customerId, status, number) values (@productId, @typeId, @source, @customerId, @status, @number) select IDENT_CURRENT('PlumDB.dbo.main')",
                            conn
                        );

                        cmd.Parameters.Add("@productId", System.Data.SqlDbType.Int);
                        cmd.Parameters["@productId"].Value = productId;

                        cmd.Parameters.Add("@typeId", System.Data.SqlDbType.Int);
                        cmd.Parameters["@typeId"].Value = requestTypeId;

                        cmd.Parameters.Add("@source", System.Data.SqlDbType.Int);
                        cmd.Parameters["@source"].Value = requestSource;

                        cmd.Parameters.Add("@customerId", System.Data.SqlDbType.BigInt);
                        cmd.Parameters["@customerId"].Value = customerId;

                        cmd.Parameters.Add("@status", System.Data.SqlDbType.Int);
                        cmd.Parameters["@status"].Value = 1;

                        cmd.Parameters.Add("@number", System.Data.SqlDbType.Int);
                        cmd.Parameters["@number"].Value = requestNum;

                        try
                        {
                            adapter = new System.Data.SqlClient.SqlDataAdapter(cmd);
                            System.Data.DataSet ds2 = new System.Data.DataSet();
                            adapter.Fill(ds2);
                            mainId = int.Parse(ds2.Tables[0].Rows[0][0].ToString());
                            ds2.Dispose();
                        }
                        catch { };
                    }
                    else
                    {
                        err = true;
                        msgErr = "[customer] insert error";
                    }
                }
                catch { }

                if (!err && (mainId <= 0))
                {
                    err = true;
                    msgErr = "[main] insert error";
                }
            }

            adapter.Dispose();
            cmd.Dispose();
            conn.Close();
        }

        if (err)
        {
            Response.Write(msgErr);
        }
        else
        {
            Response.Write("Successed");
        }
    }
}