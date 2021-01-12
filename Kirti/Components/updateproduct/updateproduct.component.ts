import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  
  updateproductForm : FormGroup;
  productupdate:Product;
  check:boolean=false;
  checkpassword:any;
  status:any;
  constructor(private formBuilder:FormBuilder,private productService:ProductService,private router:Router) {
    this.productupdate=new Product();
    this.updateproductForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
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
  get f() { return this.updateproductForm.controls; }

  Updateproduct(){
    this.status = this.productService.UpdateProduct("Retailer@gmail.com",this.productupdate).subscribe(
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
  }

}
