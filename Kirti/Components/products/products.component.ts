import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';

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
pnot:string="";
updateproductForm : FormGroup;
  productupdate:Product;
  check:boolean=false;
  checkpassword:any;
  show=false;
productList:Product;


retaileremail = sessionStorage.getItem('retaileremail');
 
  constructor(private formBuilder:FormBuilder,private router:Router,private productService:ProductService) { 
    this.product=new Product();
    this.productList=new Product();
    this.productupdate=new Product();
    this.updateproductForm = this.formBuilder.group({});
   
  }

  ngOnInit(): void {
    this.GetProductDetails(this.retaileremail);
    this.updateproductForm = this.formBuilder.group({
      pname: ['', [Validators.required,
        Validators.minLength(4)]],
      pprice: ['', [Validators.required,
          Validators.pattern('^\\d{0,}$')]],
      pbrand: ['', [Validators.required,
        Validators.minLength(4)]],
      pdescription: ['', [Validators.required,
        Validators.minLength(4)]],
      pquantity: ['', [Validators.required,
                Validators.pattern('^\\d{0,}$')]]
    });
  }
  
  GetProductDetails(retaileremail:any){
    
    this.productService.DisplayProducts("Retailer@gmail.com")
    .subscribe(productdets=>{
      this.products=productdets
    })

  }

  Removeproduct(productid:number){
    
    this.productService.RemoveProductbyapi(productid)
    .subscribe(
        r =>{
          if(r==1){
              
              alert('Product removed successfully');
              // this.router.navigate(['retailerprofile']);
          }else{
            alert('Failed try again');
          }
        })
    

  }

  get f() { return this.updateproductForm.controls; }

  
  findproducts(pid:any){
    console.log(pid)
    this.show = !this.show;
    var id = pid;
    console.log(id);
    this.products.forEach((element:Product)=>{
      if(element.productid==id)
        this.productList=element;
    });
    console.log(this.productList)
  }

  Updateproduct(id:any){
    
    console.log(id);
    this.status = this.productService.UpdateProduct("Retailer@gmail.com",this.productList.productid,this.productupdate).subscribe(
      data =>{
        if(data==1){
            console.log("updated");
            sessionStorage.setItem('retaileremail',this.updateproductForm.value.retaileremail);
            alert('Product Updated Successfuly');
            // this.router.navigate(['retailerprofile']);
        }else{
          alert('Product Update Unsuccessful..try again');
          console.log("not updated");
        }
      })

      this.show = !this.show;
  }

 
  
}
