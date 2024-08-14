import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import Swal from "sweetalert2";
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: [
    './order-admin.component.css',
    './../assets/css/style.css',
    './../assets/css/sb-admin-2.min.css',
    './../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class OrderAdminComponent implements OnInit {

  listOrder:any

  constructor(private orderService:OrderService,@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
  this.loadOrders()
  }

  public loadOrders(){
    this.orderService.getAllOrder().subscribe((data:any) =>{
      this.listOrder = data
    })
  }

  showDetailsOrder(id:number){

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
        showConfirmButton:false,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Đóng'

      })
    },error => {
      console.log(error)
    })
  }

  acceptOrder(id:number){
    Swal.fire({
      icon:'info',
      title:'Bạn có chắc chắn muốn xác nhận đơn hàng này?',
      showCancelButton:true,
      cancelButtonText:'Khoan đã',
      confirmButtonText:'Chắc chắn'
    }).then((result)=>{
      if(result.isConfirmed){
        this.orderService.acceptOrder(id).subscribe((data:any)=>{
          Swal.fire('Success','Xác nhận thành công' ,'success')
          this.ngOnInit()
        },error => {
          console.log(error)
          Swal.fire('Error','Xảy ra lỗi trong quá trình thực hiện!!','error' )
        })
      }
    })
  }

  shippingOrder(id:number){
    Swal.fire({
      icon:'info',
      title:'Bạn có chắc chắn muốn bắt đầu vận chuyển đơn hàng này?',
      showCancelButton:true,
      cancelButtonText:'Khoan đã',
      confirmButtonText:'Chắc chắn'
    }).then((result)=>{
      if(result.isConfirmed){
        this.orderService.shippingtOrder(id).subscribe((data:any)=>{
          Swal.fire('Success','Xác nhận thành công' ,'success')
          this.ngOnInit()
        },error => {
          console.log(error)
          Swal.fire('Error','Xảy ra lỗi trong quá trình thực hiện!!','error' )
        })
      }
    })
  }


  deliveredOrder(id:number){
    Swal.fire({
      icon:'info',
      title:'Bạn có chắc chắn muốn hoàn thành đơn hàng này?',
      showCancelButton:true,
      cancelButtonText:'Khoan đã',
      confirmButtonText:'Chắc chắn'
    }).then((result)=>{
      if(result.isConfirmed){
        this.orderService.deliveredOrder(id).subscribe((data:any)=>{
          Swal.fire('Success','Xác nhận thành công' ,'success')
          this.ngOnInit()
        },error => {
          console.log(error)
          Swal.fire('Error','Xảy ra lỗi trong quá trình thực hiện!!','error' )
        })
      }
    })
  }

  cancelOrder(id:number){
    Swal.fire({
      icon:'info',
      title:'Bạn có chắc chắn muốn hủy đơn hàng này?',
      showCancelButton:true,
      cancelButtonText:'Khoan đã',
      confirmButtonText:'Chắc chắn'
    }).then((result)=>{
      if(result.isConfirmed){
        this.orderService.cancelOrder(id).subscribe((data:any)=>{
          Swal.fire('Success','Xác nhận thành công' ,'success')
          this.ngOnInit()
        },error => {
          console.log(error)
          Swal.fire('Error','Xảy ra lỗi trong quá trình thực hiện!!','error' )
        })
      }
    })
  }


}
