import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const _api = "http://localhost:9999/api/v1/size";


@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http:HttpClient) { }

  public getAllSize(){
    return this.http.get(_api)
  }
  public getSize(id:number){
    return this.http.get(_api+'/'+id)
  }

  public addSize(size:any){
    return this.http.post(_api,size)
  }

  public updateSize(id:number,size:any){
    return this.http.put(_api+'/'+id,size)
  }

  removeSize(id:number){
    return this.http.delete(_api + '/' +id);
  }
}
