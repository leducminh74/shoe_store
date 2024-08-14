import { Component, OnInit } from '@angular/core';
import {SizeService} from "../../services/size.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: [
    './size.component.css',
    './../assets/css/style.css',
    './../assets/css/sb-admin-2.min.css',
    './../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class SizeComponent implements OnInit {

  listSize:any;

  constructor(private sizeService:SizeService) { }

  ngOnInit(): void {
    this.loadAllSize()
  }

  loadAllSize(){
    this.sizeService.getAllSize().subscribe((data:any)=>{
      this.listSize = data
    })
  }


  removeSize(id:any){
    Swal.fire({
      title:'Bạn có chắc chắn muốn xóa size này?',
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Chắc chắn',
      cancelButtonText:'Khoan đã',
    }).then((result)=>{
      if(result.isConfirmed){
        this.sizeService.removeSize(id).subscribe({
          next:(res) =>{
            Swal.fire('Success','Xóa thành công','success')
            this.ngOnInit();
          },
          error:()=>{
            Swal.fire('Error','Xóa thất bại!!','error')
          }
        })
      }
    })

  }



}
