import { Entity } from "../../../../core/interfaces/entity";

export class AppointmentEntity extends Entity {
    private _id: string;
    private _appointmentStart: Date;
    private _appointmentEnd: Date;
    private _serviceTypeId: string;
    private _serviceProviderId: string;
    private _workspaceId: string;
  
    constructor(params: {
      id: string;
      appointmentStart: Date;
      appointmentEnd: Date;
      serviceTypeId: string;
      serviceProviderId: string;
      workspaceId: string;
    }) {
      super();
      this._id = params.id;
      this._appointmentStart = params.appointmentStart;
      this._appointmentEnd = params.appointmentEnd;
      this._serviceTypeId = params.serviceTypeId;
      this._serviceProviderId = params.serviceProviderId;
      this._workspaceId = params.workspaceId;
    }
  
    public static create(params: {
      appointmentStart: Date;
      appointmentEnd: Date;
      serviceTypeId: string;
      serviceProviderId: string;
      workspaceId: string;
    }) {}

    public static reconstitute() {}
    get id(): string {
      return this._id;
    }
  }
  