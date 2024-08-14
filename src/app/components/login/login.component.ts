import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {Account} from "../../model/account";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './../../../assets/css/bootstrap.min.css',
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  isSubmitted = false;
  constructor(private formBuilder:FormBuilder, private accountService:AccountService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }


  login(){
    this.accountService.login().subscribe(data =>{
      const user = data.find((a:Account)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      } );

      if(user){
        this.loginForm.reset();
        localStorage.setItem('token','qweqwrqsfasasetasfasesafgasrseastfsfasasewgasd.123asferascas34asfrhinfamfihgbhu421423rasfer3')
        localStorage.setItem("userId",user.id);
        if(user.role == 0){
          this.router.navigate(['/admin/food'])
          localStorage.setItem('userType','admin');
        }else{
          this.router.navigate(['home'])
          localStorage.setItem('userType','customer');

        }
      }else{
        alert("Email hoặc mật khẩu không chính xác")
      }
    },error => {
      alert("Đăng nhập thất bại")
    })
  }

}
