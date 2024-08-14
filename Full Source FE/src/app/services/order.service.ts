import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Order} from "../model/order";
import {HttpClient} from "@angular/common/http";

const _api = "http://localhost:9999/api/v1/";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrder(){
    return this.http.get(_api+'order');
  }

  getOrderbyId(id:number){
    return this.http.get(_api+'order/'+id);
  }

  getOrderByAccount(acc_id:any){
    return this.http.get(_api+'order/account/' +acc_id);
  }

  getOrderDetailByOrder(order_id:number){
    return this.http.get(_api+'orderDetail/order/' + order_id);
  }

  createOrder(data: any): Observable<any>{
    let url = _api
    return this.http.post<any>(url+'order',data);

  }

  createOrderDetails(data: any): Observable<any>{
    let url = _api
    return this.http.post<any>(url+'orderDetail',data);
  }

  cancelOrder(order:number){
    let url = _api
    return this.http.post(url+'order/cancel',order)
  }

  acceptOrder(id:number){
    let url = _api
    return this.http.get(url+'order/accept/'+id)
  }

  shippingtOrder(id:number){
    let url = _api
    return this.http.get(url+'order/shipping/'+id)
  }

  deliveredOrder(id:number){
    let url = _api
    return this.http.get(url+'order/delivered/'+id)
  }



}
