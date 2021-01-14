import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-productsforapproval',
  templateUrl: './productsforapproval.component.html',
  styleUrls: ['./productsforapproval.component.css']
})
export class ProductsforapprovalComponent implements OnInit {
pendingProductList:any
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.GetPendingProducts()
    .subscribe(data=>
      {
        this.pendingProductList=data;
      })
  }

  Approve(productid:any,productname:any,retailername:any,retaileremail:any)
  {
    this.adminService.Approve(productid,productname,retailername,retaileremail)
    .subscribe(data=>{
      if(data=="success")
      {
        alert('Approved Product .Mail sent to retailer')
        window.location.reload();
      }
      else
      {
        alert('could not approve')
        
      }
    })
  }
  Reject(productid:any,productname:any,retailername:any,retaileremail:any)
  {
    this.adminService.Reject(productid,productname,retailername,retaileremail)
    .subscribe(data=>{
      if(data=="success")
      {
        alert('Rejected Product .Mail sent to retailer')
        window.location.reload();
      }
      else
      {
        alert('could not approve')
      }
    })
  }

}
