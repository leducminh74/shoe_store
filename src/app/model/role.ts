export class Role {
  private _id:number;
  private _roleName:string;

  constructor(id: number, roleName: string) {
    this._id = id;
    this._roleName = roleName;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get roleName(): string {
    return this._roleName;
  }

  set roleName(value: string) {
    this._roleName = value;
  }
}
