import { Entity } from "../../../../core/interfaces/entity";
import { v4 as uuid } from "uuid";

export class AppointmentEntity extends Entity {
  private _id: string;
  private _appointmentStart: Date;
  private _appointmentEnd: Date;
  private _serviceId: string;
  private _serviceProviderId: string;
  private _workspaceId: string;
  private _clientId?: string;

  constructor(params: {
    id: string;
    appointmentStart: Date;
    appointmentEnd: Date;
    serviceId: string;
    serviceProviderId: string;
    workspaceId: string;
    clientId: string;
  }) {
    super();
    this._id = params.id;
    this._appointmentStart = params.appointmentStart;
    this._appointmentEnd = params.appointmentEnd;
    this._serviceId = params.serviceId;
    this._serviceProviderId = params.serviceProviderId;
    this._workspaceId = params.workspaceId;
    this._clientId = params.clientId;
  }

  public static create(params: {
    appointmentStart: Date;
    appointmentEnd: Date;
    serviceId: string;
    serviceProviderId: string;
    workspaceId: string;
    clientId: string;
  }): AppointmentEntity {
    return new AppointmentEntity({ id: uuid(), ...params });
  }

  public static reconstitute(params: {
    id: string;
    appointmentStart: Date;
    appointmentEnd: Date;
    serviceId: string;
    serviceProviderId: string;
    workspaceId: string;
    clientId: string;
  }) {
    return new AppointmentEntity(params);
  }

  get id(): string {
    return this._id;
  }

  reschedule(): void {}
}
