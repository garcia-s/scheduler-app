import { Entity } from "../../../../core/interfaces/entity";
import { ServiceProviderEntity } from "./service_provider_entity";
import { ServiceTypeEntity } from "./service_type_entity";
import { WorkspaceEntity } from "./workspace_entity";




export class AppointmentEntity extends Entity {
    private _id: string;

    get id(): string {
        return this._id;
    }

//Necesito la agenda del workspace y del 
}