import {Color} from "./Color";
import {Size} from "./Size";
import {Category} from "./Category";

export class Product{
  private _id: number;
  private _name:string;
  private _brand:number;
  private _description:string;
  private _listColor:Array<Color>;
  private _listSize:Array<Size>;
  private _img: string;
  private _price:number;
  private _sellPrice:number;
  private _quantity:number;
  private _quantitySold:number;
  private _createAt:Date;
  private _updateAt:Date;
  private _category:Category;

  constructor(id: number, name: string, brand: number, description: string, listColor: Array<Color>, listSize: Array<Size>, img: string, price: number, sellPrice: number, quantity: number, quantitySold: number, createAt: Date, updateAt: Date, category: Category) {
    this._id = id;
    this._name = name;
    this._brand = brand;
    this._description = description;
    this._listColor = listColor;
    this._listSize = listSize;
    this._img = img;
    this._price = price;
    this._sellPrice = sellPrice;
    this._quantity = quantity;
    this._quantitySold = quantitySold;
    this._createAt = createAt;
    this._updateAt = updateAt;
    this._category = category;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get brand(): number {
    return this._brand;
  }

  set brand(value: number) {
    this._brand = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get listColor(): Array<Color> {
    return this._listColor;
  }

  set listColor(value: Array<Color>) {
    this._listColor = value;
  }

  get listSize(): Array<Size> {
    return this._listSize;
  }

  set listSize(value: Array<Size>) {
    this._listSize = value;
  }

  get img(): string {
    return this._img;
  }

  set img(value: string) {
    this._img = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get sellPrice(): number {
    return this._sellPrice;
  }

  set sellPrice(value: number) {
    this._sellPrice = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get quantitySold(): number {
    return this._quantitySold;
  }

  set quantitySold(value: number) {
    this._quantitySold = value;
  }

  get createAt(): Date {
    return this._createAt;
  }

  set createAt(value: Date) {
    this._createAt = value;
  }

  get updateAt(): Date {
    return this._updateAt;
  }

  set updateAt(value: Date) {
    this._updateAt = value;
  }

  get category(): Category {
    return this._category;
  }

  set category(value: Category) {
    this._category = value;
  }
}
