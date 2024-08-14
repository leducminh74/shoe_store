import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: [
    './change-password.component.css',
    './../../../assets/css/bootstrap.min.css'
  ]
})
export class ChangePasswordComponent implements OnInit {
  public showPassword: boolean = false;
  public showNewPassword: boolean = false;
  public changePasswordForm!: FormGroup;
  message:String = "";

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      userId: localStorage.getItem("userId"),
      password: ['', [Validators.required,Validators.minLength(3)]],
      newPassword: ['', [Validators.required,Validators.minLength(3)]]
    })
  }


  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  changePassword(){
    this.accountService.changePassword(this.changePasswordForm.value).subscribe(res=>{
      Swal.fire({
        icon: 'success',
        title: 'Đổi mật khẩu thành công!!',
        showConfirmButton: true
      }).then(success =>{
        this.router.navigate(['home']);
      })
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Đổi mật khẩu thất bại. Vui lòng nhập đúng mật khẩu hiện tại!!',
        showConfirmButton: true
      })
    })
  }

}
