import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { CartService } from '../services/cart.service';

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
  subtotal : any = []
  order : Order;
  afterorder : boolean = false; 
  constructor(private cartService:CartService) {
    this.order=new Order();
   }

  ngOnInit(): void {
    this.status = this.cartService.GetCart(this.useremail)
    //this.usercart=["pro1"]
    // .subscribe(
    //   data => {
    //     this.usercart = data;
    //   }
    // )
    this.GetSubtotal(this.useremail);
  }
  Removefromcart(cartid:number,productid : number){
    this.remove = this.cartService.RemoveProduct(cartid, productid)
    // .subscribe(
    //   data =>{
    //     if(data == "Success"){
    //       if(this.afterorder){
    //         alert('Order placed Successfully');
    //       }else{
    //         alert('Item removed from cart');
    //       }
    //     }
    //   }
    // );
  }

  GetSubtotal(useremail: string){
    this.subtot = this.cartService.GetSubtotal(useremail)
  //   .subscribe(
  //     data =>{
  //       this.subtotal = data;
  //     }
  //   )
   }

   Buyproduct(productid:any, retailerid:any, quantity : any, cartid : any){
    console.log("here")
    this.buystatus = this.cartService.PurchaseProduct(this.useremail, productid, retailerid, quantity)
    // .subscribe(
    //   data => {
    //     if(data == "Success"){
    //       this.afterorder = true;
    //       this.removefromcart(cartid,productid);
    //     }
    //   }
    // )
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
