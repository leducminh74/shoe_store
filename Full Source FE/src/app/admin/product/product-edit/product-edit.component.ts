import { Component, OnInit } from '@angular/core';
import {Tag} from "../../../model/tag";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TagService} from "../../../services/tag.service";
import {ColorService} from "../../../services/color.service";
import {SizeService} from "../../../services/size.service";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  product:any;
  id:any;
  listCategory:any
  listSize:any;
  listColor:any;
  imgName = '';
  img:any;

  constructor(private fb:FormBuilder, private productService:ProductService,private router:Router, private tagService: TagService, private  aRoute:ActivatedRoute,private colorService:ColorService,private sizeService:SizeService,private snack:MatSnackBar) { }

  ngOnInit(): void {


    this.tagService.getAllTags().subscribe(res => {
      this.listCategory = res;
    });

    this.colorService.getAllColor().subscribe(res =>{
      this.listColor = res;
    })
    this.sizeService.getAllSize().subscribe(res =>{
      this.listSize = res;
    })

    this.aRoute.paramMap.subscribe(query => {
      let id = query.get('id');
      this.id = id;
      this.productService.getProductById(id).subscribe((res:any) => {
        this.product = res
        this.imgName = this.product.img
      })

    })
    console.log(this.product)
  }

  changeImg(event:any){
    this.imgName = event.target.files[0].name;
    this.img = event.target.files[0]
    this.product.img = this.imgName
  }

  onSubmit(){
    if(this.product.name.trim() == '' || this.product.name == null){
      return
    }
    if(this.imgName.trim() == '' || this.product.img == null){
      this.snack.open('Vui lòng chọn ảnh','ok',{
        duration:3000
      })
      return
    }
    if(this.product.description.trim() == '' || this.product.description == null){
      return
    }
    if(this.product.brand.trim() == '' || this.product.brand == null){
      return
    }
    if(this.product.color == null){
      return
    }
    if(this.product.size == null){
      return
    }
    if(this.product.price == '' || this.product.price == null){
      return
    }
    if(this.product.sellPrice == '' || this.product.sellPrice == null){
      return
    }
    if(this.product.quantity == '' || this.product.quantity == null){
      return
    }
    if(this.product.category == null){
      return
    }

    const image = new FormData();
    image.append('file', this.img)

    this.productService.uploadImage(image).subscribe((data:any)=>{

    },error => {
      console.log(error)
    })

    this.productService.updateProduct(this.id,this.product).subscribe({
      next:(res) =>{
        Swal.fire('Success','Cập nhật thành công')
        this.router.navigate(['/admin/food'])
      },
      error:()=>{
        Swal.fire('Error','Xảy ra lỗi trong quá trình cập nhật','error')
      }
    });
  }


}
