import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retailerprofile',
  templateUrl: './retailerprofile.component.html',
  styleUrls: ['./retailerprofile.component.css']
})
export class RetailerprofileComponent implements OnInit {
  load=sessionStorage.getItem('reload');
  constructor() { }

  ngOnInit(): void {
    this. load=sessionStorage.getItem('reload');
    console.log(this.load)
    this.Reload();
  }
  Reload(){
    if(this.load=='load')
    {
      sessionStorage.setItem('reload','done')
      window.location.reload();
    }
    return
  }
}
