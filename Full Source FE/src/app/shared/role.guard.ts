import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router : Router) {
  }
  canActivate() {
    let  role = localStorage.getItem('userType');
    if(role === "admin"){
      return true;
    }
    Swal.fire({
      icon: 'warning',
      title: 'Bạn không phải là admin!!',
      showConfirmButton: true,
      timer: 1500
    }).then(value =>{
      this.router.navigate(['/home']);
    })
    return false;
  }

}
