import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
productList:any
  constructor(private adminService:AdminService) 
  {

  }

  ngOnInit(): void {
    this. productList=this.adminService.GetProductsAdmin()
    .subscribe((data)=>
    {this. productList=data;
    console.log(data)})
  }

}
