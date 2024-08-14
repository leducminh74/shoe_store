import {CartItem} from "./cartItem";

export class Order {
   private _id:number;
   private _items : CartItem[];
   private _userId: number;
   private _totalPrice:number;
   private _name : string;
   private _address : string;
   private _phone : string;
   private _email : string;
   private _paymentId: string;
   private _createdAt: string;
   private _status :string;

  constructor(id: number, items: CartItem[], userId: number, totalPrice: number, name: string, address: string, phone: string, email: string, paymentId: string, createdAt: string, status: string) {
    this._id = id;
    this._items = items;
    this._userId = userId;
    this._totalPrice = totalPrice;
    this._name = name;
    this._address = address;
    this._phone = phone;
    this._email = email;
    this._paymentId = paymentId;
    this._createdAt = createdAt;
    this._status = status;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get items(): CartItem[] {
    return this._items;
  }

  set items(value: CartItem[]) {
    this._items = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  set totalPrice(value: number) {
    this._totalPrice = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get paymentId(): string {
    return this._paymentId;
  }

  set paymentId(value: string) {
    this._paymentId = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
