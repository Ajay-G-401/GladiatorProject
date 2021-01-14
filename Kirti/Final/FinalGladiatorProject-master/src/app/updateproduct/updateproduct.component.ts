import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  submitted=false;
  check:boolean=false;
  checkpassword:any;
  status:any;
  retaileremail = sessionStorage.getItem('retaileremail');
 productid:any;
//  private myRoute:ActivatedRoute,this.productid= this.myRoute.snapshot.params["id"];
  constructor(private formBuilder:FormBuilder,private productService:ProductService,private router:Router,
    private myRoute:ActivatedRoute) {
    this.productupdate=new Product();
    this.updateproductForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    this.productid= this.myRoute.snapshot.params["id"]
    console.log(this.productid)
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
    this.status = this.productService.UpdateProduct(this.productid,this.retaileremail,this.productupdate).subscribe(
      data =>{
        if(data!="invalid"){
            console.log("updated");
            alert('Product Updated Successfuly');
            this.router.navigate(['profileRetailer']);
        }else{
          alert('Product Update Unsuccessful..try again');
          console.log("not updated");
        }
      })
  }

}
