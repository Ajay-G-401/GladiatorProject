import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompareService } from '../services/compare.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
compareList:any;
useremail:any = sessionStorage.getItem('useremail');
  constructor(private compareService:CompareService,private route:Router) 
  { 

  }

  ngOnInit(): void {
    console.log(this.useremail)
    this.compareService.GetCompare(this.useremail)
    .subscribe(
      data => {
        this.compareList = data;
        console.log(data)
      }
    )
  }

  Remove(wishlistid:any)
  {
    console.log(wishlistid)
    return this.compareService.RemoveProductCompare(wishlistid,this.useremail)
    .subscribe(
      data => {
        if(data="Success")
        {
          alert("removed product")
          window.location.reload()
        }
        else{
          alert("Something is wrong")
        }
      }
    )
  }

}
