import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {TagService} from "../../../services/tag.service";
import {ColorService} from "../../../services/color.service";
import {SizeService} from "../../../services/size.service";
import {DomSanitizer} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  listCategory: any;
  listColor: any;
  listSize: any;
  imgName = '';
  img:any;

  proFormAdd = this.fb.group({
    name: ['',Validators.required],
    img: ['',Validators.required],
    description: ['',Validators.required],
    brand: ['',Validators.required],
    color: ['',Validators.required],
    size: ['',Validators.required],
    quantity: ['',Validators.required],
    price: ['',Validators.required],
    sellPrice: ['',Validators.required],
    category: ['',Validators.required]
  })

  constructor(private fb:FormBuilder, private productService:ProductService,private router:Router, private tagService: TagService,private colorService:ColorService,private sizeService:SizeService,private sanitizer:DomSanitizer,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe(res =>{
      this.listCategory = res;
    })
    this.colorService.getAllColor().subscribe(res =>{
      this.listColor = res;
    })
    this.sizeService.getAllSize().subscribe(res =>{
      this.listSize = res;
    })
  }

  changeImg(event:any){
    this.imgName = event.target.files[0].name;
    this.img = event.target.files[0]
  }


  onSubmit(): any{
    if(this.imgName == ''){
      this.snack.open('Vui lòng chọn ảnh!!','ok',{
        duration:3000
      })
      return
    }
    this.submited = true;
    const image = new FormData();
    image.append('file', this.img)

    this.proFormAdd.controls['img'].setValue(this.imgName)

    this.productService.uploadImage(image).subscribe((data:any)=>{

    },error => {
      console.log(error)
    })
    this.productService.addProduct(this.proFormAdd.value).subscribe(res =>{
      Swal.fire('Success','Thêm sản phẩm thành công','success').then(rs =>{
        this.router.navigate(['/admin/food'])
      })
    },error => {
      console.log(error)
      Swal.fire('Error','Xảy ra lỗi trong quá trình thêm!!','error')
    });






  }



}
