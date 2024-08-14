import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer_Review} from "../model/customer_Review";

const _api = "http://localhost:3000/";
@Injectable({
  providedIn: 'root'
})
export class CustomerReviewService {
  constructor(private http: HttpClient) { }

  getReview(): Observable<Array<Customer_Review>>{
    return this.http.get<Array<Customer_Review>>(_api + 'customerReview');
  }

}
