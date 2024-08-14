import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginCheckGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router) {
  }

  canActivate() {
    let  role = localStorage.getItem('userType');
    if(this.auth.IsLoggedIn()) {
      if(role === "admin"){
        this.router.navigate(['/admin/food']);
      }else if(role === "user"){
        this.router.navigate(['/home']);
      }
      return false;
    }else{
      return true;
    }

  }

}
