export class Account {
  private _id: number;
  private _email: string;
  private _password: string;
  private _role: number;

  constructor(id: number, email: string, password: string, role: number) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._role = role;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get role(): number {
    return this._role;
  }

  set role(value: number) {
    this._role = value;
  }
}
