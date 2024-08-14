export class Status {
  private _id:number;
  private _statusName:string;

  constructor(id: number, statusName: string) {
    this._id = id;
    this._statusName = statusName;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get statusName(): string {
    return this._statusName;
  }

  set statusName(value: string) {
    this._statusName = value;
  }
}
