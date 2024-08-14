import {Product} from "./product";

export class OrderDetail{
  private _id:number;
  private _orderId:number;
  private _product:Product;
  private _price:number;
  private _quantity:number;
  private _createAt:Date;

  constructor(id: number, orderId: number, product: Product, price: number, quantity: number, createAt: Date) {
    this._id = id;
    this._orderId = orderId;
    this._product = product;
    this._price = price;
    this._quantity = quantity;
    this._createAt = createAt;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get orderId(): number {
    return this._orderId;
  }

  set orderId(value: number) {
    this._orderId = value;
  }

  get product(): Product {
    return this._product;
  }

  set product(value: Product) {
    this._product = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get createAt(): Date {
    return this._createAt;
  }

  set createAt(value: Date) {
    this._createAt = value;
  }
}
