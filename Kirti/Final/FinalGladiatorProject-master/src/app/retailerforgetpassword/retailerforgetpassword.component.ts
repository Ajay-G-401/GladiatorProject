import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordRetailerService } from '../services/forgotpassretailer.service';
import { PasswordCheck } from '../validators/passwordcheck';

@Component({
  selector: 'app-retailerforgetpassword',
  templateUrl: './retailerforgetpassword.component.html',
  styleUrls: ['./retailerforgetpassword.component.css']
})
export class RetailerforgetpasswordComponent implements OnInit {
  forgetPasswordOTPForm : FormGroup
  otpstatus : boolean = false;
  buttonname : any ='Get OTP';

  userotp : any;
  checkotp : any;

  otppattern : string = "^[0-9]{4}";
  constructor(private formBuilder : FormBuilder, private forgotPasswordUserService:ForgotPasswordRetailerService,private router:Router) 
  {
    this.forgetPasswordOTPForm=this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.forgetPasswordOTPForm = this.formBuilder.group({
      useremail : new FormControl('',[Validators.required, Validators.email]),
      otp : new FormControl('',[Validators.required,Validators.pattern(this.otppattern)]),
      newpassword : new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmnewpassword : new FormControl('',[Validators.required,Validators.minLength(8)])
    }
    ,
    {
      validators: PasswordCheck("newpassword", "confirmnewpassword")
    }
    );
  }

  get l(){
    return this.forgetPasswordOTPForm.controls;
  }

  doChange(){
    if(this.checkotp == this.forgetPasswordOTPForm.value.otp && this.forgetPasswordOTPForm.valid){
      this.forgotPasswordUserService.UpdateRetailer(this.forgetPasswordOTPForm.value.useremail,this.forgetPasswordOTPForm.value.newpassword)
      .subscribe(
        data => { 
          if(data == "valid"){
            alert("Password changed successfully");
            this.router.navigate(['loginUser'])
          }
         }
      )
      this.forgetPasswordOTPForm.reset();
    }
    if(this.checkotp != this.forgetPasswordOTPForm.value.otp && this.forgetPasswordOTPForm.valid){
      alert("Invalid OTP. Please enter correct OTP");
    }
  }

  GetOtp()
  {
    this.otpstatus = !this.otpstatus
    this.forgotPasswordUserService.SendOTP(this.forgetPasswordOTPForm.value.useremail)
    .subscribe(
      data => {
        console.log(data);
        if(data == 0){
          alert('Please enter correct email id');
          this.buttonname = 'Get OTP';
          this.otpstatus = !this.otpstatus
          this.forgetPasswordOTPForm.reset();
        }else{
          alert("Please check your email for OTP");
          this.buttonname = 'Enter OTP';
          this.checkotp = data;
        }
      }
    );
  }
}
