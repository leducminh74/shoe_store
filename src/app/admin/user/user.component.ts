import { Component, OnInit } from '@angular/core';
import {Tag} from "../../model/tag";
import {Account} from "../../model/account";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

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
  listUser:Array<Account> = new Array<Account>();
  constructor(private accountService:AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getAllAccount().subscribe(data =>{
      this.listUser = data;
    })
  }

  setAdmin(id:any){
    if(confirm("Bạn có chắc chắn muốn chuyển vai trò của tài khoản này thành admin?")){
      this.accountService.setAdmin(id).subscribe({
        next:(res) =>{
          alert("Cập nhật thành công")
          this.ngOnInit();
        },
        error:()=>{
          alert("Cập nhật thất bại")
        }
      })
    }
  }

  setCustomer(id:any){
    if(confirm("Bạn có chắc chắn muốn chuyển vai trò của tài khoản này thành người dùng?")){
      this.accountService.setCustomer(id).subscribe({
        next:(res) =>{
          alert("Cập nhật thành công")
          this.ngOnInit();
        },
        error:()=>{
          alert("Cập nhật thất bại")
        }
      })
    }

  }

}
