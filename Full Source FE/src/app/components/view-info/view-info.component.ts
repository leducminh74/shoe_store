import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Profile} from "../../model/profile";
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls:
    [
      './view-info.component.css',
      './../../../assets/css/bootstrap.min.css'
    ]
})
export class ViewInfoComponent implements OnInit {

  profile:any;
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {

    let id = localStorage.getItem("userId");
    this.accountService.viewProfile(id).subscribe((res:any) =>{
      this.profile = res;
      console.log(res.phoneNumber)
      if ( res.name == null||  res.address == null ||  res.phoneNumber == null){
        Swal.fire({
          icon: 'warning',
          title: 'Vui lòng hoàn tất thông tin tài khoản để có thể đặt hàng nhanh hơn!',
          showConfirmButton: true
        })

      }else if(res.name == '' || res.address == '' || res.phoneNumber == ''){
        Swal.fire({
          icon: 'warning',
          title: 'Vui lòng hoàn tất thông tin tài khoản để có thể đặt hàng nhanh hơn!',
          showConfirmButton: true
        })

      }

    },error => {
      console.log(error)
    })

  }

  updateProfile(){
    this.accountService.updateProfile(this.profile).subscribe((res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công!',
        showConfirmButton: true
      })
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Cập nhật thất bại!',
        showConfirmButton: true
      })
    })
  }

}
