import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import{Pipe} from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { CompareService } from '../services/compare.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  productdetails: any=[];
  showModal : boolean = false;
  prod : Product= new Product();
  status : any;
  useremail = sessionStorage.getItem('useremail');
  removecompare:any="false"


  constructor(private router:Router,private productservice:ProductService,
    private formbuilder:FormBuilder,private cartservice : CartService,
    private wishlistService:WishlistService,private compareService:CompareService) 
  { 
    
  }

  ngOnInit(): void {
      this.fetchProduct();
  }
 

  fetchProduct(){
    this. productdetails=this.productservice.GetProduct()
    .subscribe((data)=>
    {this. productdetails=data;console.log(data)})
    console.log(this. productdetails);
  }

  OpenModel(productid : number ,productname : string, productprice: number,productquantity : number,productdescription : string,productbrand : string ,productimage1 : string,retailerid : number,categoryid : number){
    this.prod.productid = productid;
    this.prod.productname = productname;
    this.prod.productprice = productprice;
    this.prod.productquantity = productquantity;
    this.prod.productdescription = productdescription;
    this.prod.productbrand = productbrand;
    this.prod.productimage1 = productimage1;
    this.prod.retailerid = retailerid;
    this.prod.categoryid = categoryid;
  }

  addtocart(productid:any,quantity : any){
    console.log(quantity);
    if(this.useremail != null){
      this.status = this.cartservice.AddtoCart(this.useremail, productid,quantity)
      .subscribe(
        data => {
          if(data == "Success"){
            alert("Product successfully added");
          }
          else
          {
            alert('cannot add more than product quantity or negative values')
          }
        }
      )
     }
    else{
      alert("Please login to Add to Cart");
    }
  }
  AddToWishlist(productid:any)
  {
    if(this.useremail != null){
      this.status = this.wishlistService.AddToWishlist(productid,this.useremail)
      .subscribe(
        data => {
          if(data == "success"){
            alert("Product successfully added");
          }
          else
          {
            alert('product already in wishlist')
          }
        }
      )
     }
    else{
      alert("Please login to Add To Wishlist");
    }
  }
  AddToCompare(productid:any)
  {
    if(this.useremail != null){
      this.status = this.compareService.AddToCompare(productid,this.useremail)
      .subscribe(
        data => {
          if(data == "success"){
            alert("Product successfully added");
          }
          if(data=="already present")
          {
            this.removecompare="true"
            alert('other category item  in compare')
          }
        }
      )
     }
    else{
      alert("Please login to Add To compare");
    }
  }

  RemoveCompare()
  {if(this.useremail != null){
    this.status = this.compareService.RemoveCompare(this.useremail)
    .subscribe(
      data => {
        if(data == "success"){
          this.removecompare="false"
          alert("Products removed from compare");
        }
       else{
         alert("something went wrong")
       }
      }
    )
   }
  else{
    alert("Please login to remove from compare");
  }
  }
}

