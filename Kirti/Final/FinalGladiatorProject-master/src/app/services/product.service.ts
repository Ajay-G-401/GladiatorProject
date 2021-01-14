import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";


@Injectable({
    providedIn: 'root'
  })

export class ProductService{
   url:string="http://localhost:60316/";
    constructor(private uploadProductHttp:HttpClient,private getProducts:HttpClient,
        private searchProducts:HttpClient,private removeProductHttp:HttpClient,
        private displayRetailerProducts:HttpClient,private updateProductHttp:HttpClient)
    {
        
    }


    GetProduct()
    {
        return this.getProducts.get(this.url+"AllProducts");
    }


    public RemoveProductbyapi(productid:any) 
    {
        const httpheader={headers:new HttpHeaders({'Content-Type':'text/html'})};
        return this.removeProductHttp.post(this.url+"Remove-Product?id="+productid,httpheader);
        
    }
    public DisplayProducts(retaileremail:any){
        return this.displayRetailerProducts.get(this.url+"Retailer-ProductDetails?remail="+retaileremail);
    }

    public UpdateProduct(productid:any,retaileremail:any,product:Product){
        return this.updateProductHttp.post(this.url+"Retailer-UpdateProduct?productid="+productid+"&remail="+retaileremail,product);
    }
    UploadProduct(retaileremail:any,productname: string,productquantity:string,productprice: string,productdescription: string,productbrand: string,categoryid:string,fileToUpload: File) {
        debugger
        const formData: FormData = new FormData();
        // console.log(fileToUpload)
        // console.log(fileToUpload.name)
        console.log(productname)
        console.log(productquantity)
        console.log(productprice)
        console.log(productdescription)
        console.log(productbrand)
        console.log(categoryid)
        formData.append('Image', fileToUpload,fileToUpload.name); 
        //fileToUpload.name
        console.log(retaileremail)
        formData.append('RetailerEmail',retaileremail);
        formData.append('ProductName', productname);
        formData.append('ProductQuantity', productquantity);
        formData.append('ProductPrice', productprice);
        formData.append('ProductDescription', productdescription);
        formData.append('ProductBrand', productbrand);
        formData.append('CategoryId', categoryid);
       
        
        return this.uploadProductHttp
          .post(this.url+"ProductUpload", formData);
    }
   
    SearchProducts(search:string)
    {
        return this.searchProducts.get(this.url+"SearchProduct?search="+search)
    }
   
}