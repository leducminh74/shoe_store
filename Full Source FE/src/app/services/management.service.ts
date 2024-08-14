import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const _api = "http://localhost:9999/api/v1/management";
@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http:HttpClient) { }

  totalRevenue(year:number){
    let url = _api
    return this.http.get(url+'/revenue?year='+year)
  }

  accountStatistics(){
    let url = _api
    return this.http.get(url+'/account-statistics')
  }

  orderStatistics(){
    let url = _api
    return this.http.get(url+'/order-statistics')
  }

  totalRevenueOfYear(year:number){
    let url = _api
    return this.http.get(url+'/total-revenue-ofYear?year='+year)
  }
}
