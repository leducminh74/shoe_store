export class Customer_Review {
  private _id: number;
  private _customerName: string;
  private _message: string;
  private _rate: number;
  private _img: string;

  constructor(id: number, customerName: string, message: string, rate: number, img: string) {
    this._id = id;
    this._customerName = customerName;
    this._message = message;
    this._rate = rate;
    this._img = img;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get customerName(): string {
    return this._customerName;
  }

  set customerName(value: string) {
    this._customerName = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get rate(): number {
    return this._rate;
  }

  set rate(value: number) {
    this._rate = value;
  }

  get img(): string {
    return this._img;
  }

  set img(value: string) {
    this._img = value;
  }

}
