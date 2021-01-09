import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import {   FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ProfileuserComponent } from './profileuser/profileuser.component';
import { ChangepassworduserComponent } from './changepassworduser/changepassworduser.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { ProfileadminComponent } from './profileadmin/profileadmin.component';
import { AdminService } from './services/admin.service';
import { ForgotpassworduserComponent } from './forgotpassworduser/forgotpassworduser.component';
import { ForgotPasswordUserService } from './services/forgotpassworduser.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service';


var myRoutes:Routes=[
  {path:"registerUser",component:RegisteruserComponent},
  {path:"loginUser",component:LoginuserComponent},
  {path:"profileUser",component:ProfileuserComponent},
  {path:"changepasswordUser",component:ChangepassworduserComponent},
  {path:"profileAdmin",component:ProfileadminComponent},
  {path:"loginAdmin",component:LoginadminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisteruserComponent,
    LoginuserComponent,
    ProfileuserComponent,
    ChangepassworduserComponent,
    LoginadminComponent,
    ProfileadminComponent,
    ForgotpassworduserComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(myRoutes)
  ],
  providers: [UserService,AdminService,ForgotPasswordUserService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }