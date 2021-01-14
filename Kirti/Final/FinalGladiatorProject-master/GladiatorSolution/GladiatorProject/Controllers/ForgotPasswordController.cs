using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using GladiatorProject.Models;


namespace GladiatorProject.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ForgotPasswordController : ApiController
    {
        dbGladiatorEntities entities = new dbGladiatorEntities();
        public bool CheckUserEmail(string email)
        {
            try
            {
                var isValidEmail = entities.tblUsers.Where(u => u.useremail == email).FirstOrDefault();
                if (isValidEmail != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        [Route("SendOTPEmailUser")]
        [HttpGet]
        public async Task<int> SendUserEmail(string useremail)
        {
            if (CheckUserEmail(useremail))
            {
                string from = "shoppinggladiator@gmail.com";
                string subject = "Welcome to online shopping";
                Random generator = new Random();
                int r = generator.Next(1000, 9999);
                string body = "Hello" + useremail + " , Your otp for password change is" + r;

                SmtpClient smtp = new SmtpClient();

                MailMessage mm = new MailMessage();
                mm.From = new MailAddress(from);
                mm.To.Add(useremail);
                mm.Subject = subject;
                mm.Body = body;
                await Task.Run(() => smtp.SendAsync(mm, null));
                return r;
            }
            else
            {
                return 0;
            }

        }
        [Route("UpdatePasswordUser")]
        [HttpPut]

        public HttpResponseMessage UpdateUserPassword(string useremail, string userpassword)
        {
            try
            {
                tblUser user = entities.tblUsers.Find(useremail);
                user.userpassword = userpassword;
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Valid");
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Invalid");
            }

        }


        [Route("SendOTPEmailRetailer")]
        [HttpGet]
        public async Task<int> SendRetailerEmail(string retaileremail)
        {
            if (CheckRetailerEmail(retaileremail))
            {
                string from = "shoppinggladiator@gmail.com";
                string subject = "Welcome to online shopping";
                Random generator = new Random();
                int r = generator.Next(1000, 9999);
                string body = "Hello" + retaileremail + " , Your otp for password change is" + r;

                SmtpClient smtp = new SmtpClient();

                MailMessage mm = new MailMessage();
                mm.From = new MailAddress(from);
                mm.To.Add(retaileremail);
                mm.Subject = subject;
                mm.Body = body;
                await Task.Run(() => smtp.SendAsync(mm, null));
                return r;
            }
            else
            {
                return 0;
            }

        }


        public bool CheckRetailerEmail(string email)
        {
            try
            {
                var isValidEmail = entities.tblRetailers.Where(u => u.retaileremail == email).FirstOrDefault();
                if (isValidEmail != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [Route("UpdatePasswordRetailer")]
        [HttpPut]

        public HttpResponseMessage UpdateRetailerPassword(string retaileremail, string retailerpassword)
        {
            try
            {
                var retailer = entities.tblRetailers.Where(r => r.retaileremail == retaileremail).ToList().FirstOrDefault();
                retailer.retailerpassword = retailerpassword;
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "valid");
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "invalid");
            }

        }
    }
}
