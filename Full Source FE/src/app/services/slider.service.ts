import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const _api = "http://localhost:9999/api/v1/slider";
@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }

  getSlider(){
    return this.http.get(_api);
  }
}
