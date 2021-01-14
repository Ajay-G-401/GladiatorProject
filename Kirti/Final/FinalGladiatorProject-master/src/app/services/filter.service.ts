import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http:HttpClient) { }
  url:string="http://localhost:60316/";
  filterbyprice(p1:any):Observable<any>
  {
     // debugger;
      return this.http.get(this.url+"FilterByPrice?price="+p1);
  }

  filterbycategory(cname:string):Observable<any>
  {
     // debugger;
     return this.http.get(this.url+"FilterByCategory?cname="+cname);
  }
  filterbyboth(p1:string,cname:string):Observable<any>
  {
    return this.http.get(this.url+"FilterByBoth?price="+p1+" &cname="+cname);
  }
  sortByPriceAsc():Observable<any>
  {
    return this.http.get(this.url+"SortByPrice");
  }
  sortByPriceDesc():Observable<any>
  {
    return this.http.get(this.url+"SortByPriceDesc");
  }
  getallcategory():Observable<any>{
    return this.http.get(this.url+"GetByCategory");
  }
}