import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ColorService} from "../../../services/color.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: [
    './color-add.component.css',
    './../../assets/css/style.css',
    './../../assets/css/sb-admin-2.min.css',
    './../../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class ColorAddComponent implements OnInit {

  colorFormAdd = this.fb.group({
    color: ['',Validators.required]
  })

  constructor(private fb:FormBuilder,private router:Router,private colorService:ColorService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.colorFormAdd.value)
    this.colorService.addColor(this.colorFormAdd.value).subscribe(res =>{
      Swal.fire({
        title:'Thêm thành công',
        icon:'success',
        timer:3000,
        showConfirmButton:true
      }).then(result =>{
        this.router.navigate(['/admin/color'])
      })
    },error => {
      console.log(error)
      Swal.fire('Error','Màu đã tồn tại. Vui lòng nhập màu khác!!','error')
    })
  }

}
