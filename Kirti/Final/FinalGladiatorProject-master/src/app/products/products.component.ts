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
 
  constructor(private router:Router,private productService:ProductService) { 
    this.product=new Product();
  }

  ngOnInit(): void {
    this.GetProductDetails(this.retaileremail);
  }
  
  GetProductDetails(retaileremail:any){
    
    this.productService.DisplayProducts(retaileremail)
    .subscribe(productdets=>{
      this.products=productdets
    })

  }
Update(productid:any)
{
  sessionStorage.setItem("productid",productid);
}
  Removeproduct(productid:any){
    console.log(productid)
    this.productService.RemoveProductbyapi(productid)
    .subscribe(
        data =>{
          if(data=="valid"){
              
              alert('Product removed successfully');
              this.router.navigate(['profileRetailer']);
          }else{
            alert('Failed try again');
          }
        })
    

  }
}
