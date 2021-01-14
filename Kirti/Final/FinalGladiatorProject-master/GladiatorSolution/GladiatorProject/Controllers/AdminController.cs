using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using GladiatorProject.Models;

namespace GladiatorProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class AdminController : ApiController
    {
        dbGladiatorEntities entities = new dbGladiatorEntities();

        [Route("GetPendingRetailers")]
        [HttpGet]
        public HttpResponseMessage GetPendingRetailers()
        {
            var pendingRetailers = entities.proc_Get_All_Retailers().GroupBy(s => s.approved).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, pendingRetailers);
        }


        [Route("ApproveRetailer")]
        [HttpPut]
        public HttpResponseMessage ApproveRetailer(int retailerid, string retaileremail)
        {
            try
            {
                entities.proc_Approve_Retailer(retailerid, retaileremail);
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Accepted");
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Error");
            }

        }


        [Route("SendEmail")]
        [HttpGet]
        public HttpResponseMessage SendEmail(string retaileremail)
        {
            string from = "shoppinggladiator@gmail.com";
            string subject = "Welcome to online shopping";
            string body = "Hello " + retaileremail +
                ", shopping gladiator welcomes you to be a contributor as a retailer";
            SmtpClient smtp = new SmtpClient();
            MailMessage mm = new MailMessage();
            mm.From = new MailAddress(from);
            mm.To.Add(retaileremail);
            mm.Subject = subject;
            mm.Body = body;
            smtp.Send(mm);
            return Request.CreateResponse(HttpStatusCode.OK, "Done");
        }
        [Route("RemoveRetailer")]
        [HttpPut]
        public HttpResponseMessage RemoveRetailer(int retailerid, string retaileremail)
        {
            try
            {
                var retailer = entities.tblRetailers.Find(retailerid);
                retailer.approved = "pending";
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Accepted");
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Error");
            }

        }
        [Route("SendRemoveEmail")]
        [HttpGet]
        public HttpResponseMessage SendRemoveEmail(string retaileremail)
        {
            string from = "shoppinggladiator@gmail.com";
            string subject = "Closing Retailer Account";
            string body = "Hello " + retaileremail +
               ", shopping gladiator closing your account due to user complaints";
            SmtpClient smtp = new SmtpClient();
            MailMessage mm = new MailMessage();
            mm.From = new MailAddress(from);
            mm.To.Add(retaileremail);
            mm.Subject = subject;
            mm.Body = body;
            smtp.Send(mm);
            return Request.CreateResponse(HttpStatusCode.OK, "Done");
        }

        [Route("GetCategories")]
        [HttpGet]
        public HttpResponseMessage GetCategories()
        {
            var categories = entities.proc_Get_Categories().ToList();
            return Request.CreateResponse(HttpStatusCode.OK, categories);
        }

        [Route("InsertCategory")]
        [HttpPost]
        public HttpResponseMessage InsertCategory(string categoryname, string description)
        {
            entities.proc_Insert_Category(categoryname, description);
            entities.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "success");
        }

        [Route("PendingProductsForApproval")]
        [HttpGet]

        public HttpResponseMessage GetPendingProducts()
        {
            var products = entities.proc_Pending_Products().ToList();
            return Request.CreateResponse(HttpStatusCode.OK, products);
        }

        [Route("ApproveProduct")]
        [HttpPut]
        public HttpResponseMessage ApproveProduct(int productid, string productname, string retailername, string retaileremail)
        {

            entities.proc_Approve_Product(productid);
            string from = "shoppinggladiator@gmail.com";
            string subject = "";
            string body = "Hello " + retailername +
               ", shopping gladiator Approved your Product" + productname + "changes will be reflected in the app";
            SmtpClient smtp = new SmtpClient();
            MailMessage mm = new MailMessage();
            mm.From = new MailAddress(from);
            mm.To.Add(retaileremail);
            mm.Subject = subject;
            mm.Body = body;
            smtp.Send(mm);
            return Request.CreateResponse(HttpStatusCode.OK, "success");
        }

        [Route("RejectProduct")]
        [HttpPut]
        public HttpResponseMessage RejectProduct(int productid, string productname, string retailername, string retaileremail)
        {
            entities.proc_Reject_Product(productid);
            string from = "shoppinggladiator@gmail.com";
            string subject = "";
            string body = "Hello " + retailername +
               ", shopping gladiator Rejected  your Product" + productname + "product is removed from the App";
            SmtpClient smtp = new SmtpClient();
            MailMessage mm = new MailMessage();
            mm.From = new MailAddress(from);
            mm.To.Add(retaileremail);
            mm.Subject = subject;
            mm.Body = body;
            smtp.Send(mm);
            return Request.CreateResponse(HttpStatusCode.OK, "success");
        }
    }
}
