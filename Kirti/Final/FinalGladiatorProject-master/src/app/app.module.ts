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
import { RetailerLoginComponent } from './retailer-login/retailer-login.component';
import { RetailerdetailsComponent } from './retailerdetails/retailerdetails.component';
import { RetailerforgetpasswordComponent } from './retailerforgetpassword/retailerforgetpassword.component';
import { RetailerRegisterComponent } from './retailer-register/retailer-register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ForgotPasswordRetailerService } from './services/forgotpassretailer.service';
import { ProductService } from './services/product.service';
import { RetailerService } from './services/retailer.service';
import { WishlistService } from './services/wishlist.service';
import { HomeComponent } from './home/home.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { OrderService } from './services/order.service';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { ProductsforapprovalComponent } from './productsforapproval/productsforapproval.component';
import { RetailerprofileComponent } from './retailerprofile/retailerprofile.component';
import { ProductsComponent } from './products/products.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { ChangepassretailerComponent } from './changepassretailer/changepassretailer.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CategoriesComponent } from './categories/categories.component';
import { CompareComponent } from './compare/compare.component';
import { CompareService } from './services/compare.service';
import { FilterComponent } from './filter/filter.component';
import { FilterService } from './services/filter.service';


var myRoutes:Routes=[
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"registerUser",component:RegisteruserComponent},
  {path:"loginUser",component:LoginuserComponent},
  {path:"profileUser",component:ProfileuserComponent},
  {path:"changepasswordUser",component:ChangepassworduserComponent},
  {path:"forgotpasswordUser",component:ForgotpassworduserComponent},
  {path:"profileAdmin",component:ProfileadminComponent},
  {path:"loginAdmin",component:LoginadminComponent},
  {path:"cartUser",component:CartComponent},
  {path:"loginRetailer",component:RetailerLoginComponent},
  {path:"registerRetailer",component:RetailerRegisterComponent},
  {path:"detailsRetailer",component:RetailerdetailsComponent},
  {path:"profileRetailer",component:RetailerprofileComponent},
  {path:"changepasswordRetailer",component:ChangepassretailerComponent},
  {path:"products",component:ProductsComponent},
  {path:"forgotpasswordRetailer",component:RetailerforgetpasswordComponent},
  {path:"addProduct",component:ProductUploadComponent},
  {path:"updateproduct/:id",component:UpdateproductComponent},
  {path:"wishlist",component:WishlistComponent},
  {path:"addcategory",component:AddcategoryComponent},
  {path:"categories",component:CategoriesComponent},
  {path:"searchProduct",component:SearchComponent},
  {path:"allProducts",component:AllproductsComponent},
  {path:"productsForAdminApproval",component:ProductsforapprovalComponent},
  {path:"compare",component:CompareComponent},
  {path:"filter",component:FilterComponent}
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
    CartComponent,
    RetailerLoginComponent,
    RetailerdetailsComponent,
    RetailerforgetpasswordComponent,
    RetailerRegisterComponent,
    ChangepassretailerComponent,
    RetailerprofileComponent,
    ProductsComponent,
    UpdateproductComponent,
    WishlistComponent,
    HomeComponent,
    ProductUploadComponent,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    AllproductsComponent,
    ProductsforapprovalComponent,
    AddcategoryComponent,
    CategoriesComponent,
    CompareComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(myRoutes)
  ],
  providers: [UserService,AdminService,ForgotPasswordUserService,CartService,ForgotPasswordRetailerService
              ,ProductService,RetailerService,WishlistService,OrderService,CompareService,FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }