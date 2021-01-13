import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { Retailer } from "../models/retailer.model";

@Injectable()
export class ProductService{
   products:Product[];
    constructor(private httpClient:HttpClient){
        this.products = [new Product()];
    }
    
    AddProduct(product:Product)
    {
        return "Product added"
        // return this.http.post("http://localhost:50358/api/Retailer",product);
    }
    
    public RemoveProductbyapi(productid:any) 
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.httpClient.post("http://localhost:57202/Remove-Product?id="+productid,httpheader);
        
    }
   
    

    public DisplayProducts(retaileremail:any){
        return this.httpClient.get("http://localhost:57202/Retailer-ProductDetails?remail="+retaileremail);
    }

    public UpdateProduct(retaileremail:any,id:any,product:Product){
        return this.httpClient.post("http://localhost:57202/Retailer-UpdateProduct?remail="+retaileremail+"&id="+id,product);
    }
}