import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {Tag} from "../../../model/tag";
import {TagService} from "../../../services/tag.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: [
    './product-add.component.css',
    './../../assets/css/style.css',
    './../../assets/css/sb-admin-2.min.css',
    './../../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class ProductAddComponent implements OnInit {
  submited: boolean = false;
  listTag: Array<Tag> = new Array<Tag>();
  proFormAdd = this.fb.group({
    name: ['',Validators.required],
    origin: ['',Validators.required],
    cookTime: ['',Validators.required],
    img: ['',Validators.required],
    des: ['',Validators.required],
    price: ['',Validators.required],
    sellPrice: ['',Validators.required],
    type: ['',Validators.required],
    stars: 0,
    favorite: false
  })

  constructor(private fb:FormBuilder, private productService:ProductService,private router:Router, private tagService: TagService) { }

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe(res =>{
      this.listTag = res;
    })
  }

  get f (){
    return this.proFormAdd.controls;
  }

  onSubmit(): any{
    this.submited = true;

    if(this.proFormAdd.invalid){
      return false;
    }

    this.productService.addProduct(this.proFormAdd.value).subscribe(res =>{
      alert("Thêm thành công")
      this.router.navigate(['/admin/food'])
    });
  }

}
