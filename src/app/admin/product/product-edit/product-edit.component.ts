import { Component, OnInit } from '@angular/core';
import {Tag} from "../../../model/tag";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TagService} from "../../../services/tag.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css',
    './../../assets/css/style.css',
    './../../assets/css/sb-admin-2.min.css',
    './../../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class ProductEditComponent implements OnInit {
  submited: boolean = false;
  listTag: Array<Tag> = new Array<Tag>();
  proFormEdit!: FormGroup;

  constructor(private fb:FormBuilder, private productService:ProductService,private router:Router, private tagService: TagService, private  aRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.proFormEdit = this.fb.group({
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
    });

    this.tagService.getAllTags().subscribe(res => {
      this.listTag = res;
    });

    this.aRoute.paramMap.subscribe(query => {
      let id = query.get('id');
      this.productService.getProductById(id).subscribe(res => {
        let p = res;
        this.proFormEdit = this.fb.group({
          name: [p.name, Validators.required],
          id: [p.id, Validators.required],
          origin: [p.origin, Validators.required],
          cookTime: [p.cookTime, Validators.required],
          img: [p.img, Validators.required],
          des: [p.des, Validators.required],
          price: [p.price, Validators.required],
          sellPrice: [p.sellPrice, Validators.required],
          type: [p.type, Validators.required],
          stars: 0,
          favorite: false
        })
      })

    })
  }

  get f (){
    return this.proFormEdit.controls;
  }

  onSubmit(): any{
    this.submited = true;

    this.productService.updateProduct(this.proFormEdit.value.id,this.proFormEdit.value).subscribe({
      next:(res) =>{
        alert("Cập nhật thành công")
        this.router.navigate(['/admin/food'])
        this.proFormEdit.reset()
      },
      error:()=>{
        alert("Cập nhật thất bại")
      }
    });
  }


}
