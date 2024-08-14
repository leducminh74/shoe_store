import {Account} from "./account";

export class Profile{
  private _id :number;
  private _account:Account;
  private _name:String;
  private _address:String;
  private _phoneNumber:String;

  constructor(id: number, account: Account, name: String, address: String, phoneNumber: String) {
    this._id = id;
    this._account = account;
    this._name = name;
    this._address = address;
    this._phoneNumber = phoneNumber;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get account(): Account {
    return this._account;
  }

  set account(value: Account) {
    this._account = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get address(): String {
    return this._address;
  }

  set address(value: String) {
    this._address = value;
  }

  get phoneNumber(): String {
    return this._phoneNumber;
  }

  set phoneNumber(value: String) {
    this._phoneNumber = value;
  }
}
