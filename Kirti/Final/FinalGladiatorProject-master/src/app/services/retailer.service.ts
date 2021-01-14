import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Retailer } from "../models/retailer.model";


@Injectable()
export class RetailerService{
    url:string="http://localhost:60316/";
    constructor(private httpClient:HttpClient){
        
    }
    
    public RetailerLogin(retailer:Retailer){
        // var retaileremail=retailer.retaileremail
        // var retailerpassword=retailer.retailerpassword
        // return this.httpClient.get(this.url+"Retailer-Login?retaileremail="+retaileremail+"&retailerpassword="+retailerpassword);
        return this.httpClient.post(this.url+"Retailer-Login",retailer);
    }

    public RetailerRegistration(retailer:Retailer){
        return this.httpClient.post(this.url+"Retailer-Register",retailer);
    }

    public RetailerChangePass(retailer:Retailer){
        return this.httpClient.post(this.url+"Retailer-Changepass",retailer);
    }

    public RetailerDetails(retaileremail:any){
        return this.httpClient.get(this.url+"Retailer-Details?remail="+retaileremail);
    }
    
   
}