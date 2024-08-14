import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product";
import {TagService} from "../../services/tag.service";
import {CartService} from "../../services/cart.service";
import {Tag} from "../../model/tag";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  id: number = 0;
  food: Product = new Product(0,'',0,'',false,'','','',0,0,0);

  constructor(private aRoute:ActivatedRoute,private productService:ProductService, private tagService:TagService, private cartService:CartService, private router: Router ) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data =>{
      this.food = data;
    })

  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart')
  }

}
