import {Role} from "./role";
import {Status} from "./status";

export class Account {
  private _id: number;
  private _username: string;
  private _password: string;
  private _email:string;
  private _role: Role;
  private _status: Status;


  constructor(id: number, username: string, password: string, email: string, role: Role, status: Status) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._email = email;
    this._role = role;
    this._status = status;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get role(): Role {
    return this._role;
  }

  set role(value: Role) {
    this._role = value;
  }

  get status(): Status {
    return this._status;
  }

  set status(value: Status) {
    this._status = value;
  }
}
