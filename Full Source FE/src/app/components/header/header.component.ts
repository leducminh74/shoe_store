import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  logedIn:boolean = false
  username:any = localStorage.getItem("username");
  constructor(private router:Router) { }

  ngOnInit(): void {
    let loginToken = localStorage.getItem('token');
    if (loginToken==undefined||loginToken.concat()===''||loginToken ==null){
      this.logedIn = false;
    }else{
      this.logedIn = true;
    }
    console.log(this.logedIn)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
