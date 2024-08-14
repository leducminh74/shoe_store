import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TagService} from "../../../services/tag.service";

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
  submited: boolean = false;

  tagFormAdd = this.fb.group({
    tagId: ['',Validators.required],
    tagName: ['',Validators.required],
  })

  constructor(private fb:FormBuilder,private router:Router,private tagService:TagService) { }

  ngOnInit(): void {
  }

  get f (){
    return this.tagFormAdd.controls;
  }

  onSubmit(): any{
    this.submited = true;

    if(this.tagFormAdd.invalid){
      return false;
    }

    this.tagService.addTag(this.tagFormAdd.value).subscribe(res =>{
      alert("Thêm thành công")
      this.router.navigate(['/admin/tag'])
    });
  }


}
