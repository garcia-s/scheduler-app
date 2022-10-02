import { Result } from "ts-results";
import { UnimplementedError } from "../../../../core/errors/general";
import { IDomainFailure } from "../../../../core/failures/interfaces";
import Aggregate from "../../../../core/interfaces/aggregate";
import { ServiceEntity } from "../entities/service_entity";
import { ServiceProviderEntity } from "../entities/service_provider_entity";
import { WorkspaceEntity } from "../entities/workspace_entity";
import { AppointmentRequest } from "../value_objects/appointment_request";

export default class ServiceAggregate extends Aggregate<ServiceEntity> {
  private _serviceProviders: ServiceProviderEntity[];
  private _workSpaces: WorkspaceEntity[];

  constructor(params: {
    service: ServiceEntity;
    serviceProviders: ServiceProviderEntity[];
    workSpaces: WorkspaceEntity[];
  }) {
    super(params.service);
    this._serviceProviders = params.serviceProviders;
    this._workSpaces = params.workSpaces;
  }

  public static create(params: {}) {
    throw new UnimplementedError();
  }

  public static reconstitue() {
    throw new UnimplementedError();
  }

  public addWorkspace(workspace: WorkspaceEntity) {
    throw new UnimplementedError();
  }

  public removeWorkspace(id: string) {
    throw new UnimplementedError();
  }

  public addServiceProvider(serviceProvider: string): void {
    throw new UnimplementedError();
  }

  public removeServiceProvider(): void {
    throw new UnimplementedError();
  }
  
  public scheduleAppointment(request: AppointmentRequest): Result<void, IDomainFailure> {
    
  }

  public rescheduleAppointment(
    request: AppointmentRequest,
    appointmentId: string
  ): void {
    throw new UnimplementedError();
  }

  private findAvailableServiceProvider(): Result<ServiceProviderEntity, IDomainFailure> {}
}
