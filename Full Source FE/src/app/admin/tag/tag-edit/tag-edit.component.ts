import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TagService} from "../../../services/tag.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: [
    './tag-edit.component.css',
    './../../assets/css/style.css',
    './../../assets/css/sb-admin-2.min.css',
    './../../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class TagEditComponent implements OnInit {
  submited: boolean = false;
  tagFormEdit!: FormGroup;
  id:any;

  constructor(private fb:FormBuilder,private router:Router, private tagService: TagService, private  aRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.tagFormEdit = this.fb.group({
      id: ['',Validators.required],
      name: ['',Validators.required]
    });

    this.aRoute.paramMap.subscribe(query => {
      let id = query.get('id');
      this.id = id
      this.tagService.getTagById(id).subscribe((res:any) => {

        this.tagFormEdit = this.fb.group({
          id: [res.id, Validators.required],
          name: [res.name, Validators.required]
        })
      },error => {
        Swal.fire({
          icon: 'error',
          title: 'Không tìm thấy thông tin danh mục!!',
          showConfirmButton: true,
          timer: 1500
        }).then(result=>{
          this.router.navigate(['/admin/tag'])
        })
      })

    })

  }

  get f (){
    return this.tagFormEdit.controls;
  }

  onSubmit(): any{
    this.submited = true;

    this.tagService.updateTag(this.id,this.tagFormEdit.value).subscribe({
      next:(res) =>{
        Swal.fire({
          icon:'success',
          title:'Cập nhật thành công',
          showConfirmButton:true,
          timer:3000,
        }).then(result =>{
          this.router.navigate(['/admin/tag'])
        })
      },
      error:()=>{
        Swal.fire('Error','Cập nhật thất bại','error')
      }
    });
  }


}
