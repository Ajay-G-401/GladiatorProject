import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }
  useremail : null|string="";
  retaileremail : null|string="";
  adminemail : null|string="";
  name : string="";
  user:boolean=false;
  userlogged : boolean = false;

  buttonProfile : boolean = false;
  retailerprofile : boolean = false;
  adminlogged:boolean=false;

  ngOnInit(): void {
    this.useremail = sessionStorage.getItem('useremail');
    this.retaileremail = sessionStorage.getItem('retaileremail');
    this.adminemail  = sessionStorage.getItem('adminlogin');
    if(this.useremail != null ){
      this.name = this.useremail;
      this.userlogged = true;
      this.user=true;
      this.buttonProfile = true;
    }
    else if(this.adminemail != null){
      this.name = this.adminemail;
      this.userlogged = true;
      this.buttonProfile = true;
      this.adminlogged=true;
    }else if(this.retaileremail != null){
      this.name = this.retaileremail;
      this.userlogged = true;
      this.buttonProfile = true;
    }

  }
  userprofilebut(){
    if(this.useremail != null ){
    this.router.navigate(['profileUser']);
    }
    if(this.adminemail != null){
      this.router.navigate(['profileAdmin']);
    }
    if(this.retaileremail != null){
      this.router.navigate(['profileRetailer']);
    }

  }
  logoff(){
    this.user=false;
    this.userlogged = false;
    this.buttonProfile = false;
    this.adminlogged=false;
    alert("Successfully logged off");
    sessionStorage.clear();
    this.router.navigate(['home'])
  }
 

}
