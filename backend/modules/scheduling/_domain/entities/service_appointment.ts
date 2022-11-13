import { Entity } from "../../../../core/interfaces/entity";
import { Duration } from "../value_objects/duration";

export class ServiceAppointmentEntity extends Entity {

    private _date: Date;
    private _duration: Duration;
    private _clientId: string 
    private constructor(params: {
        id: string;
        duration: Duration
        date: Date;
        clientId: string;
    }) {
        super(params.id);
        this._date = params.date;
        this._duration = params.duration
        this._clientId = params.clientId;
    }

    get id() : string {
        return this._id;
    }

    get date(): Date {
        return this._date
    }

    get duration(): Duration {
        return this._duration
    }

    get clientId():string {
        return this.clientId;
    }
}