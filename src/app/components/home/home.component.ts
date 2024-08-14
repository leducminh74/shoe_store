import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {Customer_Review} from "../../model/customer_Review";
import {CustomerReviewService} from "../../services/customer-review.service";
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  topProduct: Array<Product> = new Array<Product>();
  customerReviews: Array<Customer_Review> = new Array<Customer_Review>();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: false,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    autoplay: true,
    autoplayTimeout:5000,
    autoplayHoverPause:false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
    nav: true
  }


  constructor(private cr: CustomerReviewService, private productService:ProductService, private cartService: CartService, private router:Router) { }

  ngOnInit(): void {
    this.cr.getReview().subscribe(res =>{
      this.customerReviews = res;
    })

    this.productService.getTopNumProductIDDESC(10).subscribe(res =>{
      this.topProduct = res
    })
  }

  addToCart(f:Product){
    this.cartService.addToCart(f);
    this.router.navigateByUrl('/cart')
  }

}
