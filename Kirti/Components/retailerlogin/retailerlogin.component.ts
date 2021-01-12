import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Retailer } from '../models/retailer.model';
import { RetailerService } from '../services/retailer.service';

@Component({
  selector: 'app-retailerlogin',
  templateUrl: './retailerlogin.component.html',
  styleUrls: ['./retailerlogin.component.css']
})
export class RetailerloginComponent implements OnInit {

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
          console.log(this.loginForm.value.retaileremail);
            sessionStorage.setItem('retaileremail',this.RetailerLogin.retaileremail);
            alert('Login Successful');
            // this.router.navigate(['retailerprofile']);
          
        }
        else {
          alert('Invalid credentials or Retailer is either pending or rejected');
        }
      })
  }

  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      retaileremail :['',[Validators.email, Validators.required]],
        retailerpassword:['',[Validators.required,,Validators.minLength(8),Validators.maxLength(20),Validators.pattern('/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/')]],
    });
  }

  get h() { 
    return this.loginForm.controls; 
  }
}
