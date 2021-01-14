use dbGladiator

select * from tblUser

select * from tblProduct
select * from tblRetailer
select * from tblCart
select * from tblCategory
select * from tblOrder
select * from tblWishlist



----------------------------------------------------Ajay Work---------------------------------------------------------------------------------------

create proc proc_Get_Profile_User(@useremail varchar(255))
as
begin
      select * from tblUser where useremail=@useremail
end

create proc proc_Approve_Retailer(@retailerid int,@retaileremail varchar(225))
as
begin
      update tblRetailer set approved='accepted' where  retailerid= @retailerid and retaileremail=@retaileremail
end

create proc proc_Get_Pending_Retailers
as
begin
		select retailerid,retailername,retaileremail from tblRetailer where approved='pending'
end

create proc proc_Get_AllProducts
as
begin
	 select                 p.productid,
                             p.productname,
                             p.productimage1,
                             p.productdescription,
                             p.productprice,
							 p.productquantity,
							 p.productnotification,
							 p.productbrand,
                             ct.categoryname,
                             r.retailerid,
                             r.retailername,
                             r.retaileremail
	 from tblProduct p join tblRetailer r
	 on p.retailerid=r.retailerid
	 join tblCategory ct
	 on ct.categoryid=p.categoryid
	 where p.productstatus='accepted' and r.approved='accepted' and p.productquantity>0
end


create procedure proc_GetCart(@useremail varchar(255))
as
begin
		     select          p.productid,
                             p.productname,
                             p.productimage1,
                             p.productdescription,
                             p.productprice,
                             ct.categoryname,
                             c.useremail,
                             c.cartquantity,
                             r.retailerid,
                             r.retailername,
                             r.retaileremail,
                             c.cartid,
                             total = c.cartquantity * p.productprice
		from tblCart c join tblProduct p
		on c.productid=p.productid
		join tblCategory ct
		on ct.categoryid=p.categoryid
		join tblRetailer r
		on r.retailerid=p.retailerid
		where c.useremail=@useremail and p.productstatus='accepted' and r.approved='accepted'
end


create proc proc_Get_NotAvailableProducts(@useremail varchar(255))
as
begin
		     select          p.productid,
                             p.productname,
                             p.productimage1,
                             p.productdescription,
                             p.productprice,
                             ct.categoryname,
                             c.useremail,
                             c.cartquantity,
                             r.retailerid,
                             r.retailername,
                             r.retaileremail,
                             c.cartid,
                             total = c.cartquantity * p.productprice
		from tblCart c join tblProduct p
		on c.productid=p.productid
		join tblCategory ct
		on ct.categoryid=p.categoryid
		join tblRetailer r
		on r.retailerid=p.retailerid
		where c.useremail=@useremail and p.productstatus='accepted' and ( r.approved='pending' or p.productquantity=0)
end


create proc proc_Insert_Into_Cart(@useremail varchar(255),@productid int ,@cartquantity int)
as
begin
		insert into tblCart values (@useremail,@productid,@cartquantity)
end

create proc proc_Remove_From_Cart(@cartid int,@productid int)
as
begin
		delete from tblCart where  cartid =@cartid and productid=@productid
end


create proc proc_Update_Cart(@cartid int,@productid int,@quantity int)
as
begin
		update tblCart
		set cartquantity=@quantity where  cartid =@cartid and productid=@productid
end

create proc proc_Get_Cart_Total(@useremail varchar(225))
as
begin
       select sum(c.cartquantity*p.productprice) Total,count(p.productid) itemscount from tblCart c join tblProduct p
	   on p.productid=c.productid
	   join tblRetailer r
	   on r.retailerid=p.retailerid
	   where c.useremail=@useremail and p.productstatus='accepted' and r.approved='accepted'
end


create proc proc_Get_All_Retailers
as
begin
		select * from tblRetailer
end



create  proc proc_Get_User_Orders(@useremail varchar(255))
as
begin
       select  u.useremail,
                             u.username,
                             u.userphone,
                             u.userapartment,
                             u.userstreet,
                             u.usertown,
                             u.userstate,
                             u.userpincode,
                             u.usercountry,
                             o.orderid,
                             o.orderdate,
                             p.productname,
                             p.productprice,
                             p.productbrand,
                             p.productdescription,
                             o.orderquantity,
							 o.orderprice 
							 from tblOrder o join tblProduct p
	   on p.productid=o.productid
	   join tblUser u
	   on u.useremail=o.useremail
	   where o.useremail=@useremail
end


create proc  proc_Insert_Order (@orderdate varchar(45),@useremail varchar(255),@productid int,@retailerid int,@orderquantity int,@orderprice float)
as
begin
   insert into tblOrder values(@orderdate,@useremail,@productid,@retailerid,@orderquantity,@orderprice)
   update tblProduct set productquantity=productquantity-@orderquantity where productid=@productid
