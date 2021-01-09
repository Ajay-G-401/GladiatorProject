import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product:Product
  addproductForm : FormGroup;
  submitted=false;
  check:boolean=false;
  checkpassword:any;
  status:any;
  constructor(private formBuilder:FormBuilder,private productService:ProductService,private router:Router) { 
    this.product=new Product();
    this.addproductForm = this.formBuilder.group({});
  }
  
  ngOnInit(): void {
    this.addproductForm = this.formBuilder.group({

      pname: ['', [Validators.required,
        Validators.minLength(4)]],
      pprice: ['', [Validators.required,
          Validators.pattern('^\\d{0,}$')]],
      pbrand: ['', [Validators.required,
        Validators.minLength(4)]],
      pdescription: ['', [Validators.required,
        Validators.minLength(4)]],
      pquantity: ['', [Validators.required,
                Validators.pattern('^\\d{0,}$')]],
      fileupload: ['', Validators.required]
      
    });
  }

  get f() { return this.addproductForm.controls; }

  AddProduct()
  {
    //this.userservice.addUser(user);
    //this.user=new User()
    this.submitted = true;

      if (this.addproductForm.invalid) {
          return;
      }
      else
      {
         this.status = this.productService.AddProduct(this.product)
        //.subscribe(
        //     data=> {
        //       if(data == "success"){
        //         alert("Successfully Added");
        //         // this.router.navigate(['userlogin']);
        //       }else{
        //         alert("Product already exists");
        //       }
        //     }
        //   )
      }
  }


}

