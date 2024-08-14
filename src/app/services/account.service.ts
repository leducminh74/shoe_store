import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Account} from "../model/account";
import {Observable} from "rxjs";

const _api = "http://localhost:3000/account";
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  signup(a: any){
    let url = _api;
    return this.http.post<Account>(url,a)
  }

  login(){
    let url = _api;
    return this.http.get<any>(url)
  }

  getAllAccount(): Observable<Array<Account>>{
    return this.http.get<Array<Account>>(_api);
  }

  getAccountById(id: any): Observable<Account>{
    return this.http.get<Account>(_api + '/' +id);
  }

  addAccount(data: any): Observable<any>{
    let url = _api
    return this.http.post<any>(url,data);
  }

  setAdmin(id:any){
    let url = _api
    return this.http.patch(url + '/' +id,{role: 0});
  }

  setCustomer(id:any){
    let url = _api
    return this.http.patch(url + '/' +id,{role: 1});
  }

}
