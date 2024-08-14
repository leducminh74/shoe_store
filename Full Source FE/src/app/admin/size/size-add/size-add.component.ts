import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {SizeService} from "../../../services/size.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-size-add',
  templateUrl: './size-add.component.html',
  styleUrls: [
    './size-add.component.css',
    './../../assets/css/style.css',
    './../../assets/css/sb-admin-2.min.css',
    './../../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class SizeAddComponent implements OnInit {

  sizeFormAdd = this.fb.group({
    size: ['',Validators.required]
  })

  constructor(private fb:FormBuilder,private sizeService:SizeService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.sizeService.addSize(this.sizeFormAdd.value).subscribe(res =>{
      Swal.fire({
        title:'Thêm thành công',
        icon:'success',
        timer:3000,
        showConfirmButton:true
      }).then(result =>{
        this.router.navigate(['/admin/size'])
      })
    },error => {
      console.log(error)
      Swal.fire('Error','Size đã tồn tại. Vui lòng nhập size khác!!','error')
    })
  }

}
