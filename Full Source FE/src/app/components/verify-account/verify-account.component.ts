import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  tokenVerify:String = "";
  message:String = "";
  constructor(private activatedRoute: ActivatedRoute,private  accountService:AccountService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param:any) =>{
      this.tokenVerify = param.token;
    })

    this.accountService.checkTokenVerifyAccount(this.tokenVerify).subscribe(res=>{
      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Xác thực thành công!',
        showConfirmButton: true,
        timer: 10000
      }).then(value =>{
        this.tokenVerify = "";
        this.message = "Xác thực thành công!";
        this.router.navigate(['/login']);
      })
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Xác thực thất bại!',
        showConfirmButton: true,
        timer: 10000
      }).then(value =>{
        this.tokenVerify = "";
        this.message = "Xác thực thất bại!";
        this.router.navigate(['/signup']);
      })

    })


  }

}
