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
    public class UserController : ApiController
    {

        dbGladiatorEntities entities = new dbGladiatorEntities();


        [Route("loginuser")]
        [HttpGet]
        public HttpResponseMessage UserLogin(string useremail, string userpassword)
        {
            try
            {
                var result = entities.tblUsers.Where(u => u.useremail == useremail && u.userpassword == userpassword).FirstOrDefault();
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Success");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Invalid");
                }
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Invalid");
            }
        }



        [Route("registeruser")]
        [HttpPost]
        public HttpResponseMessage UserRegister(tblUser user)
        {
            try
            {
                if (CheckUserEmail(user.useremail))
                {
                    entities.tblUsers.Add(user);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "success");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "invalid");
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, e.Message);
            }
        }

        public bool CheckUserEmail(string email)
        {
            try
            {
                var isValidEmail = entities.tblUsers.Where(u => u.useremail == email).FirstOrDefault();
                if (isValidEmail != null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        [Route("changepassworduser")]
        [HttpPut]
        public HttpResponseMessage PasswordChange(string useremail, string oldpassword, string newpassword)
        {
            try
            {
                if (CheckUser(useremail, oldpassword))
                {
                    tblUser user = entities.tblUsers.Find(useremail);
                    user.userpassword = newpassword;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "valid");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "invalid");
                }
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "error");
            }
        }

        public bool CheckUser(string useremail, string oldpassword)
        {
            try
            {
                var result = entities.tblUsers.Where(u => u.useremail == useremail && u.userpassword == oldpassword).FirstOrDefault();
                if (result == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
