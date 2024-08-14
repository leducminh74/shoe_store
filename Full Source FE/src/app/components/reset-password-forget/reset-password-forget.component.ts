import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-reset-password-forget',
  templateUrl: './reset-password-forget.component.html',
  styleUrls: [
    './reset-password-forget.component.css',
    './../../../assets/css/bootstrap.min.css'
  ]
})
export class ResetPasswordForgetComponent implements OnInit {
  public showPassword: boolean = false;
  public resetPasswordForm!: FormGroup
  tokenForgotPass:String = "";
  message:String = "";

  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private accountService:AccountService,private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((param:any) =>{
      this.tokenForgotPass = param.token;
    })

    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required,Validators.minLength(3)]],
      token: this.tokenForgotPass
    })


    this.accountService.checkTokenResetPassword(this.tokenForgotPass).subscribe(res=>{
      console.log(res)
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Token invalid!',
        showConfirmButton: true,
        timer: 10000
      }).then(value =>{
        this.tokenForgotPass = "";
        this.message = "Invalid Token";
        this.router.navigate(['/forgot-password']);
      })

    })
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  resetPassword(){
    console.log(this.resetPasswordForm.value)
    this.accountService.resetPass(this.resetPasswordForm.value).subscribe(res=>{
      this.tokenForgotPass = "";
      Swal.fire({
        icon: 'success',
        title: 'Đặt lại mật khẩu thành công!',
        showConfirmButton: true,
        timer: 3000
      }).then(  (result) =>{
        this.router.navigate(['/login']);
        }
      )
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Đặt lại mật khẩu thất bại!',
        showConfirmButton: true,
        timer: 3000
      })
    })
  }

}
