import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    './forgot-password.component.css',
    './../../../assets/css/bootstrap.min.css'
  ]
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup
  message:String = "";

  constructor(private formBuilder: FormBuilder,private accountService:AccountService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]]

    })

  }

  forgotPassword(){
    console.log(this.forgotPasswordForm.value)
    this.accountService.forGotPassword(this.forgotPasswordForm.value).subscribe(res =>{
      this.message = "Email đã được gửi. Vui lòng kiểm tra email của bạn!"
      Swal.fire('Success done !!',"Email đã được gửi thành công",'success');
    },error => {
      this.message = "Email không tồn tại. Vui lòng kiểm tra lại!"
      Swal.fire('error',"Email không tồn tại. Vui lòng kiểm tra lại!",'error');
    })
  }

}
