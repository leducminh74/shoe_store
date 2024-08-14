import { Component, OnInit } from '@angular/core';
import {Tag} from "../../model/tag";
import {TagService} from "../../services/tag.service";

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
  listTag:Array<Tag> = new Array<Tag>();

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe(data =>{
      this.listTag = data;
    })
  }

  removeTag(id: any): void{
    if(confirm("Bạn có chắc chắn muốn xóa danh mục này")){
      this.tagService.removeTag(id).subscribe({
        next:(res) =>{
          alert("Xóa thành công")
          this.ngOnInit();
        },
        error:()=>{
          alert("Xóa thất bại")
        }
      })

    }
  }


}
