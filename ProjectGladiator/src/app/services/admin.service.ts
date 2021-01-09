import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class AdminService{

    url:string="http://localhost:58766/";

    constructor(private getPendingRetailerHttp:HttpClient,private sendMailHttp:HttpClient,
                private approveRetailerHttp:HttpClient)
    {

    }
    GetPendingRetailers()
    {
        return this.getPendingRetailerHttp.get(this.url+"GetPendingRetailers");
    }
    SendApproval(retailerid:any, retaileremail:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.approveRetailerHttp.put(this.url+"ApproveRetailer?retailerid="+retailerid+"&retaileremail="+retaileremail,httpheader)
    }
    SendEmail(retaileremail:any)
    {
        return this.sendMailHttp.get(this.url+"SendEmail?retaileremail="+retaileremail);
    }
}