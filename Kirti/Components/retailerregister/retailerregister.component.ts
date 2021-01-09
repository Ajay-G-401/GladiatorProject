import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Retailer } from '../models/retailer.model';
import { RetailerService } from '../services/retailer.service';
import { PasswordCheck } from '../validators/passwordcheck';

@Component({
  selector: 'app-retailerregister',
  templateUrl: './retailerregister.component.html',
  styleUrls: ['./retailerregister.component.css']
})
export class RetailerregisterComponent implements OnInit {


  registerForm:FormGroup;
  status:any;
  RetailerRegister:Retailer;
  retailer:any;
  msg :any;
  submitted=false;
  constructor(private retailerService:RetailerService,private formBuilder:FormBuilder,private router:Router) { 
    this.RetailerRegister=new Retailer();
    this.registerForm=formBuilder.group({});
  }

  register()
  {
    this.status = this.retailerService.RetailerRegistration(this.RetailerRegister).subscribe(
      data =>{
        if(data=="valid"){
            console.log(this.registerForm.value.retaileremail);
            sessionStorage.setItem('retaileremail',this.registerForm.value.retaileremail);
            alert('Registration Successful');
            // this.router.navigate(['retailerprofile']);
        }else{
          alert('Registration Unsuccessful... try again');
        }
      })
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      remail:['',[Validators.required,Validators.email]],
      rname:['',[Validators.required,Validators.minLength(4)]],
      rpassword:['',[Validators.required,,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/)]],
      checkpassword:['',[Validators.required,,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/)]],
    }
   ,{
    validators: PasswordCheck("rpassword", "checkpassword"),
      
  });
  }
  get f() { 
    return this.registerForm.controls; 
  }

}
