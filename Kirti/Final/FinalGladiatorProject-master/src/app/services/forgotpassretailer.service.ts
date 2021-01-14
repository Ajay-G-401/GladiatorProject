import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class ForgotPasswordRetailerService{

    url:string="http://localhost:60316/";
    
    constructor(private sendOTPHttp:HttpClient,private updateUserHttp:HttpClient)
    {
        
    }

    SendOTP(retaileremail:any)
    {
        console.log(retaileremail)
        return this.sendOTPHttp.get(this.url+"SendOTPEmailRetailer?retaileremail="+retaileremail);
    }
    UpdateRetailer(retaileremail:any,retailerpassword:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.updateUserHttp.put(this.url+"UpdatePasswordRetailer?retaileremail="+retaileremail+"&retailerpassword="+retailerpassword,httpheader)
    }
}