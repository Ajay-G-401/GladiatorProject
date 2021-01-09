import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit {
  loginForm : FormGroup;
  status : any;
  constructor(private formBuilder : FormBuilder,
     private userService : UserService, private router: Router) 
     { 
       this.loginForm=formBuilder.group({});
     }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      useremail : new FormControl('',[Validators.email, Validators.required]),
      userpassword : new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }
  get h(){
    return this.loginForm.controls;
  }
  doLogin(){
    this.status = this.userService.UserLogin(this.loginForm.value.useremail, this.loginForm.value.userpassword)
    .subscribe(
      data => {
        console.log(data)
        if(data=="Success"){
          sessionStorage.setItem('useremail',this.loginForm.value.useremail);
          sessionStorage.setItem('username',this.loginForm.value.username);
          alert('Login Sucessful')
          //this.router.navigate(['home']);
          this.router.navigate(['profileUser']);
          console.log(sessionStorage.getItem("useremail"))
        }else{
          alert("Invalid Credentials !");
        }
      }
    )
    console.log(this.status)
  }

}
