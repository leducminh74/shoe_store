import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const _api = "http://localhost:9999/api/v1/status-account"

@Injectable({
  providedIn: 'root'
})
export class StatusAccountService {

  constructor(private http:HttpClient) { }

  public getAllStatus(){
    return this.http.get(_api)
  }
}
