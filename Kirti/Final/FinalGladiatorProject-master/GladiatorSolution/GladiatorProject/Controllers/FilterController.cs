using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using GladiatorProject.Models;

namespace GladiatorProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class FilterController : ApiController
    {
        dbGladiatorEntities entities = new dbGladiatorEntities();
        [HttpGet]
        [Route("FilterByPrice")]
        public HttpResponseMessage GetPrice(string price)
        {
            if (price == "0-1999")
            {
                var res = entities.sp_GetPdtByPrice(0, 1999);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (price == "2000-9999")
            {
                var res = entities.sp_GetPdtByPrice(2000, 9999);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }

            else if (price == "10000-80000")
            {
                var res = entities.sp_GetPdtByPrice(10000, 80000);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }

            else
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Product price out of range");
        }
        [HttpGet]
        [Route("FilterByCategory")]
        public HttpResponseMessage GetCategory(string cname)
        {
            var res = entities.sp_GetPdtByCategory(cname);
            return Request.CreateResponse(HttpStatusCode.OK, res);

        }
        [HttpGet]
        [Route("FilterByBoth")]
        public HttpResponseMessage GetBoth(string price, string cname)
        {
            if (cname == "TOYS" && price == "0-1999")
            {
                var res = entities.sp_GetPdtByPriceCategory(0, 1999, "TOYS");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "TOYS" && price == "2000-9999")
            {
                var res = entities.sp_GetPdtByPriceCategory(2000, 9999, "TOYS");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "TOYS" && price == "10000-80000")
            {
                var res = entities.sp_GetPdtByPriceCategory(10000, 80000, "TOYS");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Electronics" && price == "10000-80000")
            {
                var res = entities.sp_GetPdtByPriceCategory(10000, 80000, "Electronics");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Electronics" && price == "0-1999")
            {
                var res = entities.sp_GetPdtByPriceCategory(0, 1999, "Electronics");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Electronics" && price == "2000-9999")
            {
                var res = entities.sp_GetPdtByPriceCategory(2000, 9999, "Electronics");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Clothings" && price == "0-1999")
            {
                var res = entities.sp_GetPdtByPriceCategory(0, 1999, "Clothings");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Clothings" && price == "2000-9999")
            {
                var res = entities.sp_GetPdtByPriceCategory(2000, 9999, "Clothings");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Clothings" && price == "10000-80000")
            {
                var res = entities.sp_GetPdtByPriceCategory(10000, 80000, "Clothings");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Books" && price == "0-1999")
            {
                var res = entities.sp_GetPdtByPriceCategory(0, 1999, "Books");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Books" && price == "2000-9999")
            {
                var res = entities.sp_GetPdtByPriceCategory(2000, 9999, "Books");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Books" && price == "10000-80000")
            {
                var res = entities.sp_GetPdtByPriceCategory(10000, 80000, "Books");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Mobiles" && price == "0-1999")
            {
                var res = entities.sp_GetPdtByPriceCategory(0, 1999, "Mobiles");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Mobiles" && price == "2000-9999")
            {
                var res = entities.sp_GetPdtByPriceCategory(2000, 9999, "Mobiles");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else if (cname == "Mobiles" && price == "10000-80000")
            {
                var res = entities.sp_GetPdtByPriceCategory(10000, 80000, "Mobiles");
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            else
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Product Not found");
        }
        [HttpGet]
        [Route("SortByPrice")]
        public HttpResponseMessage GetBySort()
        {
            var res = entities.sp_SortByPriceAsc();
            return Request.CreateResponse(HttpStatusCode.OK, res);
        }
        [HttpGet]
        [Route("SortByPriceDesc")]
        public HttpResponseMessage GetBySortDesc()
        {
            var res = entities.sp_SortByPriceDesc();
            return Request.CreateResponse(HttpStatusCode.OK, res);
        }

        [Route("GetByCategory")]
        public HttpResponseMessage GetCategory()
        {
            var res = entities.sp_getCat();
            return Request.CreateResponse(HttpStatusCode.OK, res);
        }
    }
}
