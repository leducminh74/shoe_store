export  class Size {
  private _id:number;
  private _size:number;

  constructor(id: number, size: number) {
    this._id = id;
    this._size = size;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }
}