end


create proc proc_Insert_Category(@categoryname varchar(45),@description varchar(max))
as
begin
   insert into tblCategory values(@categoryname,@description);
end

create proc proc_Get_Categories
as
begin
    select * from tblCategory
end


create proc proc_Search_Result(@search varchar(25))
as
begin
	 select                 p.productid,
                             p.productname,
                             p.productimage1,
                             p.productdescription,
                             p.productprice,
							 p.productquantity,
							 p.productbrand,
                             ct.categoryname,
                             r.retailerid,
                             r.retailername,
                             r.retaileremail
	 from tblProduct p join tblRetailer r
	 on p.retailerid=r.retailerid
	 join tblCategory ct
	 on ct.categoryid=p.categoryid
	 where p.productstatus='accepted' and r.approved='accepted' and p.productquantity>0 and
	 (p.productname like '%'+@search+'%' or p.productdescription like '%'+@search+'%' 
	 or ct.categoryname like '%'+@search+'%' or  p.productbrand like '%'+@search+'%'
	  or ct.categorydescription like '%'+@search+'%' )
end


create proc proc_Pending_Products
as
begin
    select                   p.productid,
                             p.productname,
                             p.productimage1,
                             p.productdescription,
                             p.productprice,
							 p.productquantity,
							 p.productbrand,
							 p.productnotification,
                             ct.categoryname,
                             r.retailerid,
                             r.retailername,
                             r.retaileremail
	 from tblProduct p join tblRetailer r
	 on p.retailerid=r.retailerid
	 join tblCategory ct
	 on ct.categoryid=p.categoryid
	 where p.productstatus='pending' and r.approved='accepted' and 
	 (productnotification='update' or productnotification='add')
end


create proc proc_Remove_Product(@productid int)
as
begin
   update tblProduct set productnotification='remove' ,  productstatus='pending' where  productid=@productid
end


create proc proc_Approve_Product(@productid int)
as
begin
   update tblProduct set  productstatus='accepted' where  productid=@productid
end


create proc proc_Reject_Product(@productid int)
as
begin
   update tblProduct set  productstatus='rejected' where  productid=@productid
end


create proc proc_Get_WishList(@useremail varchar(255))
as
begin
      select                 p.productid,
                             p.productname,
                             p.productimage1,
                             p.productdescription,
                             p.productprice,
							 p.productquantity,
							 p.productbrand,
							 p.productnotification,
                             ct.categoryname,
                             r.retailerid,
                             r.retailername,
                             r.retaileremail,
							 w.id
	 from tblProduct p join tblRetailer r
	 on p.retailerid=r.retailerid
	 join tblCategory ct
	 on ct.categoryid=p.categoryid
	 join tblWishlist w
	 on w.Product_id=p.productid
	 where p.productstatus='accepted' and r.approved='accepted' and w.useremail=@useremail and p.productquantity>0
end


create proc proc_Add_To_Wishlist(@productid int,@useremail varchar(225))
as
begin
    insert into tblWishlist values(@productid,@useremail)
end


create proc proc_Remove_From_Wishlist(@wishlistid int)
as
begin
   delete from tblWishlist where id=@wishlistid
end

create proc proc_Get_Category_Count(@productid int,@useremail varchar(255))
as
begin
       declare
	   @categoryid int;
	   set @categoryid = (select categoryid  from tblProduct where productid=@productid )
       select count(c.id) cnt from tblCompare c join tblProduct p
	   on p.productid=c.Product_id
	   where c.useremail=@useremail and p.categoryid=@categoryid
end




create proc proc_Insert_Compare(@productid int,@useremail varchar(255))
as
begin
    insert into tblCompare values(@productid,@useremail)
end

create proc proc_Remove_Compare(@useremail varchar(255))
as
begin
      delete from tblCompare where useremail= @useremail
end



create proc proc_Remove_Product_Compare(@wishlistid int,@useremail varchar(255))
as
begin
      delete from tblCompare where useremail= @useremail and id=@wishlistid
end



create proc proc_GetCompare(@useremail varchar(255))
as
begin
         select                 p.productid,
                             p.productname,
                             p.productimage1,
                             p.productdescription,
                             p.productprice,
							 p.productquantity,
							 p.productbrand,
							 p.productnotification,
                             ct.categoryname,
                             r.retailerid,
                             r.retailername,
                             r.retaileremail,
							 c.id
	 from tblProduct p join tblRetailer r
	 on p.retailerid=r.retailerid
	 join tblCategory ct
	 on ct.categoryid=p.categoryid
	 join tblCompare c
	 on c.Product_id=p.productid
	 where p.productstatus='accepted' and r.approved='accepted' and c.useremail=@useremail
