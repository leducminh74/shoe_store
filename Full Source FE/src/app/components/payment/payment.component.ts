import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  vnp_ResponseCode:any
  vnp_TransactionStatus:any
  orderId:any;

  constructor(private route:ActivatedRoute,private router:Router,private orderService:OrderService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params)=>{
      this.vnp_ResponseCode = params['vnp_ResponseCode']
      this.vnp_TransactionStatus = params['vnp_TransactionStatus']
      this.orderId = params['orderId']
    })

    if(this.vnp_ResponseCode == '00' && this.vnp_TransactionStatus == '00'){
      Swal.fire('Success','Thanh toán thành công. Bạn sẽ được đưa về trang chủ','success').then(result =>{
        this.router.navigate(['/home'])
      })
    }else{
      console.log(this.orderId)
      let id = parseInt(this.orderId)
      this.orderService.cancelOrder(id).subscribe((data)=>{
        console.log(data)
      },error => {
        console.log(error)
      })
      Swal.fire('Error','Thanh toán thất bại. Đơn hàng sẽ bị hủy!!','error').then(result=>{
        this.router.navigate(['/cart'])
      })

    }

  }


}
