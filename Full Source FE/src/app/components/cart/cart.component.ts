import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Cart} from "../../model/cart";
import {CartItem} from "../../model/cartItem";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart!:Cart
  // cart:Cart = new Cart();
  constructor(private cartService:CartService) {
    this.setCart();
  }

  ngOnInit(): void {

  }

  removeFromCart(cartItem:CartItem){
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      icon:'question',
      showDenyButton: true,
      showConfirmButton:false,
      showCancelButton: true,
      denyButtonText: 'Chắc chắn',
      cancelButtonText: 'Khoan đã'
    }).then((result)=>{
      if(result.isDenied){
        this.cartService.removeFromCart(cartItem.product.id);
        this.setCart();
      }
    })
  }

  changeQuantity(cartItem:CartItem,quantityInString: string){
    let quantity = parseInt(quantityInString);
    if(isNaN(quantity) || quantity < 1){
      quantity = 1
    }
    if(quantity > cartItem.product.quantity){
      Swal.fire({
        icon: 'warning',
        title: 'Sản phẩm này hiện chỉ còn '+cartItem.product.quantity + ' sản phẩm.',
        showConfirmButton: true
      })
      quantity = cartItem.product.quantity
    }

    this.cartService.changeQuantity(cartItem.product.id,quantity);
    this.setCart();
  }

  setCart(){
    this.cart = this.cartService.getCart();
  }

  onKey(event: any){
    const input = event.target.value;
    console.log(input)
  }


}
