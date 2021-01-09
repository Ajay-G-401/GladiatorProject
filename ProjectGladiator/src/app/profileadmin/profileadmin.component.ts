import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-profileadmin',
  templateUrl: './profileadmin.component.html',
  styleUrls: ['./profileadmin.component.css']
})
export class ProfileadminComponent implements OnInit {
  retailerList : any = []
  status : any
  result :any;
  otpstatus :any;
  constructor(private adminService:AdminService) 
  { }

  ngOnInit(): void {
    this.retailerList = this.adminService.GetPendingRetailers()
    .subscribe(
      data=>{this.retailerList = data;}
    );
  }
  ApproveRetailer(retailerid :number, retaileremail:string){
    this.status = this.adminService.SendApproval(retailerid, retaileremail)
    .subscribe(
      data=>{
        this.result = data;
        if(this.result == "Accepted"){
          console.log("approved")
          this.SendEmail(retaileremail);
        }
      }
    )  
  }
  SendEmail(retaileremail : string){
    this.otpstatus = this.adminService.SendEmail(retaileremail)
    .subscribe(
      data => {
        this.otpstatus = data;
        console.log("in mail")
        console.log(data)
        if(this.otpstatus){
          alert("Retailer is approved. Mail sent to retailer");
          window.location.reload();
        }
        else{
          alert("error")
        }
      }
    )
  }
}
