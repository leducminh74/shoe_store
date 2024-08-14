export class Product{
  private _id: number;
  private _name:string;
  private _stars:number;
  private _origin:string;
  private _favorite:boolean;
  private _cookTime:string;
  private _img: string;
  private _des: string;
  private _price:number;
  private _sellPrice:number;
  private _type:number;

  constructor(id: number, name: string, stars: number, origin: string, favorite: boolean, cookTime: string, img: string, des: string, price: number, sellPrice: number, type: number) {
    this._id = id;
    this._name = name;
    this._stars = stars;
    this._origin = origin;
    this._favorite = favorite;
    this._cookTime = cookTime;
    this._img = img;
    this._des = des;
    this._price = price;
    this._sellPrice = sellPrice;
    this._type = type;
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

  get stars(): number {
    return this._stars;
  }

  set stars(value: number) {
    this._stars = value;
  }

  get origin(): string {
    return this._origin;
  }

  set origin(value: string) {
    this._origin = value;
  }

  get favorite(): boolean {
    return this._favorite;
  }

  set favorite(value: boolean) {
    this._favorite = value;
  }

  get cookTime(): string {
    return this._cookTime;
  }

  set cookTime(value: string) {
    this._cookTime = value;
  }

  get img(): string {
    return this._img;
  }

  set img(value: string) {
    this._img = value;
  }

  get des(): string {
    return this._des;
  }

  set des(value: string) {
    this._des = value;
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

  get type(): number {
    return this._type;
  }

  set type(value: number) {
    this._type = value;
  }
}
