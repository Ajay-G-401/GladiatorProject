import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:any=[];
pstatus=true;
product:Product;
status:any;
retaileremail = sessionStorage.getItem('retaileremail');
 
  constructor(private royter:Router,private productService:ProductService) { 
    this.product=new Product();
  }

  ngOnInit(): void {
    this.GetProductDetails(this.retaileremail);
  }
  
  GetProductDetails(retaileremail:any){
    
    this.productService.DisplayProducts("Retailer@gmail.com")
    .subscribe(productdets=>{
      this.products=productdets
    })

  }

  Removeproduct(){
    
    this.productService.RemoveProductbyapi(3,this.product)
    .subscribe(
        data =>{
          if(data=="valid"){
              
              alert('Product removed successfully');
              // this.router.navigate(['retailerprofile']);
          }else{
            alert('Failed try again');
          }
        })
    

  }
}
