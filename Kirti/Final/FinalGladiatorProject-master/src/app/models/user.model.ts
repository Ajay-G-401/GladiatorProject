export class User{
    useremail:string; 
    username:string; 
    userphone:string;
    userpassword :string;
    userapartment:string;
    userstreet:string; 
    usertown:string; 
    userstate:string; 
    userpincode:string;
    usercountry:string;
    constructor(useremail:string="", username:string="", userphone:string="", userpassword :string=""
        ,userapartment:string="", userstreet:string="", usertown:string="", userstate:string="", userpincode:string="",
        usercountry:string="")
                {
                    this.username= username;
                    this.userpassword=userpassword;
                    this.userapartment=userapartment;
                    this.userphone=userphone;
                    this.useremail=useremail;
                    this.userstreet=userstreet;
                    this.userstate=userstate;
                    this.userpincode=userpincode;
                    this.usertown=usertown;
                    this.usercountry=usercountry;
                }
}