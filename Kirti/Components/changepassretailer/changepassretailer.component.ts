import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Retailer } from '../models/retailer.model';
import { RetailerService } from '../services/retailer.service';
import { PasswordCheck } from '../validators/passwordcheck';

@Component({
  selector: 'app-changepassretailer',
  templateUrl: './changepassretailer.component.html',
  styleUrls: ['./changepassretailer.component.css']
})
export class ChangepassretailerComponent implements OnInit {
  
  changepassForm : FormGroup;
  RetailerChangepass:Retailer;
  retailer:any;
  status :any;
  msg:any;

  constructor(private formBuilder:FormBuilder,private retailerService:RetailerService,private router:Router) { 
    this.RetailerChangepass=new Retailer();
    this.changepassForm=formBuilder.group({});
  }

  ngOnInit(): void {
    this.changepassForm = this.formBuilder.group({
      remail : new FormControl('',[Validators.required, Validators.email]),
      oldpassword : new FormControl('',[Validators.required,Validators.minLength(8)]),
      newpassword : new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/)]),
      confirmnewpassword : new FormControl('',[Validators.required,Validators.minLength(8)])
    },
   {
      validators : PasswordCheck("newpassword", "confirmnewpassword"),
   }
    );
  }

  get k(){
    return this.changepassForm.controls;
  }

  DoChangePassword(){
    this.status = this.retailerService.RetailerChangePass(this.RetailerChangepass).subscribe(
      data =>{
        if(data=="valid"){
            console.log(this.changepassForm.value.retaileremail);
            sessionStorage.setItem('retaileremail',this.changepassForm.value.retaileremail);
            alert('Password Changed Successfuly');
            // this.router.navigate(['retailerprofile']);
        }else{
          alert('Unable to change password..try again');
        }
      })
  }


}
