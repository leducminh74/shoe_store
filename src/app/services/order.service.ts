import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Order} from "../model/order";
import {HttpClient} from "@angular/common/http";

const _api = "http://localhost:3000/order";
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrder(): Observable<Array<Order>>{
    return this.http.get<Array<Order>>(_api);
  }

  createOrder(data: any): Observable<any>{
    let url = _api
    return this.http.post<any>(url,data);
  }
}
