import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {
  imageUrl: string = "./assets/images/upload.jpg";
  
  //fileToUpload : File=null;
  fileToUpload:any
  status:any;
  retaileremail  = sessionStorage.getItem('retaileremail');
  categories:any;
 
  constructor(private productService : ProductService, private router : Router,
              private adminService:AdminService) { }

  ngOnInit() {

    //write code to get retailer id

    this.adminService.GetCategories()
    .subscribe((data)=>
    {this. categories=data;
    console.log(data)})
  }

  handleFileInput(event:Event) {
    const input = event.target as HTMLInputElement;
      if (!input.files?.length) {
        return;
      }
    const file = input.files[0];
    this.fileToUpload = file;

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


  OnSubmit(Productname:any,Productquantity:any,Productprice:any,
    Productdescription:any,Productbrand:any,Categoryid:any,Image:any){
    //console.log(Retaileremail.value)
   this.productService.UploadProduct(this.retaileremail,Productname.value,Productquantity.value,Productprice.value,Productdescription.value,Productbrand.value,Categoryid.value,this.fileToUpload)
   .subscribe(
     data =>{
       console.log('done');
       Productname.value = null;
       Productquantity.value=null;
       Productdescription.value = null;
       Productprice.value=null;
       Categoryid.value=null;
     
       Image.value = null;
      
       this.imageUrl = "./assets/images/upload.jpg";
       alert('Product uploaded');
       this.router.navigate(['retailerProfile']);
     }
   );
   
  }

}

