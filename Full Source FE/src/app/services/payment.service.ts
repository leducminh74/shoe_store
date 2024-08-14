import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const _api = "http://localhost:9999/api/v1/";
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public getAllPayment(){
    return this.http.get(_api + 'payment/getAllPayment')
  }

  public createPaymentVNPAY(totalPrice:any,orderId:any){
    return this.http.get(_api + 'payment/create-payment?totalPrice='+totalPrice+'&orderId='+orderId)

  }
}
