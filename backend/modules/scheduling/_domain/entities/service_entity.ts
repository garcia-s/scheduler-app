import { Entity } from "../../../../core/interfaces/entity";

export type ServiceEntityParams = {
  name: string;
  price: number;
  duration: number;
};

export class ServiceEntity extends Entity {
  private _id: string;
  private _name: string;
  private _price: number;
  private _duration: number;

  get id(): string {
    return this._id;
  }

  private constructor(params: {
    id: string;
    name: string; 
    price: number;
    duration: number;
  }) {
    super();
    this._id = params.id; 
    this._name = params.name;
    this._price = params.price;
  }
}