end






----------------------------------------------------------------------kirti work---------------------------------------------------------------------------------

create proc proc_RetailLoginCheck(@rmail varchar(40),@pass varchar(40))
as 
begin
	select retaileremail,retailerpassword from tblRetailer where retaileremail=@rmail and retailerpassword=@pass and approved='accepted'
end


create proc proc_Changepass(@rmail nvarchar(40),@rpass nvarchar(40))
as
begin
UPDATE tblRetailer
SET retailerpassword=@rpass
WHERE retaileremail=@rmail
end


create proc proc_DisplayProducts(@rmail varchar(40))
as 
begin
	select p.productid,p.productname,p.productprice,p.productquantity,p.productdescription,p.productbrand,p.productstatus,c.categoryname
	from tblProduct p join tblRetailer r 
	on p.retailerid=r.retailerid 
	join tblCategory c
	on p.categoryid=c.categoryid
	where p.retailerid =(select retailerid from tblRetailer where retaileremail=@rmail) 
	and p.productnotification not in ('remove') 
	and p.productstatus not in ('pending','rejected')

end

proc_DisplayProducts 'iconajay9.8@gmail.com'

update tblProduct set productstatus='accepted'



alter proc proc_UpdateProduct(@productid int,@rmail varchar(40),@pprice float,@pquantity int,@pdescrip nvarchar(max))
as 
begin
	update tblProduct set productprice=@pprice,productquantity=@pquantity,productdescription=@pdescrip, productnotification='updated',productstatus='pending' where retailerid=(select retailerid from tblRetailer where retaileremail=@rmail) and productid=@productid
end


create proc proc_DisplayRetailerDetails(@rmail varchar(40))
as 
begin
	select p.productname,p.productbrand,o.useremail,p.productprice,o.orderquantity,p.productstatus
	from tblProduct p join tblOrder o 
	on p.retailerid=o.retailerid 
	where p.retailerid in (select retailerid from tblRetailer where retaileremail=@rmail)

end




proc_DisplayRetailerDetails 'iconajay9.8@gmail.com'












-----------------------------------------saloni Work--------------------



create proc sp_SortByPriceAsc
as
begin
    select p.productname,
	       p.productprice,
	       p.productquantity,
	       p.productdescription,
	       p.productimage1 
	from tblProduct p join tblRetailer r on p.retailerid = r.retailerid
	where productstatus = 'accepted' and  
	approved = 'accepted ' order by(productprice)
end


create proc sp_SortByPriceDesc
as
begin
    select p.productname,
	       p.productprice,
	       p.productquantity,
	       p.productdescription,
	       p.productimage1 
	from tblProduct p join tblRetailer r on p.retailerid = r.retailerid
	where productstatus = 'accepted' and  
	approved = 'accepted ' order by(productprice)desc
end

create proc sp_GetAllProduct
as 
begin
    
	select p.productname,
	       p.productprice,
	       p.productquantity,
	       p.productdescription,
	       p.productimage1 
	from tblProduct p join tblRetailer r on p.retailerid = r.retailerid
	where productstatus = 'accepted' and  
	approved = 'accepted '

end

create proc sp_GetPdtByPrice(@Lower float, @Upper float)
as
begin
    select p.productname,
	       p.productprice,
	       p.productquantity,
	       p.productdescription,
	       p.productimage1 
		   from tblProduct p join tblRetailer r on p.retailerid = r.retailerid
	where productstatus = 'accepted' and  
	approved = 'accepted ' and  productprice >@Lower and productprice<=@Upper
end


create proc sp_GetPdtByCategory(@cname nvarchar(max))
as
begin
   select  p.productname,
	       p.productprice,
	       p.productquantity,
	       p.productdescription,
	       p.productimage1 
		   from tblProduct p join tblRetailer r on p.retailerid = r.retailerid
		   join tblCategory c on c.categoryid = p.categoryid
	where productstatus = 'accepted' and  
	approved = 'accepted ' and categoryname =@cname
end



create proc sp_GetPdtByPriceCategory(@Lower float, @Upper float, @Cname nvarchar(max))
 as
 begin
    select p.productname,
	       p.productprice,
	       p.productquantity,
	       p.productdescription,
	       p.productimage1 
		   from tblProduct p join tblRetailer r on p.retailerid = r.retailerid
		   join tblCategory c on c.categoryid = p.categoryid
	where productstatus = 'accepted' and  
	approved = 'accepted ' and categoryname =@cname and  productprice >@Lower and productprice<=@Upper
 end


 create proc sp_getCat
as
begin
   select categoryname from tblCategory
end