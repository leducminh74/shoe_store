import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const _api = "http://localhost:9999/api/v1/customer_review";
@Injectable({
  providedIn: 'root'
})
export class CustomerReviewService {
  constructor(private http: HttpClient) { }

  getReview(){
    return this.http.get(_api);
  }

}
