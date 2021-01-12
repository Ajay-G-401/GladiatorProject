import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Retailer } from "../models/retailer.model";

@Injectable()
export class RetailerService{
    
    constructor(private httpClient:HttpClient){
        
    }
    
    public RetailerLogin(retailer:Retailer){
        return this.httpClient.post("http://localhost:57202/Retailer-Login",retailer);
    }

    public RetailerRegistration(retailer:Retailer){
        return this.httpClient.post("http://localhost:57202/Retailer-Register",retailer);
    }

    public RetailerChangePass(retailer:Retailer){
        return this.httpClient.post("http://localhost:57202/Retailer-Changepass",retailer);
    }

    public RetailerDetails(retaileremail:any){
        return this.httpClient.get("http://localhost:57202/Retailer-Details?remail="+retaileremail);
    }
    
}