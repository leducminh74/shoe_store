import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AccountService} from "../services/account.service";

const TOKEN_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    let newReq = req;
    let token = localStorage.getItem("token");
    console.log("INTERCEPTOR ", token)
    if(token != null){
      newReq = newReq.clone({setHeaders:{Authorization:`Bearer ${token}`}})
      console.log(newReq)
    }
    return next.handle(newReq);
  }
}

