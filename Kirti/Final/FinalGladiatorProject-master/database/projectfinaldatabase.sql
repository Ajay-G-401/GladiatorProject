create database dbGladiator


use dbGladiator

create table tblUser(
	useremail nvarchar(255) primary key,
	username varchar(40) not null,
	userphone varchar(15)  not null,
	userpassword nvarchar(20) not null,
	userapartment varchar(40) not null,
	userstreet varchar(40),
	usertown varchar(40) not null,
	userstate varchar(40) not null,
	userpincode varchar(40) not null,
	usercountry varchar(40) not null
)

create table tblCategory(
	categoryid int primary key identity,
	categoryname nvarchar(max) not null,
	categorydescription nvarchar(max),
)

create table tblRetailer(
	retailerid int primary key identity(1001,1),
	retailername varchar(40) not null,
	retaileremail nvarchar(40) unique not null,
	retailerpassword nvarchar(40) not null,
	--approved int default 0
	approved varchar(20) default 'pending' check(approved in ('rejected','pending','accepted')) 
)

create table tblProduct(
	productid int primary key identity(100,1),
	productname nvarchar(max),
	productprice float ,
	productquantity  int,
	productdescription nvarchar(max),
	productbrand varchar(45),
	productimage1 nvarchar(max),
	productnotification varchar(45),
	productstatus varchar(20) default 'pending' check(productstatus in ('rejected','pending','accepted')),
	retailerid int references tblRetailer(retailerid) on delete cascade,
	categoryid int references tblCategory(categoryid) on delete cascade
)

create table tblCart(
	cartid int identity primary key,
	useremail nvarchar(255) references tblUser(useremail) on delete cascade,
	productid int references tblProduct(productid) on delete cascade,
	cartquantity int,
)

create table tblOrder(
	orderid int identity primary key,
	orderdate nvarchar(30) not null,
	useremail nvarchar(255) references tblUser(useremail) on delete cascade,
	productid int references tblProduct(productid) ,
	retailerid int references tblRetailer(retailerid) on delete cascade,
	orderquantity int,
	orderprice float
)


create table tblWishlist
 (
 id int identity(1,1) primary key,
 Product_id int references tblProduct(productid) on delete cascade,
 useremail nvarchar(255) references tblUser(useremail) on delete cascade
 )


 create table tblCompare
 (
 id int primary key identity(1,1),
 Product_id int references tblProduct(productid) on delete cascade,
 useremail nvarchar(255) references tblUser(useremail) on delete cascade
 )