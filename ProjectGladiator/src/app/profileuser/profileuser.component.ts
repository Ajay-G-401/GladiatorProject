import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.component.html',
  styleUrls: ['./profileuser.component.css']
})
export class ProfileuserComponent implements OnInit {
  userorders:any=[];
  users : any= [];
  status : any;
  useremail = sessionStorage.getItem('useremail');
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.getprofileuser(this.useremail);
    this.getuser(this.useremail)
  }
  getuser(useremail:any)
  {
    this.userorders=this.userService.GetOrdersUserProfile(useremail)
    .subscribe((data)=>{
      this.userorders=data;
      console.log(data)
    });
    console.log(this.userorders); 
  }
  getprofileuser(useremail : any){
    this.users = this.userService.GetUserprofile(useremail)
    .subscribe(
      data=>{
        this.users = data;
      }
    )
  }
  UserPassChange(){
    this.router.navigate(['changepasswordUser']);
  }
  gotoHome(){
    this.router.navigate(['home']);
  }

}
