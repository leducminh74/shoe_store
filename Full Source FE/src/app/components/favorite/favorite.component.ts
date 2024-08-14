import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import Swal from "sweetalert2";
import {Product} from "../../model/product";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: [
    './favorite.component.css',
    './../../../assets/css/bootstrap.min.css'
  ]
})
export class FavoriteComponent implements OnInit {

  listFavorite:any;
  id = localStorage.getItem("userId")
  constructor(private accountService:AccountService,private cartService:CartService) { }

  ngOnInit(): void {

    this.accountService.getAccountById(this.id).subscribe((data:any)=>{
      this.listFavorite = data.favorite;
    })
  }

  removeProductInFavoriteList(pId:number){
    Swal.fire({
      icon:'info',
      title:'Bạn có chắc chắn muốn xóa sản phẩm khỏi danh sách yêu thích?',
      showCancelButton:true,
      confirmButtonText:'Chắc chắn',
      cancelButtonText:'Khoan đã',
    }).then((result)=>{
      if(result.isConfirmed){
        this.accountService.removeProductInFavoriteList(this.id,pId).subscribe((data:any)=>{
          console.log(data)
          Swal.fire('Success','Xóa thành công','success')
          this.ngOnInit()
        },error => {
          console.log(error)
          Swal.fire('Error','Xảy ra lỗi khi thực hiện!!','error')
        })

      }
    })
  }

  addToCart(f:Product){
    let a = this.cartService.addToCart(f);
    console.log(a)
    if(a){
      Swal.fire({
        icon: 'success',
        title: 'Thêm vào giỏ hàng thành công',
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
