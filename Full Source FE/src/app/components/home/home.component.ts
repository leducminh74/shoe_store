import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {Customer_Review} from "../../model/customer_Review";
import {CustomerReviewService} from "../../services/customer-review.service";
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AccountService} from "../../services/account.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  favoriteList = [{
    id:''
  }]
  topProduct: any;
  popularProduct:any;
  customerReviews: any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: false,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    autoplay: true,
    autoplayTimeout:5000,
    autoplayHoverPause:false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
    nav: true
  }


  constructor(private cr: CustomerReviewService, private productService:ProductService, private cartService: CartService, private router:Router,private accountService:AccountService) { }

  ngOnInit(): void {
    let id = localStorage.getItem("userId")
    this.accountService.getAccountById(id).subscribe((data:any)=>{
      this.favoriteList = data.favorite;

    })

    this.cr.getReview().subscribe(res =>{
      this.customerReviews = res;
    })

    this.productService.getTopNumProductDateDESC().subscribe(res =>{
      this.topProduct = res
      console.log(this.topProduct)
    })

    this.productService.getTopNumProductQuantitySoldAsc().subscribe(res =>{
      this.popularProduct = res
      console.log(this.topProduct)
    })
  }

  addToCart(f:Product){
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
      this.favoriteList = data.favorite
      Swal.fire('Success','Thêm vào danh sách yêu thích thành công','success')
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

}
