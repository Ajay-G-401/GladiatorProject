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
    public class RetailerController : ApiController
    {
        dbGladiatorEntities db = new dbGladiatorEntities();

        [Route("Retailer-Login")]
        [HttpPost]
        public HttpResponseMessage RetailerLogin(tblRetailer retailer)
        {
            try
            {
                var result = db.proc_RetailLoginCheck(retailer.retaileremail, retailer.retailerpassword).ToList().Count();
                if (result ==1)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "valid");
                    

                }
                else
                    return Request.CreateResponse(HttpStatusCode.OK, "invalid");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.OK, "invalid");
            }


        }

        [Route("Retailer-Details")]
        [HttpGet]
        public HttpResponseMessage RetailerDetails(string remail)
        {

            try
            {
                var retailerdetails = db.proc_DisplayRetailerDetails(remail).ToList();
                if (retailerdetails == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.OK, "Invalid");

                }
                else
                    return Request.CreateResponse(HttpStatusCode.OK, retailerdetails);

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "invalid");
            }


        }

        [Route("Retailer-ProductDetails")]
        [HttpGet]
        public HttpResponseMessage RetailerProductDetails(string remail)
        {

            var retailerproductdetails = db.proc_DisplayProducts(remail).ToList();
            if (retailerproductdetails == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.OK, "Invalid");

            }
            else
                return Request.CreateResponse(HttpStatusCode.OK, retailerproductdetails);
        }

        [Route("Retailer-Register")]
        [HttpPost]
        public HttpResponseMessage RetailerRegister(tblRetailer retailer)
        {
            try
            {
                retailer = new tblRetailer()
                {
                    retailername = retailer.retailername,
                    retaileremail = retailer.retaileremail,
                    retailerpassword = retailer.retailerpassword,
                    approved = "pending"

                };

                db.tblRetailers.Add(retailer);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "valid");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "invalid");
            }

        }

        [Route("Retailer-Changepass")]
        [HttpPost]
        public HttpResponseMessage RetailerChangePass(tblRetailer retailer)
        {
            try
            {
                var changepass = db.proc_Changepass(retailer.retaileremail, retailer.retailerpassword);
                return Request.CreateResponse(HttpStatusCode.OK, "valid");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "invalid");
            }

        }

        [Route("Remove-Product")]
        [HttpPost]
        public HttpResponseMessage RemoveProduct(int id)
        {
            try
            {
                db.proc_Remove_Product(id);
                return Request.CreateResponse(HttpStatusCode.OK, "valid");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "invalid");
            }

        }

        [Route("Retailer-UpdateProduct")]
        [HttpPost]
        public HttpResponseMessage RetailerUpdateProduct(tblProduct product,int productid ,string remail)
        {
            try
            {
                var updateproduct = db.proc_UpdateProduct1(productid,remail, product.productprice, product.productquantity, product.productdescription);
                return Request.CreateResponse(HttpStatusCode.OK, "valid");

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "invalid");
            }

        }
    }
}
