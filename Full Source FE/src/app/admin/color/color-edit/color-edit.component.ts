import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ColorService} from "../../../services/color.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: [
    './color-edit.component.css',
    './../../assets/css/style.css',
    './../../assets/css/sb-admin-2.min.css',
    './../../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class ColorEditComponent implements OnInit {
  colorFormEdit!: FormGroup;
  id:any;

  constructor(private fb:FormBuilder,private router:Router,private  aRoute:ActivatedRoute,private colorService:ColorService) { }

  ngOnInit(): void {

    this.colorFormEdit = this.fb.group({
      id: ['',Validators.required],
      color: ['',Validators.required]
    });

    this.aRoute.paramMap.subscribe(query => {
      let id = query.get('id');
      this.id = id
      this.colorService.getColor(this.id).subscribe((res:any) => {
        this.colorFormEdit = this.fb.group({
          id: [res.id, Validators.required],
          color: [res.color, Validators.required]
        })
      },error => {
        Swal.fire({
          icon: 'error',
          title: 'Không tìm thấy thông tin màu!!',
          showConfirmButton: true,
          timer: 1500
        }).then(result=>{
          this.router.navigate(['/admin/color'])
        })
      })

    })

  }

  onSubmit(){
    console.log(this.id)
    console.log(this.colorFormEdit)
    this.colorService.updateColor(this.id,this.colorFormEdit.value).subscribe({
      next:(res) =>{
        Swal.fire({
          icon:'success',
          title:'Cập nhật thành công',
          showConfirmButton:true,
          timer:3000,
        }).then(result =>{
          this.router.navigate(['/admin/color'])
        })
      },
      error:()=>{
        Swal.fire('Error','Màu đã tồn tại. Vui lòng kiểm tra lại!!','error')
      }
    });

  }

}
