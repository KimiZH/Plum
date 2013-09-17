<%@ Application Language="C#" %>
<%@ Import Namespace="System.Web.Routing" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e) 
    {
        // Code that runs on application startup
        RegisterRoutes(RouteTable.Routes);
    }
    
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown

    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e) 
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }

    void RegisterRoutes(RouteCollection routeCollection)
    {
        //switch (Request.Url.Host.ToLower())
        //{
        //    case "local.igo1.cn":
        //    case "igo1.cn":
        //    case "www.igo1.cn":
        //        routeCollection.MapPageRoute("index", "", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" } });
        
        //        routeCollection.MapPageRoute("aigou", "igo", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "3" } });
        //        routeCollection.MapPageRoute("aigou001", "igo001", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "4" } });
        //        routeCollection.MapPageRoute("aigou002", "igo002", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "5" } });
        //        routeCollection.MapPageRoute("aigou003", "igo003", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "6" } });
        //        routeCollection.MapPageRoute("aigou004", "igo004", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "7" } });
        //        routeCollection.MapPageRoute("aigou005", "igo005", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "8" } });
        //        routeCollection.MapPageRoute("aigou006", "igo006", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "9" } });
        //        routeCollection.MapPageRoute("aigou007", "igo007", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "10" } });
        //        routeCollection.MapPageRoute("aigou008", "igo008", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "11" } });
        //        routeCollection.MapPageRoute("aigou009", "igo009", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "12" } });
        //        routeCollection.MapPageRoute("aigou010", "igo010", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "13" } });

        //        routeCollection.MapPageRoute("pingan-xiaoedaikuan", "pasydk/mobile/index/{category}_{id}.html", "~/pingan-xiaoedaikuan.aspx", false, new RouteValueDictionary { { "category", @"\d{2}" } }, new RouteValueDictionary { { "id", @"\d{3}" } });
        //        break;
        //    case "local.ewee.com.cn":
        //    case "ewee.com.cn":
        //        routeCollection.MapPageRoute("index", "", "~/index.aspx", false);
        //        break;
        //    default:
        //        break;
        //}

        routeCollection.MapPageRoute("index", "", "~/index.aspx", false);

        routeCollection.MapPageRoute("aigou", "igo", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "3" } });
        routeCollection.MapPageRoute("aigou001", "igo001", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "4" } });
        routeCollection.MapPageRoute("aigou002", "igo002", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "5" } });
        routeCollection.MapPageRoute("aigou003", "igo003", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "6" } });
        routeCollection.MapPageRoute("aigou004", "igo004", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "7" } });
        routeCollection.MapPageRoute("aigou005", "igo005", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "8" } });
        routeCollection.MapPageRoute("aigou006", "igo006", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "9" } });
        routeCollection.MapPageRoute("aigou007", "igo007", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "10" } });
        routeCollection.MapPageRoute("aigou008", "igo008", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "11" } });
        routeCollection.MapPageRoute("aigou009", "igo009", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "12" } });
        routeCollection.MapPageRoute("aigou010", "igo010", "~/mobile.aspx", false, new RouteValueDictionary { { "product", "1" }, { "source", "13" } });

        routeCollection.MapPageRoute("pingan-xiaoedaikuan", "pasydk/mobile/index/{category}_{id}.html", "~/pingan-xiaoedaikuan.aspx", false, new RouteValueDictionary { { "category", @"\d{2}" } }, new RouteValueDictionary { { "id", @"\d{3}" } });
    }
</script>
