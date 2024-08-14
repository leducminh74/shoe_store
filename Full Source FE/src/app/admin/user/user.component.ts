import { Component, OnInit } from '@angular/core';
import {Tag} from "../../model/tag";
import {Account} from "../../model/account";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.css',
    './../assets/css/style.css',
    './../assets/css/sb-admin-2.min.css',
    './../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class UserComponent implements OnInit {
  listUser:any;
  constructor(private accountService:AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getAllAccount().subscribe(data =>{
      this.listUser = data;
    })
  }

  disableAccount(id:number){
    Swal.fire({
      icon:'info',
      title:'Bạn có chắc chắn muốn vô hiệu hóa tài khoản này?',
      showCancelButton:true,
      cancelButtonText:'Khoan đã',
      confirmButtonText:'Chắc chắn',
    }).then((result)=>{
      if(result.isConfirmed){
        this.accountService.disableAccount(id).subscribe((data)=>{
          Swal.fire('Success','Vô hiệu hóa tài khoản thành công.','success')
          this.ngOnInit()
        },error => {
          Swal.fire('Error','Xảy ra lỗi trong quá trình thực hiện!!','error')
        })
      }
    })
  }

  enableAccount(id:number){
    Swal.fire({
      icon:'info',
      title:'Bạn có chắc chắn muốn kích hoạt lại tài khoản này?',
      showCancelButton:true,
      cancelButtonText:'Khoan đã',
      confirmButtonText:'Chắc chắn',
    }).then((result)=>{
      if(result.isConfirmed){
        this.accountService.enableAccount(id).subscribe((data)=>{
          Swal.fire('Success','Kích hoạt tài khoản thành công.','success')
          this.ngOnInit()
        },error => {
          Swal.fire('Error','Xảy ra lỗi trong quá trình thực hiện!!','error')
        })
      }
    })
  }

  setAdmin(id:number){
    Swal.fire({
      icon:'info',
      title:'Bạn có chắc chắn muốn chuyển tài khoản này sang vai trò admin?',
      showCancelButton:true,
      cancelButtonText:'Khoan đã',
      confirmButtonText:'Chắc chắn',
    }).then((result)=>{
      if(result.isConfirmed){
        this.accountService.setAdminAccount(id).subscribe((data)=>{
          Swal.fire('Success','Tài khoản đã được chuyển sang role admin','success')
          this.ngOnInit()
        },error => {
          Swal.fire('Error','Xảy ra lỗi trong quá trình thực hiện!!','error')
        })
      }
    })
  }

  setUser(id:number){
    Swal.fire({
      icon:'info',
      title:'Bạn có chắc chắn muốn chuyển tài khoản này sang vai trò user?',
      showCancelButton:true,
      cancelButtonText:'Khoan đã',
      confirmButtonText:'Chắc chắn',
    }).then((result)=>{
      if(result.isConfirmed){
        this.accountService.setUserAccount(id).subscribe((data)=>{
          Swal.fire('Success','Chuyển thành công.','success')
          this.ngOnInit()
        },error => {
          Swal.fire('Error','Xảy ra lỗi trong quá trình thực hiện!!','error')
        })
      }
    })
  }




}
