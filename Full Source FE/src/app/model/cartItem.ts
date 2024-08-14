import {Product} from "./product";

export class CartItem{
  private _product:Product;
  private _quantity:number = 1;

  constructor(product: Product) {
    this._product = product;
  }

  get product(): Product {
    return this._product;
  }

  set product(value: Product) {
    this._product = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get price():number{
    return this.product.sellPrice * this._quantity
  }
}
