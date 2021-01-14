using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using GladiatorProject.Models;

namespace GladiatorProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class CompareController : ApiController
    {
        dbGladiatorEntities entities = new dbGladiatorEntities();
        [Route("AddtoCompare")]
        [HttpPost]
        public HttpResponseMessage AddtoCompare(string useremail, int productid)
        {
            int? countCompare = entities.tblCompares.Where(c => c.useremail == useremail).Count();
            int checkproduct = entities.tblCompares.Where(c => c.useremail == useremail && c.Product_id == productid).Count();
            int? countCategories = entities.proc_Get_Category_Count(productid, useremail).FirstOrDefault();
            if (countCompare == countCategories && checkproduct == 0)
            {
                entities.proc_Insert_Compare(productid, useremail);
                return Request.CreateResponse(HttpStatusCode.OK, "success");

            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, "already present");
            }

        }

        [Route("GetCompare")]
        [HttpGet]
        public HttpResponseMessage GetCompare(string useremail)
        {
            var compareList = entities.proc_GetCompare(useremail);

            return Request.CreateResponse(HttpStatusCode.OK, compareList);
        }


        [Route("RemoveCompare")]
        [HttpDelete]
        public HttpResponseMessage removeCompare(string useremail)
        {
            var compareList = entities.proc_Remove_Compare(useremail);
            return Request.CreateResponse(HttpStatusCode.OK, "success");
        }
        [Route("RemoveProductCompare")]
        [HttpDelete]
        public HttpResponseMessage removeProductCompare(int wishlistid, string useremail)
        {
            var compareList = entities.proc_Remove_Product_Compare(wishlistid, useremail);
            return Request.CreateResponse(HttpStatusCode.OK, "success");
        }

    }
}
