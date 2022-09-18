import { Entity } from "../../../../core/interfaces/entity";
import { ServiceTypeEntity } from "./service_type_entity";

export class ServiceEntity extends Entity {
  private _id: string;
  private _name: string;
  private _types: ServiceTypeEntity[];

  get id(): string {
    return this._id;
  }
}
