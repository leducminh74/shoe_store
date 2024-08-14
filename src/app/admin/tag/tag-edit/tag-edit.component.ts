import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TagService} from "../../../services/tag.service";

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

  constructor(private fb:FormBuilder,private router:Router, private tagService: TagService, private  aRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.tagFormEdit = this.fb.group({
      tagId: ['',Validators.required],
      tagName: ['',Validators.required]
    });

    this.aRoute.paramMap.subscribe(query => {
      let id = query.get('id');
      this.tagService.getTagById(id).subscribe(res => {
        let tag = res;
        this.tagFormEdit = this.fb.group({
          tagId: [tag.tagId, Validators.required],
          id: [tag.id, Validators.required],
          tagName: [tag.tagName, Validators.required]
        })
      })

    })

  }

  get f (){
    return this.tagFormEdit.controls;
  }

  onSubmit(): any{
    this.submited = true;

    this.tagService.updateTag(this.tagFormEdit.value.id,this.tagFormEdit.value).subscribe({
      next:(res) =>{
        alert("Cập nhật thành công")
        this.router.navigate(['/admin/tag'])
        this.tagFormEdit.reset()
      },
      error:()=>{
        alert("Cập nhật thất bại")
      }
    });
  }


}
