import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Retailer } from '../models/retailer.model';
import { RetailerService } from '../services/retailer.service';


@Component({
  selector: 'app-retailer-login',
  templateUrl: './retailer-login.component.html',
  styleUrls: ['./retailer-login.component.css']
})
export class RetailerLoginComponent implements OnInit 
{
  loginForm:FormGroup;
  status:any;
  RetailerLogin:Retailer;
  retailer:any;
  msg :any;
  constructor(private retailerService:RetailerService,private formBuilder:FormBuilder,private router:Router) {
    this.loginForm= formBuilder.group({});
    this.RetailerLogin = new Retailer();
   }
   
   
  
  Login(){
   this.status = this.retailerService.RetailerLogin(this.RetailerLogin).subscribe(
      data =>{
        if(data=="valid"){
          console.log(data)
            console.log(this.loginForm.value.retaileremail);
            sessionStorage.setItem('retaileremail',this.RetailerLogin.retaileremail);
            alert('Login Successful');
            sessionStorage.setItem('reload',"load");
            this.router.navigate(['profileRetailer']);
        }
        else {
          alert('Invalid credentials or Retailer is either pending or rejected');
        }
      })
  }

  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
     retaileremail : new FormControl('',[Validators.email, Validators.required]),
        retailerpassword : new FormControl('',[Validators.required, Validators.minLength(8)])
      
      });
  }

  get h() { 
    return this.loginForm.controls; 
  }

}
