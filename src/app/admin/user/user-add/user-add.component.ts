import { Component, OnInit } from '@angular/core';
import {Tag} from "../../../model/tag";
import {Role} from "../../../model/role";
import {RoleService} from "../../../services/role.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../../../services/account.service";

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
  submited: boolean = false;
  listRole: Array<Role> = new Array<Role>();
  userFormAdd = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required],
    role: ['',Validators.required]

  })
  constructor(private roleService:RoleService, private fb:FormBuilder,private router:Router,private accountService:AccountService) { }

  ngOnInit(): void {
    this.roleService.getAllRole().subscribe(res =>{
      this.listRole = res;
    })
  }

  get f (){
    return this.userFormAdd.controls;
  }

  onSubmit(): any{
    this.submited = true;

    if(this.userFormAdd.invalid){
      return false;
    }

    this.accountService.addAccount(this.userFormAdd.value).subscribe( {
      next:(res) =>{
        alert("Thêm thành công")
        this.router.navigate(['/admin/user'])
      },
        error:()=>{
        alert("Thêm thất bại")
      }
    });
  }


}
