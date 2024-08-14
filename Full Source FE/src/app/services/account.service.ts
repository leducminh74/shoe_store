import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Account} from "../model/account";
import {Observable} from "rxjs";

const _api = "http://localhost:9999/api/v1/account";
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  signup(a: any){
    let url = _api;
    return this.http.post<Account>(url,a)
  }

  checkTokenVerifyAccount(tokenResetPass:any): Observable<any>{
    let url = _api;
    return this.http.get(url+'/verify/' + tokenResetPass);
  }

  login(){
    let url = _api;
    return this.http.get<any>(url);
  }

  generateToken(credentials:any){
    return this.http.post("http://localhost:9999/token",credentials);
  }

  getAllAccount(): Observable<Array<Account>>{
    return this.http.get<Array<Account>>(_api);
  }

  getAccountById(id: any): Observable<Account>{
    return this.http.get<Account>(_api + '/' +id);
  }

  addAccount(data: any){
    let url = _api
    return this.http.post(url+'/admin',data);
  }


  forGotPassword(email:any){
    let url = _api;
    return this.http.post(url + '/forgot_password',email);
  }

  checkTokenResetPassword(tokenResetPass:any): Observable<any>{
    let url = _api;
    return this.http.get(url+'/reset_password/' + tokenResetPass);
  }

  resetPass(req:any){
    let url = _api;
    return this.http.post(url+'/reset_password',req);
  }

  changePassword(req:any){
    let url = _api;
    return this.http.post(url+'/change_password',req);
  }

  viewProfile(id:any){
    let url = _api;
    return this.http.get(url + '/profile/' + id);
  }

  updateProfile(req:any){
    let url = _api;
    return this.http.put(url + '/profile' ,req);
  }

  setAdminAccount(id:any){
    return this.http.get(_api+'/setAdmin/'+id)
  }

  setUserAccount(id:any){
    return this.http.get(_api+'/setUser/'+id)
  }

  disableAccount(id:any){
    return this.http.get(_api+'/disable/'+id)
  }

  enableAccount(id:any){
    return this.http.get(_api+'/enable/'+id)
  }

  addProductToFavoriteList(uId:any,pId:any){
    return this.http.post(_api+'/favorite/'+uId,pId)
  }

  removeProductInFavoriteList(uId:any,pId:any){
    return this.http.post(_api+'/favorite/remove/'+uId,pId)
  }
}
