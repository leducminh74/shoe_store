import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product";
import {TagService} from "../../services/tag.service";
import {CartService} from "../../services/cart.service";
import {Tag} from "../../model/tag";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  id: number = 0;
  cid: number = 0;
  addToCardForm!: FormGroup;
  product:any;
  listSameProduct:any;


  constructor(private fb:FormBuilder,private aRoute:ActivatedRoute,private productService:ProductService, private tagService:TagService, private cartService:CartService, private router: Router ) { }

  ngOnInit(): void {

    this.id = this.aRoute.snapshot.params['id'];
    this.cid = this.aRoute.snapshot.params['cid'];
    this.productService.getProductById(this.id).subscribe(data =>{
      this.product = data;
    },error => {
      console.log(error)
      Swal.fire('Error','Xảy ra lỗi khi tải dữ liệu sản phẩm','error')
    })

    this.productService.getSameProduct(this.cid).subscribe((data:any) =>{
      this.listSameProduct = data
      console.log(this.listSameProduct)
    },error => {
      console.log(error)
    })

    this.addToCardForm = this.fb.group({
      productOrder:this.product,
      color:['',Validators.required],
      size:['',Validators.required]
    });

  }


  loadDetailProduct(id:any,cid:any){
    this.productService.getProductById(id).subscribe(data =>{
      this.product = data;
      this.productService.getSameProduct(cid).subscribe((data:any) =>{
        this.listSameProduct = data
        console.log(this.listSameProduct)
      },error => {
        console.log(error)
      })
    },error => {
      console.log(error)
      Swal.fire('Error','Xảy ra lỗi khi tải dữ liệu sản phẩm','error')
    })

  }

  addToCart(){
    console.log(this.product)
    let a = this.cartService.addToCart(this.product);
    if(a){
      Swal.fire({
        icon: 'success',
        title: 'Thêm thành công',
        showConfirmButton: true
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Cửa hàng chỉ còn lại ' + this.product.quantity + ' sản phẩm',
        showConfirmButton: true
      })
    }

  }


    addToCartP(f:Product){
      let a = this.cartService.addToCart(f);
      console.log(a)
      if(a){
        Swal.fire({
          icon: 'success',
          title: 'Thêm thành công',
          showConfirmButton: true
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Cửa hàng chỉ còn lại ' + f.quantity + ' sản phẩm',
          showConfirmButton: true
        })
      }

  }

}
