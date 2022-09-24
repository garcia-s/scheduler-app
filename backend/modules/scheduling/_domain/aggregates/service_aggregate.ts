import { UnimplementedError } from "../../../../core/errors/general";
import Aggregate from "../../../../core/interfaces/aggregate";
import { ServiceEntity } from "../entities/service_entity";
import { ServiceProviderEntity } from "../entities/service_provider_entity";
import { WorkspaceEntity } from "../entities/workspace_entity";

export default class ServiceAggregate extends Aggregate<ServiceEntity> {
  private _serviceProviders: ServiceProviderEntity[];
  private _workSpaces: WorkspaceEntity[];

  constructor(params: {
    service: ServiceEntity;
    serviceProviders: ServiceProviderEntity[];
    workSpaces: WorkspaceEntity[];
  }) {
    super(params.service);
    this._serviceProviders = params.serviceProviders
    this._workSpaces = params.workSpaces;
  }
  
  public static create(params: {}) {
    throw new UnimplementedError()
  }

  public static reconstitue() {
    throw new UnimplementedError()
  }

  addWorkspace(workspace: WorkspaceEntity) {
    throw new UnimplementedError()
  }

  removeWorkspace(id: string) {
    throw new UnimplementedError()
  }

  addServiceProvider(serviceProvider: string): void {
    throw new UnimplementedError()
  }

  removeServiceProvider(): void {
    throw new UnimplementedError()
  }

  scheduleAppointment(appointment: string): void {
    
  }

  rescheduleAppointment(): void {
    throw new UnimplementedError()
  }
}
