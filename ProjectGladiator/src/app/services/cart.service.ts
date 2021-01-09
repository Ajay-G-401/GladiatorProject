export class CartService{
    url:string=""
    constructor()
    {

    }
    GetCart(useremail:any)
    {
        return "cart"
    }
    RemoveProduct(cartid : number, productid:number) 
    {
        return "Product" ;
    }
    GetSubtotal(useremail : string){
        return "Subtotal";
    }
    PurchaseProduct(useremail : string, productid : number, retailerid:number, orderquantity :number){
        console.log(useremail);
        console.log(productid);
        console.log(retailerid);
        console.log(orderquantity);
      
        // const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        // return this.http.post<any>(this.url+"PurchaseProduct?useremail="+useremail+"&productid="
        // +productid+"&retailerid="+retailerid+"&orderquantity="+orderquantity, httpheader);
        
      }
}