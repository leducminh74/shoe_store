import { Component, OnInit } from '@angular/core';
import {Tag} from "../../../model/tag";
import {Role} from "../../../model/role";
import {RoleService} from "../../../services/role.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {StatusAccountService} from "../../../services/status-account.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: [
    './user-add.component.css',
    './../../assets/css/style.css',
    './../../assets/css/sb-admin-2.min.css',
    './../../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class UserAddComponent implements OnInit {
  listRole: any;
  listStatus: any;
  userFormAdd = this.fb.group({
    username: ['',Validators.required],
    email: ['',Validators.required],
    password: ['',Validators.required],
    role: ['',Validators.required],
    status: ['',Validators.required],

  })
  constructor(private roleService:RoleService, private fb:FormBuilder,private router:Router,private accountService:AccountService,private statusAccountService:StatusAccountService) { }

  ngOnInit(): void {
    this.roleService.getAllRole().subscribe(res =>{
      this.listRole = res;
    })
    this.statusAccountService.getAllStatus().subscribe(res =>{
      this.listStatus = res;
    })
  }


  onSubmit(): any{

    if(this.userFormAdd.invalid){
      return false;
    }

    console.log(this.userFormAdd.value)

    this.accountService.addAccount(this.userFormAdd.value).subscribe( {
      next:(res) =>{
        Swal.fire('Success','Thêm thành công','success').then(result=>{
          this.router.navigate(['/admin/user'])
        })
      },
        error:()=>{
        Swal.fire('Error','Tài khoản hoặc email đã tồn tại. Vui lòng thử lại!!','error')
      }
    });
  }


}
