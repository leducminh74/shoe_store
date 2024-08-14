import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const _api = "http://localhost:9999/api/v1/color";


@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http:HttpClient) { }

  public getAllColor(){
    return this.http.get(_api)
  }

  public getColor(id:number){
    return this.http.get(_api+'/'+id)
  }

  public addColor(color:any){
    return this.http.post(_api,color)
  }

  public updateColor(id:number,color:any){
    return this.http.put(_api+'/'+id,color)
  }

  removeColor(id:number){
    return this.http.delete(_api + '/' +id);
  }

}
