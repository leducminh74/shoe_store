import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../model/tag";

const _api = "http://localhost:9999/api/v1/category";
@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getAllTags(){
    return this.http.get(_api);
  }

  getTagById(id: any){
    return this.http.get(_api+'/' + id);
  }

  addTag(data: any): Observable<any>{
    let url = _api
    return this.http.post<any>(url,data);
  }

  updateTag(id:number,data: any): Observable<any>{
    let url = _api
    return this.http.put<any>(url + '/' + id,data);
  }

  removeTag(id: number){
    return this.http.delete(_api + '/' +id);
  }
}
