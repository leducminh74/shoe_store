import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Cart} from "../../model/cart";
import {CartItem} from "../../model/cartItem";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart!:Cart
  constructor(private cartService:CartService) {
    this.setCart();
  }

  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    if (confirm("Bạn có chắc muốn xóa sản phẩm")){
      this.cartService.removeFromCart(cartItem.food.id);
      this.setCart();
    }
  }

  changeQuantity(cartItem:CartItem,quantityInString: string){
    let quantity = parseInt(quantityInString);
    if(isNaN(quantity) || quantity < 1){
      quantity = 1
    }

    this.cartService.changeQuantity(cartItem.food.id,quantity);
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
