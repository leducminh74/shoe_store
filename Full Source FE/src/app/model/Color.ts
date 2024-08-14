export class Color {
  private _id:number;
  private _color:String;

  constructor(id: number, color: String) {
    this._id = id;
    this._color = color;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get color(): String {
    return this._color;
  }

  set color(value: String) {
    this._color = value;
  }
}
