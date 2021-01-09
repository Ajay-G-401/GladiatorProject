import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable()
export class UserService{
    url:string="http://localhost:58766/";
    constructor(private loginHttp:HttpClient,private registerHttp:HttpClient,
        private changepasswordHttp:HttpClient,private getUserHttp:HttpClient,
        private getUserOrdersHttp:HttpClient)
    {

    }
    UserLogin(useremail:any,userpassword:any)
    {
       //return this.loginHttp.get(this.url+"loginuser",useremail&&userpassword);
       return this.loginHttp.get<any>(this.url+"loginuser?useremail="+useremail+"&userpassword="+userpassword);
    }
    AddUser(user:User)
    {
        return this.registerHttp.post(this.url+"registeruser",user);
    }
    GetOrdersUserProfile(useremail:any)
    {
        return this.getUserOrdersHttp.get(this.url+"GetUserOrders"+"?useremail="+useremail);
    }
    GetUserprofile(useremail:any)
    {
        return this.getUserHttp.get(this.url+"GetProfileUser"+"?useremail="+useremail);
    }
    ChangeUserPassword(useremail:any,oldpassword:any,newpassword:any)
    {
        //var password={oldpassword,newpassword}
        //return this.changepasswordHttp.put(this.url+"changepassworduser",useremail,password);
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.changepasswordHttp.put<any>(this.url+"changepassworduser?useremail="+useremail+
        "&oldpassword="+oldpassword+"&newpassword="+newpassword,httpheader);
    }
   
}