import { Entity } from "../../../../core/interfaces/entity";

export class ServiceProviderEntity extends Entity {
  private _id: string;
  private _name: string;
  private _governmentId: string;
  private _phone: string;
  private _email: string;

  get id(): string {
    return this._id;
  }
}
