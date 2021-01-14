import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class WishlistService{
    url:string="http://localhost:60316/";
    constructor(private addtoWishlistHttp:HttpClient,private getWishlistHttp:HttpClient,
                private removeFromWishlist:HttpClient )
    {

    }
    Getwishlist(useremail:any)
    {
        return this.getWishlistHttp.get(this.url+"GetWishlist?useremail="+useremail)
    }
    RemoveFromWishlist(wishlistid : number, productid:number) 
    {
        return this.removeFromWishlist.delete(this.url+"RemoveFromWishlist?wishlistid="+wishlistid);
    }
    AddToWishlist(Productid:number,useremail:string)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.addtoWishlistHttp.post(this.url+"AddToWishlist?productid="+Productid+"&useremail="+useremail,httpheader)
    }
  
}