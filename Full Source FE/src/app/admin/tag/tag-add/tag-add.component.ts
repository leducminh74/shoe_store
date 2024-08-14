import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TagService} from "../../../services/tag.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: [
    './tag-add.component.css',
    './../../assets/css/style.css',
    './../../assets/css/sb-admin-2.min.css',
    './../../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class TagAddComponent implements OnInit {

  tagFormAdd = this.fb.group({
    name: ['',Validators.required]
  })

  constructor(private fb:FormBuilder,private router:Router,private tagService:TagService) { }

  ngOnInit(): void {
  }

  get f (){
    return this.tagFormAdd.controls;
  }

  onSubmit(): any{

    if(this.tagFormAdd.invalid){
      return false;
    }

    this.tagService.addTag(this.tagFormAdd.value).subscribe(res =>{
      Swal.fire({
        title:'Thêm thành công',
        icon:'success',
        timer:3000,
        showConfirmButton:true
      }).then(result =>{
        this.router.navigate(['/admin/tag'])
      })
    },error => {
      console.log(error)
      Swal.fire('Error','Xảy ra lỗi trong quá trinh thêm danh mục!!','error')
    });
  }


}
