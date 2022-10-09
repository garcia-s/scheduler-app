import { Entity } from "../../../../core/interfaces/entity";
import { v4 as uuid } from "uuid";
import { Timeframe } from "../value_objects/timeframe";
import { UnimplementedError } from "../../../../core/errors/general";

export enum AppointmentStatus {
  scheduled = 0,
  rescheduled = 1,
  canceled = 2,
  completed = 3,
}

export class AppointmentEntity extends Entity {
  private _id: string;
  private _timeframe: Timeframe;
  private _serviceProviderId: string;
  private _workspaceId: string;
  private _clientId: string;
  private _status: AppointmentStatus;

  //Pending, Confirmed, In Process, Canceled, Rescheduled

  constructor(params: {
    id: string;
    timeframe: Timeframe;
    serviceProviderId: string;
    workspaceId: string;
    clientId: string;
    status: AppointmentStatus;
  }) {
    super();
    this._id = params.id;
    this._timeframe = params.timeframe;
    this._serviceProviderId = params.serviceProviderId;
    this._workspaceId = params.workspaceId;
    this._clientId = params.clientId;
    this._status = params.status;
  }

  public static create(params: {
    timeframe: Timeframe;
    serviceProviderId: string;
    workspaceId: string;
    clientId: string;
    status: AppointmentStatus;
  }): AppointmentEntity {
    return new AppointmentEntity({ id: uuid(), ...params });
  }

  public cancelAppointment() {
    throw UnimplementedError;
  }

  public markAppointmentForRescheduling() {
    throw UnimplementedError;
  }

  public static reconstitute(params: {
    id: string;
    timeframe: Timeframe;
    serviceProviderId: string;
    workspaceId: string;
    clientId: string;
    status: AppointmentStatus;
  }) {
    return new AppointmentEntity(params);
  }

  get id(): string {
    return this._id;
  }

  reschedule(): void {}
}
