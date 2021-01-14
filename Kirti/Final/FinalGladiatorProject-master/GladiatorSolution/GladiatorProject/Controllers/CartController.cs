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
    public class CartController : ApiController
    {
        dbGladiatorEntities entities = new dbGladiatorEntities();

        [Route("GetCartUser")]
        [HttpGet]
        public HttpResponseMessage GetCartUser(string useremail)
        {
            var result = entities.proc_GetCart(useremail);

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [Route("RemoveFromCart")]
        [HttpDelete]
        public HttpResponseMessage RemoveFromCart(int cartid, int productid)
        {
            var result = entities.proc_Remove_From_Cart(cartid, productid);
            entities.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }



        [Route("InsertIntoCart")]
        [HttpPost]
        public HttpResponseMessage InsertIntoCart(string useremail, int productid, int cartquantity)
        {
            var cartProduct = entities.tblCarts.Where(c => c.useremail == useremail && c.productid == productid).FirstOrDefault();
            var productquantity = entities.tblProducts.Where(p => p.productid == productid)
                                  .Select(p => p.productquantity).FirstOrDefault();
            if ((cartProduct == null && cartquantity <= productquantity) || (cartProduct != null && cartProduct.cartquantity + cartquantity <= productquantity) && cartquantity > 0)
            {
                if (cartProduct == null)
                {
                    entities.proc_Insert_Into_Cart(useremail, productid, cartquantity);
                    entities.SaveChanges();
                }
                else
                {
                    cartProduct.cartquantity = cartProduct.cartquantity + cartquantity;
                    entities.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, "Success");
            }
            return Request.CreateResponse(HttpStatusCode.OK, "not available");
        }

        [Route("UpdateCart")]
        [HttpPut]
        public HttpResponseMessage UpdateCart(int cartid, int productid, int cartquantity)
        {
            var productquantity = entities.tblProducts.Where(p => p.productid == productid)
                                 .Select(p => p.productquantity).FirstOrDefault();
            if (cartquantity <= productquantity && cartquantity > 0)
            {
                entities.proc_Update_Cart(cartid, productid, cartquantity);
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Success");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, "not available");
            }

        }

        [Route("CartTotal")]
        [HttpGet]
        public HttpResponseMessage GetCartTotalUser(string useremail)
        {
            var result = entities.proc_Get_Cart_Total(useremail);

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [Route("PurchaseProduct")]
        [HttpPost]
        public HttpResponseMessage PurchaseProduct(string useremail, int productid, int retailerid, int orderquantity, float orderprice)
        {
            string date = DateTime.Now.ToString();
            entities.proc_Insert_Order(date, useremail, productid, retailerid, orderquantity, orderprice);
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }
        [Route("PurchaseAllProducts")]
        [HttpPost]
        public HttpResponseMessage PurchaseAllProducts(string useremail)
        {
            var result = entities.proc_GetCart(useremail).ToList();
            string date = DateTime.Now.ToString();
            if (result != null)
            {
                foreach (var item in result)
                {
                    entities.proc_Insert_Order(date, useremail, item.productid, item.retailerid, item.cartquantity, item.total);

                    entities.proc_Remove_From_Cart(item.cartid, item.productid);

                }
            }

            entities.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }

        [Route("NotAvailableCart")]
        [HttpGet]
        public HttpResponseMessage NotAvailableCart(string useremail)
        {
            var result = entities.proc_Get_NotAvailableProducts(useremail);

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


    }
}
