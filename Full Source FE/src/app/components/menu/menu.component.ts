import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product";
import {FormControl, FormGroup} from "@angular/forms";
import {TagService} from "../../services/tag.service";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {PageEvent} from "@angular/material/paginator";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  favoriteList = [{
    id:''
  }]
  categoryProduct = false;
  numberOfProduct = 0
  sortBy = 'id';
  sortDir= 'asc';
  listFoods:any = [];
  listCategory: any;
  pageNumber:number = 0;
  pageSize:number = 8;
  searchForm: FormGroup = new FormGroup({
    name: new FormControl()
  })

  keySearch: string = '';


  constructor(private productService:ProductService, private tagService:TagService, private cartService:CartService,private router: Router,private accountService:AccountService) { }

  ngOnInit(): void {

    let id = localStorage.getItem("userId")
    if(id != null){
      this.accountService.getAccountById(id).subscribe((data:any)=>{
        this.favoriteList = data.favorite;
      })
    }


    this.productService.countNumberOfProduct().subscribe((data:any)=>{
      this.numberOfProduct = data
      console.log(this.numberOfProduct)

    })


    this.tagService.getAllTags().subscribe(res =>{
      this.listCategory = res;
    })

    this.onLoadAllProduct()
  }

  onSearch(){
    this.productService.searchProduct(this.searchForm.value.name).subscribe((res:any) =>{
      this.listFoods = res;
      this.keySearch = this.searchForm.value.name;
    })
  }

  onLoadAllProduct(){
    this.productService.getAllProduct(this.pageNumber,this.pageSize,this.sortBy,this.sortDir).subscribe((res:any) =>{
      this.keySearch = ''
      this.listFoods = res;
      this.categoryProduct = false;
    },error => {
      console.log(error)
      Swal.fire('Error','Lỗi khi load dữ liệu từ máy chủ','error')
    })
  }

  onLoadFoodTag(cid: number){
    this.productService.getProductByCategory(cid).subscribe((res:any) =>{
      this.listFoods = res;
      this.categoryProduct = true;
    },error => {
      console.log(error)
      Swal.fire('Error','Lỗi khi load dữ liệu từ máy chủ','error')
    })

  }

  addToCart(f : Product){
    let a = this.cartService.addToCart(f);
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

  nextPage(event:PageEvent){

    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.onLoadAllProduct()
  }

  sort(event:any){
    let id = event.value;
    switch (id) {
      case '1':
        this.sortBy = 'id'
        this.sortDir= 'asc'
        break
      case '2':
        this.sortBy = 'name'
        this.sortDir= 'asc'
        break
      case '3':
        this.sortBy = 'name'
        this.sortDir= 'desc'
        break
      case '4':
        this.sortBy = 'sellPrice'
        this.sortDir= 'asc'
        break
      case '5':
        this.sortBy = 'sellPrice'
        this.sortDir= 'desc'
        break
    }

    console.log(this.sortBy)
    console.log(this.sortDir)
    this.onLoadAllProduct()
  }

  addToFavoriteList(pId:number){
    let id = localStorage.getItem("userId")
    if(id == null){
      let token = localStorage.getItem("token")
      if(token == null){
        Swal.fire('Bạn chưa đăng nhập?','Vui lòng đăng nhập trước khi sử dụng chức năng này!!','info')
        return
      }
    }
    this.accountService.addProductToFavoriteList(id,pId).subscribe((data:any)=>{
      console.log(data)
      this.favoriteList = data.favorite
      Swal.fire('Success','Thêm vào danh sách yêu thích thành công','success')
      console.log(this.favoriteList)
    },error => {
      console.log(error)
      Swal.fire('Error','Xảy ra lỗi trong quá trình thêm!!','error')
    })
  }

  removeProductInFavoriteList(pId:number){
    let id = localStorage.getItem("userId")
    if(id == null){
      let token = localStorage.getItem("token")
      if(token == null){
        Swal.fire('Bạn chưa đăng nhập?','Vui lòng đăng nhập trước khi sử dụng chức năng này!!','info')
        return
      }
    }
    this.accountService.removeProductInFavoriteList(id,pId).subscribe((data:any)=>{
      console.log(data)
      this.favoriteList = data.favorite
      Swal.fire('Success','Xóa khỏi danh sách yêu thích thành công','success')

    },error => {
      console.log(error)
      Swal.fire('Error','Xảy ra lỗi khi xóa !!','error')
    })

  }

  checkProductExist(p:any) {
    for (let e of this.favoriteList) {
      if(e.id == p){
        return true
      }
    }
    return false
  }


  //search without click btn search
  // onKey(event: any){
  //   const input = event.target.value;
  //   this.foodService.getAllProduct().subscribe(res =>{
  //     this.listFoods = res;
  //     this.keySearch = this.searchForm.value.name;
  //   })
  // }


}
