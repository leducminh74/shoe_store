import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  login:any = localStorage.getItem('token');

  logedIn:boolean = false

  constructor(private router:Router) { }

  ngOnInit(): void {
    if (this.login.length > 0){
      this.logedIn = true;
    }
    console.log(this.logedIn)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
