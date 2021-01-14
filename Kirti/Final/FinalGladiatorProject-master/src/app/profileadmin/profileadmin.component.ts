import { Component, Injectable, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-profileadmin',
  templateUrl: './profileadmin.component.html',
  styleUrls: ['./profileadmin.component.css']
})
export class ProfileadminComponent implements OnInit {
  retailerLists : any = [];
  retailerList : any 
  pendingList:any=[];
  acceptedList:any=[];
  status : any
  result :any;
  otpstatus :any;
  load=sessionStorage.getItem('reload');
  constructor(private adminService:AdminService) 
  { }

  ngOnInit(): void {
    this. load=sessionStorage.getItem('reload');
    console.log(this.load)
    this.Reload();
    this.retailerList = this.adminService.GetPendingRetailers()
    .subscribe(
      data=>{this.retailerLists = data;
        console.log(this.retailerLists.length)
        for (let index = 0; index <this.retailerLists.length; index++) {
          console.log(this.retailerLists[index])
          this.retailerList=this.retailerLists[index]
          //console.log(this.retailerList[index].approved)
          if(this.retailerList[0].approved=="pending")
          {
            this.pendingList=this.retailerLists[index]
            console.log(this.pendingList)
           
          }
          if(this.retailerList[0].approved=="accepted")
          {
            this.acceptedList=this.retailerLists[index]
            console.log(this.acceptedList)
          }
          
        }
      //console.log(data)
    }
    );
  }
  Reload(){
    if(this.load=='load')
    {
      sessionStorage.setItem('reload','done')
      window.location.reload();
    }
    return
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
  RemoveRetailer(retailerid :number, retaileremail:string){
    this.status = this.adminService.RemoveRetailer(retailerid, retaileremail)
    .subscribe(
      data=>{
        this.result = data;
        if(this.result == "Accepted"){
          console.log("removed")
          this.SendRemoveEmail(retaileremail);
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
  SendRemoveEmail(retaileremail : string){
    this.otpstatus = this.adminService.SendRemoveEmail(retaileremail)
    .subscribe(
      data => {
        this.otpstatus = data;
        console.log("in mail")
        console.log(data)
        if(this.otpstatus){
          alert("Retailer is Removed. Mail sent to retailer");
          window.location.reload();
        }
        else{
          alert("error")
        }
      }
    )
  }
}
