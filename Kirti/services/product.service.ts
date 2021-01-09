import { HttpClient } from "@angular/common/http";
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
    
    RemoveProduct(productid:number) 
    {
        return "Product" ;
    }
   
    

    public DisplayProducts(retaileremail:any){
        return this.httpClient.get("http://localhost:58842/Retailer-ProductDetails?remail="+retaileremail);
    }

    public UpdateProduct(retaileremail:any,product:Product){
        return this.httpClient.post("http://localhost:58842/Retailer-UpdateProduct?remail="+retaileremail,product);
    }
}