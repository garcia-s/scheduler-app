import Aggregate from "../../../../core/interfaces/aggregate"
import { UUIDEntityID } from "../../../../core/value_objects/uuid_entity_id";
import { ServiceDescription } from "../value_objects/service_description";
import { ServiceName } from "../value_objects/service_name";

export default class ServiceAggregate extends Aggregate {
    private _id: UUIDEntityID;
    private _name: ServiceName;
    private _description: ServiceDescription;
    private _workspaces: ServiceWorkSpace[]
    private _providers: ServiceProvider[]

    constructor(params:{id: UUIDEntityID}) {
        super(params.id);
    }
}