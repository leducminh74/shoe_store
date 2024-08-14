import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {Cart} from "../../model/cart";
import {OrderService} from "../../services/order.service";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  now:Date = new Date();
  id:any = localStorage.getItem('userId');
  submited: boolean = false;
  cart:Cart = new Cart();
  checkoutForm = this.formBuilder.group({

    name: ['',Validators.required],
    address: ['',Validators.required],
    phone: ['',Validators.required],
    email: ['',Validators.required],
    items: this.cartService.getCart(),
    userId: parseInt(this.id),
    totalPrice: this.cartService.getCart().totalPrice,
    paymentId: 1,
    createdAt: this.now.getUTCDate(),
    status:1

  })
  constructor(private cartService:CartService, private formBuilder: FormBuilder,private orderService: OrderService, private accountService: AccountService, private router: Router) {}


  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  get f (){
    return this.checkoutForm.controls;
  }


  onSubmit():any{
    this.submited = true;
    if(this.checkoutForm.invalid){
      return false;
    }

    this.orderService.createOrder(this.checkoutForm.value).subscribe({
      next:(res) =>{
        alert("Đặt hàng thành công")
        this.router.navigate(['/cart'])
        this.cartService.clearCart();

        // this.ngOnInit();
      },
      error:()=>{
        alert("Đặt hàng thất bại")
      }
    })


  }

}
