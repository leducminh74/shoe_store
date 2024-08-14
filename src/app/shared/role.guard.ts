import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router : Router) {
  }
  canActivate() {
    let  Role = localStorage.getItem('userType');
    if(Role == "admin"){
      return true;
    }
    alert("Bạn không phải là admin!")
    this.router.navigate(['/login']);
    return false;
  }

}
