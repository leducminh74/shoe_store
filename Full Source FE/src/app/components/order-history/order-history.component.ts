import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../model/order";
import Swal from "sweetalert2";
import {iif, Observable, tap} from "rxjs";
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls:
    [
      './order-history.component.css',
      './../../../assets/css/bootstrap.min.css'
    ]
})
export class OrderHistoryComponent implements OnInit {
  order:any = null;
  listOrder:Array<any> = new Array<any>();
  constructor(private orderService:OrderService,@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.getAllOrderByAccount()

  }

  getAllOrderByAccount(){
    let acc_id = localStorage.getItem("userId")
    console.log(acc_id)
    this.orderService.getOrderByAccount(acc_id).subscribe((res:any)=>{
      this.listOrder=res;
      console.log(this.listOrder)
    },error => {
      console.log(error)
    })
  }

  getAllOrderDetailByOrder(id:number){
    for (var orderElement of this.listOrder) {
      if(orderElement.id == id){
        this.order = orderElement;
      }
    }

    this.orderService.getOrderDetailByOrder(id).subscribe((res:any) =>{
      var htmlbody='';
      var count = 0;
      var htmlHead = '<table style="width: 100%;display: table;" id="table" border=1>\n' +
        '        <thead>\n' +
        '            <tr>\n' +
        '                <th class="text-center">#</th>\n' +
        '                <th class="text-center">Tên sản phẩm</th>\n' +
        '                <th class="text-center">Giá</th>\n' +
        '                <th class="text-center">Số lượng</th>\n' +
        '            </tr>\n' +
        '        </thead>\n' +
        '        <tbody>\n'

      for (const orderDetail of res) {
        count++;
        htmlbody+=
        '            <tr >\n' +
        '                <td class="text-center" style="text-align: center">'+count +'</td>\n' +
        '                <td class="text-center" style="text-align: center;color: #3b3b3b">'+orderDetail.product.name+'</td>\n' +
        '                <td class="text-center">'+formatCurrency(orderDetail.price,this.locale,'đ','VND')+'</td>\n' +
        '                <td class="text-center">'+orderDetail.quantity+'</td>\n' +
        '            </tr>\n'
      }


      var htmlEnd=
        '</tbody>\n' +
        '</table>'

      Swal.fire({
        title: '<strong>Chi tiết đơn hàng(Mã:'+id+')</strong>',
        html:htmlHead+htmlbody+htmlEnd,
        width:'80em',
        showDenyButton: this.order.status.id == 1?true:false,
        showConfirmButton:false,
        showCloseButton: true,
        showCancelButton: true,
        denyButtonText: 'Hủy đơn hàng',
        cancelButtonText: 'Đóng'

      }).then((result) =>{
        if(result.isDenied){
          Swal.fire({
            title: '<strong>Bạn có chắc chắc muốn hủy đơn hàng?</strong>',
            showConfirmButton:true,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:'Chắc chắn',
            cancelButtonText: 'Suy nghĩ lại'
          }).then((value) =>{
            if(value.isConfirmed){
              this.orderService.cancelOrder(id).subscribe(res =>{
                Swal.fire('Hủy đơn hàng thành công!!', '', 'success').then(a=>{
                  this.ngOnInit()
                })
              },error => {
                Swal.fire('Hủy đơn hàng thất bại!!', '', 'error')
              })
            }
          })


        }
      })
    },error => {
      console.log(error)
    })
  }

}
