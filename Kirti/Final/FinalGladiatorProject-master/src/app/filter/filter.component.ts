import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Product} from '../models/product.model'
import {CartService} from '../services/cart.service'
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  BothForm :FormGroup;
  showModal : boolean = false;
  prod : Product 
  status : any;
  useremail = sessionStorage.getItem('useremail');
  filterbyprice: any =[];
  filterbycategories: any=[];
  sortbypriceasc: any=[];
  sortbypricedesc:any=[];
  filterbyboth:any=[];
  Num:number;
 // category:any;
  categories:any;
  constructor(private filterService:FilterService,private addtocartserv:CartService,private formbuilder:FormBuilder) {
    this.prod=new Product();
    this.Num=0;
    this.BothForm=formbuilder.group({​​}​​);
    this.categories=this.filterService.getallcategory().subscribe((data)=>{
      this.categories=data; 
      console.log(data)});
  }
  ngOnInit(): void {

  }
  // findCategory(cname:any)
  // {​​​​
  //    var name = cname.value;
  //    console.log(cname);
  //    this.categories.forEach((element:Category)=>{​​​​
  //       if(element.categoryname==name)
  //       this.category=element;
  //       }​​​​);
  // }​​​​

  ByPrice(price:any)
  {
    this.Num=1;
    console.log(price);
    this.filterbyprice=this.filterService.filterbyprice(price).subscribe((res)=>{
      this.filterbyprice=res;
      console.log(res)
    });
    console.log(this.filterbyprice);
  }

  ByCategory(category:string)
  {
    this.Num=2;
    console.log(category);
    this.filterbycategories=this.filterService.filterbycategory(category).subscribe((data)=>{
      this. filterbycategories=data;
      console.log(data)
    });
    console.log(this. filterbycategories);  
  }

  ByBoth(price:string,category:string)
  {
    
    this.filterbyboth = this.filterService.filterbyboth(price,category).subscribe((data)=>{
      this. filterbyboth=data;
      console.log(data)
    });
    console.log(this. filterbyboth);  
  }
  ByPriceAsec()
  {
    this.Num=3;
    this.sortbypriceasc =this.filterService.sortByPriceAsc().subscribe((data)=>{
      this.sortbypriceasc=data;
      console.log(data)
    });
    console.log(this.sortbypriceasc);

  }
  ByPriceDesc()
  {
    this.Num=4;
    this.sortbypricedesc =this.filterService.sortByPriceDesc().subscribe((data)=>{
      this.sortbypricedesc=data;
      console.log(data)
    });
    console.log(this.sortbypricedesc);

  }

  openModal(productid : number ,productname : string, productprice: number,productquantity : number,productdescription : string,productbrand : string ,productimage1 : string,retailerid : number,categoryid : number){
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
  addToCart(productid:any,quantity :any)
  {
    console.log(quantity);
    if(this.useremail != null){
      this.status = this.addtocartserv.AddtoCart(this.useremail, productid,quantity)
      .subscribe(
        data => {
          if(data == "Success"){
          alert("Product successfully added");
          }
          else
          {
            alert('cannot add more than product quantity')
          }
        }
      )
    
    
    }
    else{
      alert("Please login to buy products");
    
     }
                           
  }
}
