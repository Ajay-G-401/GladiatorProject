import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
 categories:any;
  constructor(private adminService:AdminService) 
  { }

  ngOnInit(): void {
    this.adminService.GetCategories()
    .subscribe((data)=>
    {this. categories=data;
    console.log(data)})

  }

}
