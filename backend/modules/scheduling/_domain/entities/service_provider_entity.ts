import { Entity } from "../../../../core/interfaces/entity";
import { AppointmentEntity } from "./appointment_entity";

export class ServiceProviderEntity extends Entity {
  private _id: string;
  private _name: string;
  private _governmentId: string;
  private _phone: string;
  private _email: string;
  private _schedule: AppointmentEntity[];

  get id(): string {
    return this._id;
  }

  constructor(params: {
    id: string;
    name: string;
    governmentId: string;
    phone: string;
    email: string;
    schedule: AppointmentEntity[];
  }) {
    super();
    this._id = params.id;
    this._name = params.name;
    this._governmentId = params.governmentId;
    this._phone = params.phone;
    this._email = params.email;
    this._schedule = params.schedule;
  }
 
  public static create() {
    
  }
}
