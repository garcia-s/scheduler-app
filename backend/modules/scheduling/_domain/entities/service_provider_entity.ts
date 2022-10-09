import { Entity } from "../../../../core/interfaces/entity";
import { EmailAddress } from "../value_objects/email_address";
import { FullName } from "../value_objects/full_name";
import { GovernmentID } from "../value_objects/government_id";
import { PhoneNumber } from "../value_objects/phone_number";
import { AppointmentEntity } from "./appointment_entity";
import { v4 as uuid } from "uuid";
import { UnimplementedError } from "../../../../core/errors/general";
import { Timeframe } from "../value_objects/timeframe";

export class ServiceProviderEntity extends Entity {
  private _id: string;
  private _name: FullName;
  private _governmentId: GovernmentID;
  private _phone: PhoneNumber;
  private _email: EmailAddress;
  private _schedule: AppointmentEntity[];

  get id(): string {
    return this._id;
  }

  constructor(params: {
    id: string;
    name: FullName;
    governmentId: GovernmentID;
    phone: PhoneNumber;
    email: EmailAddress;
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

  public static create(params: {
    name: FullName;
    governmentId: GovernmentID;
    phone: PhoneNumber;
    email: EmailAddress;
  }): ServiceProviderEntity {
    return new ServiceProviderEntity({ ...params, id: uuid(), schedule: [] });
  }

  public static reconstitute(params: {
    id: string;
    name: FullName;
    governmentId: GovernmentID;
    phone: PhoneNumber;
    email: EmailAddress;
    schedule: AppointmentEntity[];
  }): ServiceProviderEntity {
    return new ServiceProviderEntity(params);
  }

  isAvailable(timeFrame: Timeframe): boolean {
    throw new UnimplementedError();
  }

  public addAppointment(appointment: AppointmentEntity) {
    this._schedule.push(appointment);
  }
}
