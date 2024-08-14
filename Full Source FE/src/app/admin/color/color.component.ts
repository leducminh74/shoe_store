import { Component, OnInit } from '@angular/core';
import {ColorService} from "../../services/color.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: [
    './color.component.css',
    './../assets/css/style.css',
    './../assets/css/sb-admin-2.min.css',
    './../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class ColorComponent implements OnInit {

  listColor:any;

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.loadAllColor()
  }

  loadAllColor(){
    this.colorService.getAllColor().subscribe((data:any)=>{
      this.listColor = data
    })
  }

  removeColor(id:number){
    Swal.fire({
      title:'Bạn có chắc chắn muốn xóa màu này?',
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Chắc chắn',
      cancelButtonText:'Khoan đã',
    }).then((result)=>{
      if(result.isConfirmed){
        this.colorService.removeColor(id).subscribe({
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
