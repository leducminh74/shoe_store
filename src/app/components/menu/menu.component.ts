import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product";
import {FormControl, FormGroup} from "@angular/forms";
import {TagService} from "../../services/tag.service";
import {Tag} from "../../model/tag";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  listFoods: Array<Product> = new Array<Product>();
  listTag: Array<Tag> = new Array<Tag>();
  searchForm: FormGroup = new FormGroup({
    name: new FormControl()
  })

  keySearch: string = "";


  constructor(private foodService:ProductService, private tagService:TagService, private cartService:CartService,private router: Router) { }

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe(res =>{
      this.listTag = res;
    })

    this.foodService.getAllProduct(this.keySearch).subscribe(res =>{
      this.listFoods = res;
    })
  }

  onSearch(){
    this.foodService.getAllProduct(this.searchForm.value.name).subscribe(res =>{
      this.listFoods = res;
      this.keySearch = this.searchForm.value.name;
    })
  }

  onLoadFoodTag(id: number){
    this.foodService.getProductByTag(id).subscribe(res =>{
      this.listFoods = res;
    })

  }

  addToCart(f : Product){
    this.cartService.addToCart(f);
    this.router.navigateByUrl('/cart')
  }

  //search without click btn search
  onKey(event: any){
    const input = event.target.value;
    this.foodService.getAllProduct(input).subscribe(res =>{
      this.listFoods = res;
      this.keySearch = this.searchForm.value.name;
    })
  }


}
