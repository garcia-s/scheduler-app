import { Entity } from "../../../../core/interfaces/entity";
import { AppointmentEntity } from "./appointment_entity";
import { v4 as uuid } from "uuid";
import { UnimplementedError } from "../../../../core/errors/general";
export class WorkspaceEntity extends Entity {
  private _id: string;
  private _name: string;
  private _code: string;
  private _schedule: AppointmentEntity[];

  get id(): string {
    return this._id;
  }

  private constructor(params: {
    id: string;
    name: string;
    code: string;
    schedule: AppointmentEntity[];
  }) {
    super();
    this._id = params.id;
    this._code = params.code;
    this._name = params.name;
    this._schedule = params.schedule;
  }

  public static create(params: {
    name: string;
    code: string;
  }): WorkspaceEntity {
    return new WorkspaceEntity({
      id: uuid(),
      ...params,
      schedule: [],
    });
  }


  isAvailable(startDate:Date, endDate:Date):boolean {
      throw new UnimplementedError()
  }
}
