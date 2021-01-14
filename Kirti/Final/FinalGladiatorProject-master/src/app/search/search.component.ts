import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
search:string="";
searchdetails:any=[]
showModal : boolean = false;
  prod : Product= new Product();
  status : any;
  useremail = sessionStorage.getItem('useremail');
  constructor(private productService:ProductService,private cartService:CartService)
  {

  }

  ngOnInit(): void {
    
  }
  FetchProduct(){
    console.log(this.search)
    this. searchdetails=this.productService.SearchProducts(this.search)
    .subscribe((data: any)=>
    {this. searchdetails=data;
      console.log(data)})
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
      this.status = this.cartService.AddtoCart(this.useremail, productid,quantity)
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
      alert("Please login to buy products");
    }
  }
}
