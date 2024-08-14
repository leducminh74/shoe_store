import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {Cart} from "../../model/cart";
import {OrderService} from "../../services/order.service";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common'
import {OrderDetail} from "../../model/orderDetail";
import Swal from "sweetalert2";
import {PaymentService} from "../../services/payment.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  now:Date = new Date();
  submited: boolean = false;
  cart:Cart = new Cart();
  public checkoutForm!: FormGroup;
  payments:any
  orderId:any

  constructor(private cartService:CartService, private formBuilder: FormBuilder,private orderService: OrderService, private accountService: AccountService, private router: Router,private datepipe: DatePipe,private paymentService:PaymentService) {}


  ngOnInit(): void {
    let id = localStorage.getItem("userId");
    this.accountService.viewProfile(id).subscribe((res:any) =>{
      this.checkoutForm = this.formBuilder.group({
        fullName: [res.name,Validators.required],
        address: [res.address,Validators.required],
        phoneNumber: [res.phoneNumber,Validators.required],
        userId: localStorage.getItem('userId'),
        total: this.cartService.getCart().totalPrice,
        paymentId: ['',Validators.required]

      })

    },error => {
      console.log(error)
    })
    this.cart = this.cartService.getCart();
    if(this.cart.items.length == 0){
        this.router.navigate(['cart']);
    }


    this.paymentService.getAllPayment().subscribe((data:any)=>{
      this.payments = data
      console.log(this.payments)
    },error => {
      console.log(error)
      Swal.fire('Error','Xảy ra lỗi khi load dữ liệu thanh toán!!','error')
    })


  }

  get f (){
    return this.checkoutForm.controls;
  }


  onSubmit():any{
    this.submited = true;
    if(this.checkoutForm.invalid){
      return false;
    }
    console.log(this.checkoutForm)
    if(this.checkoutForm.value.paymentId == 1){
      this.orderService.createOrder(this.checkoutForm.value).subscribe({
        next:(res) =>{
          this.cart.items.forEach(product => {
            let orderDetail = new OrderDetail(0, res, product.product, product.price, product.quantity, new Date());
            this.orderService.createOrderDetails(orderDetail).subscribe(res =>{
              Swal.fire({
                icon: 'success',
                title: 'Đặt hàng thành công!!',
                showConfirmButton: true
              }).then(result =>{
                this.cartService.clearCart();
                this.router.navigate(['/cart'])
              })
            },error => {
              Swal.fire({
                icon: 'error',
                title: 'Đặt hàng thất bại!!',
                showConfirmButton: true
              }).then(result =>{
                this.router.navigate(['/cart'])
              })
            })
          })

        },
        error:()=>{
          Swal.fire({
            icon: 'error',
            title: 'Đặt hàng thất bại!!',
            showConfirmButton: true
          }).then(result =>{
            this.router.navigate(['/cart'])
          })
        }
      })
    }else if (this.checkoutForm.value.paymentId == 2){
      this.orderService.createOrder(this.checkoutForm.value).subscribe({
        next:(res) =>{
          this.orderId = res;
          this.cart.items.forEach(product => {
            let orderDetail = new OrderDetail(0, res, product.product, product.price, product.quantity, new Date());
            this.orderService.createOrderDetails(orderDetail).subscribe(res =>{
              console.log(this.orderId)
              console.log(this.cart.totalPrice)
              this.paymentService.createPaymentVNPAY(this.cart.totalPrice,this.orderId).subscribe((data:any)=>{
                console.log(data)
                window.open(data.url,"_self")
              },error => {
                console.log(error)
              })

            },error => {
              Swal.fire({
                icon: 'error',
                title: 'Đặt hàng thất bại!!',
                showConfirmButton: true
              }).then(result =>{
                this.router.navigate(['/cart'])
              })
            })
          })
        },
        error:()=>{
          Swal.fire({
            icon: 'error',
            title: 'Đặt hàng thất bại!!',
            showConfirmButton: true
          }).then(result =>{
            this.router.navigate(['/cart'])
          })
        }
      })

    }




  }

}
