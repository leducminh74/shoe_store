import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../services/product.service";
import {TagService} from "../../services/tag.service";
import {Tag} from "../../model/tag";
import Swal from "sweetalert2";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [
    './product.component.css',
    './../assets/css/style.css',
    './../assets/css/sb-admin-2.min.css',
    './../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class ProductComponent implements OnInit {
  pageNumber:number = 0;
  pageSize:number = 8;
  numberOfProduct = 0
  tag:Tag = new Tag(0,0,'');
  listFood:any;
  constructor(private productService: ProductService, private tagService: TagService) { }

  ngOnInit(): void {
    this.productService.countNumberOfProduct().subscribe((data:any)=>{
      this.numberOfProduct = data
      console.log(this.numberOfProduct)

    })

    this.loadProducts()
  }

  loadProducts(){
    this.productService.getAllProduct(this.pageNumber,this.pageSize,'id','asc').subscribe(data =>{
      this.listFood = data;
    })
  }

  removeProduct(id: any): void{
    Swal.fire({
      title:'Bạn có chắc chắn muốn xóa sản phẩm này?',
      icon:'info',
      showCancelButton:true,
      cancelButtonText:'Khoan đã',
      confirmButtonText:'Chắc chắn',
    }).then((result)=>{
      if(result.isConfirmed){
        this.productService.removeProduct(id).subscribe({
          next:(res) =>{
            Swal.fire('Success','Xóa thành công','success')
            this.ngOnInit();
          },
          error:()=>{
            Swal.fire('Error','Xảy ra lỗi trong quá trình xóa!!','error')
          }
        })
      }
    })
  }

  nextPage(event:PageEvent){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.loadProducts()
  }

}
