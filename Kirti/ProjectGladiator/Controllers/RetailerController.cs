using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ProjectGladiator.Models;

namespace ProjectGladiator.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class RetailerController : ApiController
    {
        dbProjectEntities3 db = new dbProjectEntities3();

        [Route("Retailer-Login")]
        [HttpPost]
        public HttpResponseMessage RetailerLogin(tblRetailer retailer)
        {
            try
            {
                var result = db.proc_RetailLoginCheck(retailer.retaileremail, retailer.retailerpassword).FirstOrDefault();
                if (result == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.OK, "invalid");

                }
                else
                    return Request.CreateResponse(HttpStatusCode.OK, "valid");


            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "invalid");
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
                if (changepass == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.OK, "invalid");

                }
                else
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
                var removeproduct = db.proc_RemoveProduct(id);
                if (removeproduct == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.OK, "invalid");

                }
                else
                    return Request.CreateResponse(HttpStatusCode.OK, removeproduct);

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "invalid");
            }

        }

        [Route("Retailer-UpdateProduct")]
        [HttpPost]
        public HttpResponseMessage RetailerUpdateProduct(tblProduct product, string remail)
        {
            try
            {
                var updateproduct = db.proc_UpdateProduct(remail, product.productprice, product.productquantity, product.productdescription);
                return Request.CreateResponse(HttpStatusCode.OK, updateproduct);

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "invalid");
            }

        }
    }
    
}
