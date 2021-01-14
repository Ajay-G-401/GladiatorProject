import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class AdminService{

    url:string="http://localhost:60316/";

    constructor(private getPendingRetailerHttp:HttpClient,private sendMailHttp:HttpClient,
                private approveRetailerHttp:HttpClient,private removeRetailerHttp:HttpClient,
                private sendRemoveMailHttp:HttpClient,private categoriesHttp:HttpClient,
                private insertCategoryHttp:HttpClient,private getProductsAdminHttp:HttpClient,
                private getPendingProductsHttp:HttpClient,private approveProductHttp:HttpClient,
                private rejectProductHttp:HttpClient)
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
    RemoveRetailer(retailerid:any, retaileremail:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.removeRetailerHttp.put(this.url+"RemoveRetailer?retailerid="+retailerid+"&retaileremail="+retaileremail,httpheader)
    }
    SendEmail(retaileremail:any)
    {
        return this.sendMailHttp.get(this.url+"SendEmail?retaileremail="+retaileremail);
    }
    SendRemoveEmail(retaileremail:any)
    {
        return this.sendRemoveMailHttp.get(this.url+"SendRemoveEmail?retaileremail="+retaileremail);
    }

    GetCategories()
    {
        return this.categoriesHttp.get(this.url+"GetCategories")
    }
    
    InsertCategory(categoryname:any,description:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.insertCategoryHttp.post(this.url+"InsertCategory?categoryname="+categoryname+"&description="+description,httpheader);
    }

    GetProductsAdmin()
    {
        return this.getProductsAdminHttp.get(this.url+"AllProducts");
    }

    GetPendingProducts()
    {
        return this.getPendingProductsHttp.get(this.url+"PendingProductsForApproval");
    }

    Approve(productid:any,productname:any,retailername:any,retaileremail:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.approveProductHttp.put(this.url+"ApproveProduct?productid="+productid+"&productname="+productname+"&retailername="+retailername+"&retaileremail="+retaileremail,httpheader);
    }

    Reject(productid:any,productname:any,retailername:any,retaileremail:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.rejectProductHttp.put(this.url+"RejectProduct?productid="+productid+"&productname="+productname+"&retailername="+retailername+"&retaileremail="+retaileremail,httpheader);
    }
    
}