import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {SizeService} from "../../../services/size.service";

@Component({
  selector: 'app-size-edit',
  templateUrl: './size-edit.component.html',
  styleUrls: [
    './size-edit.component.css',
    './../../assets/css/style.css',
    './../../assets/css/sb-admin-2.min.css',
    './../../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class SizeEditComponent implements OnInit {
  sizeFormEdit!: FormGroup;
  id:any;
  constructor(private fb:FormBuilder,private router:Router,private  aRoute:ActivatedRoute,private sizeService:SizeService) { }

  ngOnInit(): void {
    this.sizeFormEdit = this.fb.group({
      id: ['',Validators.required],
      size: ['',Validators.required]
    });

    this.aRoute.paramMap.subscribe(query => {
      let id = query.get('id');
      this.id = id
      this.sizeService.getSize(this.id).subscribe((res:any) => {
        this.sizeFormEdit = this.fb.group({
          id: [res.id, Validators.required],
          size: [res.size, Validators.required]
        })
      },error => {
        Swal.fire({
          icon: 'error',
          title: 'Không tìm thấy thông tin size!!',
          showConfirmButton: true,
          timer: 1500
        }).then(result=>{
          this.router.navigate(['/admin/size'])
        })
      })

    })

  }
  onSubmit(){
    console.log(this.id)
    console.log(this.sizeFormEdit)
    this.sizeService.updateSize(this.id,this.sizeFormEdit.value).subscribe({
      next:(res) =>{
        Swal.fire({
          icon:'success',
          title:'Cập nhật thành công',
          showConfirmButton:true,
          timer:3000,
        }).then(result =>{
          this.router.navigate(['/admin/size'])
        })
      },
      error:()=>{
        Swal.fire('Error','Size đã tồn tại. Vui lòng kiểm tra lại!!','error')
      }
    });

  }

}
