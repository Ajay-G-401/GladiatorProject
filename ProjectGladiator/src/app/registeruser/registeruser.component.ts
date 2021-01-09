import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { PasswordCheck } from '../validators/passwordcheck';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {
  user:User
  registerForm:FormGroup;
  submitted:boolean=false;
  check:boolean=false;
  checkpassword:any;
  status:any;
    constructor(private userservice:UserService,private formBuilder: FormBuilder,private router:Router) { 
      this.user=new User();
      this.registerForm=formBuilder.group({})
    }
  register()
  {
    //this.userservice.addUser(user);
    //this.user=new User()
    this.submitted = true;
    // console.log(this.user.userpassword)
    // console.log(this.checkpassword)
    if(this.user.userpassword!=this.checkpassword)
    {
      console.log(this.user.userpassword)
      console.log(this.checkpassword)
      this.check=true;
    }
    else{
      this.check=false;
    }
  
      if (this.registerForm.invalid) {
        //console.log(this.registerForm)
        return;
      }
      else
      {
        console.log("check")
         this.status = this.userservice.AddUser(this.user)
        .subscribe(
            data=> {
              console.log(data)
              if(data == "success"){
                alert("Successfully registered");
                this.router.navigate(['loginUser']);
              }else{
                alert("Email id is already registered");
              }
            }
          )
      }
  }
    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        useremail:['',[Validators.required,Validators.email]],
        username:['',[Validators.required,Validators.minLength(4)]],
        userpassword:['',[Validators.required,,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/)]],
        checkpassword:['',[Validators.required,,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/)]],
        userphone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]],
        userapartment: ['',[Validators.required]],
        userstreet:['',[Validators.required]],
        usertown:['',[Validators.required]],
        userstate:['',[Validators.required]],
        userpincode:['',[Validators.required]],
        usercountry:['',[Validators.required]]
    }
    // ,{
    //   validators: PasswordCheck("userpassword", "confuserpassword"),
    // }
    );
    }
    get f() { 
      return this.registerForm.controls; 
    }
  

}
