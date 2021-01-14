import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable()
export class CartService{
    url:string="http://localhost:60316/"
    constructor(private removeProductCartHttp:HttpClient,private getUserCartHttp:HttpClient,
                private insertIntoCartHttp:HttpClient,private getTotalHttp:HttpClient,
                private updateQuantityCartHttp:HttpClient,private notavailableCart:HttpClient)
    {

    }
    GetCart(useremail:any)
    {
        return this.getUserCartHttp.get(this.url+"GetCartUser?useremail="+useremail)
    }
    RemoveProductCart(cartid : number, productid:number) 
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return  this.removeProductCartHttp.delete(this.url+"RemoveFromCart?cartid="+cartid+"&productid="+productid,httpheader);
    }
    UpdateQuantityCart(cartid:number, productid: number, cartquantity :any){
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.insertIntoCartHttp.put<any>(this.url+"UpdateCart?cartid="+cartid+
        "&productid="+productid+"&cartquantity="+cartquantity,httpheader);
    }
    AddtoCart(useremail:string, productid: number, cartquantity : number) {
        
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.updateQuantityCartHttp.post<any>(this.url+"InsertIntoCart?useremail="+useremail+
        "&productid="+productid+"&cartquantity="+cartquantity,httpheader);
    }
    GetTotal(useremail:any)
    {
        return this.getTotalHttp.get(this.url+"CartTotal?useremail="+useremail)
    }
    NotAvailableCart(useremail:any)
    {
        return this.notavailableCart.get(this.url+"NotAvailableCart?useremail="+useremail)
    }
    
}