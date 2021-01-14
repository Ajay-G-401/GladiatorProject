import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class ForgotPasswordUserService{
    url:string="http://localhost:60316/";
    
    constructor(private sendOTPHttp:HttpClient,private updateUserHttp:HttpClient)
    {
        
    }

    SendOTP(email:any)
    {
        return this.sendOTPHttp.get(this.url+"SendOTPEmailUser?useremail="+email);
    }
    UpdateUser(useremail:any,userpassword:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.updateUserHttp.put(this.url+"UpdatePasswordUser?useremail="+useremail+"&userpassword="+userpassword,httpheader)
    }
}