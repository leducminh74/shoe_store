import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.css',
    './../../../assets/css/bootstrap.min.css'
  ]
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
      role:1
    })
  }

  signUp(){
    this.signupForm.value.email
    this.accountService.signup(this.signupForm.value).subscribe(data =>{
      alert("Đăng ký thành công");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },error => {
      alert("Đăng ký thất bại")
    })
  }

}
