import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "./auth.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : AuthService, private router : Router) {
  }
  canActivate(){
    if(this.auth.IsLoggedIn()) {
      return true;
    }
    Swal.fire({
      icon: 'question',
      title: 'Bạn chưa đăng nhập?',
      showConfirmButton: true
    }).then(af =>{
      this.router.navigate(['/login']);
    })
    return false;
  }

}
