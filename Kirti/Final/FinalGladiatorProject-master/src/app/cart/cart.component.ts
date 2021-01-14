import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/order.model';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  useremail:any = sessionStorage.getItem('useremail');
  status : any;
  remove: any;
  subtot : any;
  buystatus : any;
  usercart : any = []
  total : any = []
  order : Order;
  afterorder : boolean = false; 
  outofstock:any=[];


  constructor(private cartService:CartService,private orderService:OrderService,
    private route:Router ) 
  {
    this.order=new Order();
   }

  ngOnInit(): void {
    this.status = this.cartService.GetCart(this.useremail)
    .subscribe(
      data => {
        this.usercart = data;
      }
    )
    this.GetTotal(this.useremail);
    this.cartService.NotAvailableCart(this.useremail)
    .subscribe(
      data => {
        this.outofstock = data;
      }
    )
  }
  Updatecart(cartid:number,productid : number,quantity:any)
  {
    //console.log(quantity)
    this.cartService.UpdateQuantityCart(cartid,productid,quantity)
    .subscribe(data=>{
      if(data=="Success")
      {
        alert('updated')
        window.location.reload();
      }
      else
      {
        alert('cannot add more than product quantity or negative values')
        
      }
    })
  }
  Removefromcart(cartid:number,productid : number){
    this.remove = this.cartService.RemoveProductCart(cartid, productid)
    .subscribe(
      data =>{
        if(data == "Success"){
          if(this.afterorder){
            alert('Order placed Successfully');
            window.location.reload();
          }else{
            window.location.reload();
            alert('Item removed from cart');
          }
        }
      }
    );
  }

  GetTotal(useremail: string){
    this.subtot = this.cartService.GetTotal(useremail)
    .subscribe(
      data =>{
        console.log(data)
        this.total = data;
      }
    )
   }

   Buyproduct(productid:any, retailerid:any, quantity : any, cartid : any,orderprice:any){
    console.log("here")
    this.buystatus = this.orderService.PurchaseProduct(this.useremail, productid, retailerid, quantity,orderprice)
    .subscribe(
      data => {
        if(data == "Success"){
          this.afterorder = true;
          this.Removefromcart(cartid,productid);
          this.route.navigate(['home'])
        }
      }
    )
  }
  BuyAllProduct()
  {
    console.log("All Products")
    this.orderService.PurchaseAllProducts(this.useremail)
    .subscribe(
      data => {
        if(data == "Success")
        {
          console.log("Done")
          this.route.navigate(['home'])
        }
      }
    )
  }
  // quantity:number
  OpenModel(productid:number,cartid:number,productprice:number,retailerid:number,productname:string, total: number, quantity : any){
    this.order.productid = productid;
    this.order.cartid = cartid;
    this.order.productprice = productprice;
    this.order.retailerid =retailerid;
    this.order.productname = productname;
    this.order.total = productprice * quantity;
    this.order.orderquantity = quantity;
  }
}
