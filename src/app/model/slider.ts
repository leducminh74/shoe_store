export class Slider {
  private _id: number;
  private _name:string;
  private _img: string;
  private _des: string;
  private _title:string;

  constructor(id: number, name: string, img: string, des: string, title: string) {
    this._id = id;
    this._name = name;
    this._img = img;
    this._des = des;
    this._title = title;
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

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }


}
