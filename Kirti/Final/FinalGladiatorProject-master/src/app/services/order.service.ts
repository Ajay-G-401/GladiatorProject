
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()

export class OrderService{


url:string="http://localhost:60316/";
constructor(private purchaseOneProductHttp:HttpClient,private purchaseAllProductsHttp:HttpClient)
{

}
PurchaseProduct(useremail : string, productid : number, retailerid:number, orderquantity :number,orderprice:any){
        console.log(useremail);
        console.log(productid);
        console.log(retailerid);
        console.log(orderquantity);
        console.log(orderprice)
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.purchaseOneProductHttp.post<any>(this.url+"PurchaseProduct?useremail="+useremail+"&productid="
        +productid+"&retailerid="+retailerid+"&orderquantity="+orderquantity+"&orderprice="+orderprice, httpheader);
        
}
PurchaseAllProducts(useremail:string)
{
    const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
    return this.purchaseAllProductsHttp.post<any>(this.url+"PurchaseAllProducts?useremail="+useremail,httpheader)
}
}



