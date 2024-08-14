import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const _api = "http://localhost:9999/api/v1/role";
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAllRole(){
    return this.http.get(_api);
  }
}
