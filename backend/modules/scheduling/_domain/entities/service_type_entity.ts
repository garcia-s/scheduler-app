import { Entity } from "../../../../core/interfaces/entity";

export class ServiceTypeEntity extends Entity {
  private _id: string;
  private _name: string;
  private _price: number;
  private _duration: number;

  get id(): string {
    return this._id;
  }
}
