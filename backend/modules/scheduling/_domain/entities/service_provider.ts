
import { Entity } from "../../../../core/interfaces/entity";
import { UUIDEntityID } from "../../../../core/value_objects/uuid_entity_id";
import { EmailAddress } from "../value_objects/email_address";
import { PersonalName } from "../value_objects/personal_name";
import { PhoneNumber } from "../value_objects/phone_number";
import { ServiceAppointmentEntity } from "./service_appointment";

export type ServiceQueuePositionMap ={
    [key: string]: number
}

class ServiceProvider extends Entity{
    private _id: UUIDEntityID;
    private _name: PersonalName;
    private _phone: PhoneNumber;
    private _email: EmailAddress;
    private _appointments: ServiceAppointmentEntity
    private _serviceQueuePositionMap: ServiceQueuePositionMap;

    private constructor(params: {
        id:UUIDEntityID;
        email: EmailAddress;
        appointments: ServiceAppointmentEntity,
        
    }) {
        super(params.id);
    }
}