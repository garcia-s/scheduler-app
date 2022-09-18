import { Entity } from "../../../../core/interfaces/entity";

export class ClientEntity extends Entity {
  private _id: string;
  private _name: string;
  private _phone: string;
  private _governmentId: string;

  get id(): string {
    return this._id;
  }

  constructor(params: {
    id: string;
    name: string;
    phone: string;
    governmentId: string;
  }) {
    super();
    this._id = params.id;
    this._name = params.name;
    this._phone = params.phone;
    this._governmentId = params.governmentId;
  }
}
