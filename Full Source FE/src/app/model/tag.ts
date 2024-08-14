export class Tag{
  private _id:number;
  private _tagId: number;
  private _tagName:string;

  constructor(id: number, tagId: number, tagName: string) {
    this._id = id;
    this._tagId = tagId;
    this._tagName = tagName;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get tagId(): number {
    return this._tagId;
  }

  set tagId(value: number) {
    this._tagId = value;
  }

  get tagName(): string {
    return this._tagName;
  }

  set tagName(value: string) {
    this._tagName = value;
  }


}
