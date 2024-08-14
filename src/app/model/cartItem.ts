import {Product} from "./product";

export class CartItem{
  private _food:Product;
  private _quantity:number = 1;

  constructor(food: Product) {
    this._food = food;
  }

  get food(): Product {
    return this._food;
  }

  set food(value: Product) {
    this._food = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get price():number{
    return this.food.sellPrice * this.quantity
  }
}
