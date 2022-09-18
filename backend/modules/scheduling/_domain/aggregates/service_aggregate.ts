import Aggregate from "../../../../core/interfaces/aggregate"
import { ServiceAppointmentEntity } from "../entities/service_appointment_entity"
import { ServiceEntity } from "../entities/service_entity"
import { ServiceProviderEntity } from "../entities/service_provider_entity"
import { ServiceTypeEntity } from "../entities/service_type_entity"
import { Workspace } from "../entities/service_workspace_entity"

export default class ServiceAggregate extends Aggregate<ServiceEntity> {

    private _workspaces: Workspace[];
    private _serviceProviders: ServiceProviderEntity[];
    private _appointments: ServiceAppointmentEntity[];
    
    public static create() {
        
    }

    public scheduleAppointment() {
        
    }

}