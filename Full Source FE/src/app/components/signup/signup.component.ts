import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Account} from "../../model/account";
import {Role} from "../../model/role";
import Swal from "sweetalert2";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.css',
    './../../../assets/css/bootstrap.min.css'
  ]
})
export class SignupComponent implements OnInit {
  public showPassword: boolean = false;
  public signupForm!: FormGroup;
  message:String = "";
  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3)]]
    })
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signUp(){
    console.log(this.signupForm.value)
    this.signupForm.value.email
    this.accountService.signup(this.signupForm.value).subscribe(data =>{
      this.signupForm.reset();
      this.message = "Vui lòng kiểm tra email để xác thực đăng ký!"
      Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công. Vui lòng xác thực email để hoàn tất việc đăng ký!!',
        showConfirmButton: true
      })
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Đăng kí thất bại.!',
        showConfirmButton: true
      })
    })
  }

}
