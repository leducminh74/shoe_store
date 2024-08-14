import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const _api = "http://localhost:9999/api/v1/product";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(pageNumber:number,pageSize:number,sortBy:any,sortDir:any){
    let url = _api;

    return this.http.get(url+'?pageNumber='+pageNumber+'&pageSize='+pageSize +'&sortBy='+sortBy+'&sortDir='+sortDir);
  }

  searchProduct(name:any){
    let url = _api;
    return this.http.get(url + '/search/?name='+name)

  }

  getProductByCategory(category: any){
    let url = _api;
    return this.http.get(url+'/category/'+category);
  }

  getProductById(id: any){
    let url = _api
    return this.http.get(url + '/' +id);
  }

  addProduct(data: any){
    let url = _api
    return this.http.post(url,data);
  }

  updateProduct(id:number,data: any){
    let url = _api
    return this.http.put(url + '/' + id,data);
  }

  removeProduct(id: number){
    let url = _api
    return this.http.delete(url + '/' + id);
  }

  getTopNumProductDateDESC(){
    let url = _api
    return this.http.get(url + '/new-product')
  }

  getTopNumProductQuantitySoldAsc(){
    let url = _api
    return this.http.get(url + '/popular-product')
  }

  getSameProduct(cid:number){
    let url = _api
    return this.http.get(url + '/same-product/'+cid)
  }

  countNumberOfProduct(){
    let url = _api
    return this.http.get(url + '/count')

  }

  uploadImage(image:any){
    let url = _api
    return this.http.post(url+'/upload_image',image)
  }



}
