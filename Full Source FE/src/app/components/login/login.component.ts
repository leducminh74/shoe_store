import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {
  FacebookLoginProvider,
  SocialAuthService
} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './../../../assets/css/bootstrap.min.css',
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  public showPassword: boolean = false;
  public loginForm!: FormGroup;
  isSubmitted = false;

  message:String = "";

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router,private authService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(3)]]
    })

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.accountService.generateToken(this.loginForm.value).subscribe((res:any) =>{
      const user = res.acc;
      if(user.status.id == 1){
        this.loginForm.reset();
        localStorage.setItem("token",res.token);
        localStorage.setItem("userId",res.acc.userId);
        localStorage.setItem("username",res.acc.username);
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          showConfirmButton: true,
          timer: 500
        })
        .then(value => {
          if (user.role.name == "admin"){
            this.router.navigate(['/admin'])
            localStorage.setItem('userType', user.role.name);
          } else{
            this.router.navigate(['home']);
            localStorage.setItem('userType', user.role.name);
          }
        });
      } else if (user.status.id == 2){
        Swal.fire({
          icon: 'warning',
          title: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ cửa hàng để biết thêm thông tin!!',
          showConfirmButton: true
        })
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Tài khoản của bạn chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản!!',
          showConfirmButton: true
        })
      }

    },error => {
      this.message = 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!';
    })

  }

  loginWithFacebook(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)

  }

}
