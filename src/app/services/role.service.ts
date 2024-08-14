import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Role} from "../model/role";

const _api = "http://localhost:3000/role";
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAllRole(): Observable<Array<Role>>{
    return this.http.get<Array<Role>>(_api);
  }
}
