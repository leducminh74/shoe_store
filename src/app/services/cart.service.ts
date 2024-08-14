import { Injectable } from '@angular/core';
import {Cart} from "../model/cart";
import {Product} from "../model/product";
import {CartItem} from "../model/cartItem";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = new Cart();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  addToCart(food:Product): void{
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if (cartItem){
      this.changeQuantity(food.id,cartItem.quantity+1);
      return;
    }
    this.cart.items.push(new CartItem(food));
  }

  removeFromCart(foodId: number): void{
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
  }

  changeQuantity(foodId: number, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
  }

  clearCart(){
    this.cart = new Cart();
  }

  getCart(): Cart{
    return this.cart;
  }

  getTotal(): number{
    return this.cart.totalPrice;
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }


}
