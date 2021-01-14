import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class CompareService{

    url:string="http://localhost:60316/";

    constructor(private getcompareHttp:HttpClient,private removeproductCompareHttp:HttpClient,
                private addtoCompareHttp:HttpClient,private removeCompareHttp:HttpClient)
    {

    }

    GetCompare(useremail:any)
    {
        return this.getcompareHttp.get(this.url+"GetCompare?useremail="+useremail);
    }

    RemoveProductCompare(id:any,useremail:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.removeproductCompareHttp.delete(this.url+"RemoveProductCompare?wishlistid="+id+"&useremail="+useremail,httpheader)
    }

    AddToCompare(productid:any,useremail:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.addtoCompareHttp.post(this.url+"AddtoCompare?useremail="+useremail+"&productid="+productid,httpheader)
    }
    
    RemoveCompare(useremail:any)
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.removeCompareHttp.delete(this.url+"RemoveCompare?useremail="+useremail,httpheader)
    }

}