export class Product{
    productid?:number;
    productname?:string;
    productprice?: number;
    productquantity?: number;
    productdescription?: string;
    productbrand?: string;
    productimage1?: string;
    productnotification?:string;
    productstatus?:string;
    retailerid?: number;
    categoryid?: number;
    constructor( productid?:number,
        productname?:string,
        productprice?: number,
        productquantity?: number,
        productdescription?: string,
        productbrand?: string,
        productimage1?: string,
        productnotification?:string,
        productstatus?:string,
        retailerid?: number,
        categoryid?: number)
        
    {
        this.productid=productid,
       this.productname= productname,
        this.productprice=productprice,
        this.productquantity=productquantity,
        this.productdescription=productdescription,
        this.productbrand=productbrand,
        this.productimage1=productimage1,
        this.productnotification=productnotification,
        this.productstatus=productstatus,
        this.retailerid=retailerid,
        this.categoryid=categoryid
    }
}