export class Retailer{
    retailerid:number;
    retailername:string;
    retaileremail:string;
    retailerpassword:string;

    constructor(retailerid:number=0,retailername:string="", retaileremail:string="", retailerpassword:string="" ){
        this.retailerid=retailerid;
        this.retailername=retailername;
        this.retaileremail=retaileremail;
        this.retailerpassword=retailerpassword;
    }
}