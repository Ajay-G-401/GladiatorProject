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
    public class WishlistController : ApiController
    {
        dbGladiatorEntities entities = new dbGladiatorEntities();

        [Route("GetWishlist")]
        [HttpGet]
        public HttpResponseMessage GetWishlist(string useremail)
        {
            var wishlist = entities.proc_Get_WishList(useremail).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, wishlist);
        }

        [Route("RemoveFromWishlist")]
        [HttpDelete]
        public HttpResponseMessage RemoveFromWishlist(int wishlistid)
        {
            var wishlist = entities.proc_Remove_From_Wishlist(wishlistid);

            return Request.CreateResponse(HttpStatusCode.OK, "success");
        }
        [Route("AddToWishlist")]
        [HttpPost]
        public HttpResponseMessage AddToWishlist(int productid, string useremail)
        {
            var wishlist = entities.tblWishlists.Where(w => w.Product_id == productid && w.useremail == useremail).FirstOrDefault();

            if (wishlist == null)
            {
                entities.proc_Add_To_Wishlist(productid, useremail);

                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, "product in wishlist");
            }

        }
    }
}
