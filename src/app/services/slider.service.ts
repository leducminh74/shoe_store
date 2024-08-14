import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Slider} from "../model/slider";

const _api = "http://localhost:3000/slider";
@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }

  getSlider(): Observable<Array<Slider>>{
    return this.http.get<Array<Slider>>(_api);
  }
}
