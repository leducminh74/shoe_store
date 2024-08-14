import { Component, OnInit } from '@angular/core';
import {Tag} from "../../model/tag";
import {TagService} from "../../services/tag.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: [
    './tag.component.css',
    './../assets/css/style.css',
    './../assets/css/sb-admin-2.min.css',
    './../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class TagComponent implements OnInit {
  listCategory:any;

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe(data =>{
      this.listCategory = data;
      console.log(this.listCategory)
    })
  }

  removeTag(id: any){
    Swal.fire({
      title:'Bạn có chắc chắn muốn xóa danh mục?',
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Chắc chắn',
      cancelButtonText:'Khoan đã',
    }).then((result)=>{
      if(result.isConfirmed){
        this.tagService.removeTag(id).subscribe({
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
