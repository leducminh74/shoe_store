import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {OrderService} from "../../services/order.service";
import {ManagementService} from "../../services/management.service";
import {AccountService} from "../../services/account.service";
import {ngxCsv} from "ngx-csv";
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: [
    './revenue.component.css',
    './../assets/css/style.css',
    './../assets/css/sb-admin-2.min.css',
    './../assets/vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class RevenueComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  totalAccount = 0;
  totalOrder = 0;
  yearSelected = 2023;
  totalRevenue = 0;
  barChartData !: ChartData<'bar'>
  pieChartData !: ChartData<'pie', number[], string | string[]>
  pieChart2Data !: ChartData<'pie', number[], string | string[]>



  constructor(private managementService:ManagementService,private accountService:AccountService,private orderService:OrderService) { }

  ngOnInit(): void {

    this.accountService.getAllAccount().subscribe((data:any)=>{
      this.totalAccount = data.length;
    })

    this.orderService.getAllOrder().subscribe((data:any)=>{
      this.totalOrder = data.length;
    })

    this.loadTotalRevenue()

    this.onloadRevenue();

    this.managementService.accountStatistics().subscribe((data:any)=>{
      this.pieChartData = {
        labels:['Tài khoản chưa kích hoạt ','Tài khoản hoạt động','Tài khoản bị vô hiệu hóa'],
        datasets:[{
          data:Object.values(data),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56' , 'grey'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56' , 'grey']
        }]
      }
    })

    this.managementService.orderStatistics().subscribe((data:any)=>{
      this.pieChart2Data = {
        labels:['Đang chờ xác nhận','Đã đóng gói','Đang giao hàng','Đã giao hàng','Đã hủy'],
        datasets:[{
          data:Object.values(data),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56' ,'#E34FD2','#FF0000', 'grey'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56' ,'#E34FD2','#FF0000', 'grey']
        }]
      }
    })
  }

  loadTotalRevenue(){
    this.managementService.totalRevenueOfYear(this.yearSelected).subscribe((data:any)=>{
      this.totalRevenue = data
    })
  }

  public onloadRevenue(){
    this.managementService.totalRevenue(this.yearSelected).subscribe((data:any) =>{
      this.barChartData = {
        labels:['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
        datasets:[
          {
            label:'Doanh thu',
            data:Object.values(data)
          }
        ]
      }

    })

  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
      },
      y: {
        min: 0,
      }
    },
    plugins: {
      title:{
        display:true,
        text:'Biểu đồ doanh thu'
      },
      legend: {
        display: true,

      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
  ];

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

//

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
      title:{
        display:true,
        text:'Biểu đồ thống kê tài khoản'
      },
      legend: {
        display: true,
        position: 'top',
      },
    }
  };

  public pieChart2Options: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
      title:{
        display:true,
        text:'Biểu đồ thống kê đơn hàng'
      },
      legend: {
        display: true,
        position: 'top',
      },
    }
  };

  public pieChartType: ChartType = 'pie';

  public pieChartPlugins = [
  ];


  loadRevenue(event:any){
    this.yearSelected = event.value
    this.onloadRevenue()
    this.loadTotalRevenue()

  }

  download(){
    var data =
      [
        {
          month:Object.values(this.barChartData.datasets[0]),
          year:this.yearSelected,
          total:this.totalRevenue,
        }

      ]
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Chi tiết doanh thu năm '+this.yearSelected,
      useBom: true,
      noDownload: false,
      headers: ["","Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12","Năm","Tổng cộng"]
    };

    new ngxCsv(data, "danh thu "+this.yearSelected, options);
  }




}
