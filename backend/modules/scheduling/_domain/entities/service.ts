import { Entity } from "../../../../core/interfaces/entity";
import ServiceCode from "../value_objects/service_code";
import { ServiceDescription } from "../value_objects/service_description";
import { ServiceName } from "../value_objects/service_name";

export class ServiceEntity extends Entity {
    private _name: ServiceName;
    private _description: ServiceDescription;
    private _code: ServiceCode;

    private constructor(params:{
        id: string;
        name: ServiceName;
        description:ServiceDescription;
        code: ServiceCode;
    }) {
        super(params.id);
        this._name = params.name
        this._description = params.description
        this._code = params.code;
    }

    get id(): string {
        return this._id;
    }
}