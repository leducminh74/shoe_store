import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../services/product.service";
import {TagService} from "../../services/tag.service";
import {Tag} from "../../model/tag";

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
  tag:Tag = new Tag(0,0,'');
  listFood:Array<Product> = new Array<Product>();
  keySearch: string = "";
  constructor(private productService: ProductService, private tagService: TagService) { }

  ngOnInit(): void {
    this.productService.getAllProduct(this.keySearch).subscribe(data =>{
      this.listFood = data;
    })
  }

  removeProduct(id: any): void{
    if(confirm("Bạn có chắc chắn muốn xóa món ăn này")){
      this.productService.removeProduct(id).subscribe({
        next:(res) =>{
          alert("Xóa thành công")
          this.ngOnInit();
        },
        error:()=>{
          alert("Xóa thất bại")
        }
      })

    }
  }

}
