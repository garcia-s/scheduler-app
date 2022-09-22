import { Entity } from "../../../../core/interfaces/entity";
import { AppointmentEntity } from "./appointment_entity";

export class WorkspaceEntity extends Entity {
    private _id: string;
    private _name: string;
    private _code: string;
    private _schedule: AppointmentEntity[]
    
    get id(): string {
        return this._id;
    }
}