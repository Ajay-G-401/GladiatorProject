import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { PasswordCheck } from '../validators/passwordcheck';

@Component({
  selector: 'app-changepassworduser',
  templateUrl: './changepassworduser.component.html',
  styleUrls: ['./changepassworduser.component.css']
})
export class ChangepassworduserComponent implements OnInit {
  forgotPasswordForm : FormGroup;
  status : any;
  constructor(private formBuilder : FormBuilder,
    private userService :UserService, private router: Router) 
    { 
      
      this.forgotPasswordForm=formBuilder.group({});
    }

  ngOnInit(): void
  {
    this.forgotPasswordForm = this.formBuilder.group({
      useremail : new FormControl('',[Validators.required, Validators.email]),
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
    return this.forgotPasswordForm.controls;
  }

  DoChangePassword(){
    this.status = this.userService.ChangeUserPassword(this.forgotPasswordForm.value.useremail,
      this.forgotPasswordForm.value.oldpassword, this.forgotPasswordForm.value.newpassword)
      .subscribe(
        data => {
          if(data == "valid"){
            alert('Password changed successfully');
            this.router.navigate(['loginUser']);
          }else{
            alert('Please enter correct details');
          }
        }
      )
      console.log(this.status);
  }
}
