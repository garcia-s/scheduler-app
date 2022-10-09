import { Err, Result } from "ts-results";
import { UnimplementedError } from "../../../../core/errors/general";
import { IDomainFailure } from "../../../../core/failures/interfaces";
import Aggregate from "../../../../core/interfaces/aggregate";
import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { ServiceEntity } from "../entities/service_entity";
import { ServiceProviderEntity } from "../entities/service_provider_entity";
import { WorkspaceEntity } from "../entities/workspace_entity";
import { AppointmentRequest } from "../value_objects/appointment_request";

export interface IAppointmentScheduleFailure {}

/**
 * @class
 * Returned when attempting to create an appointment that doesn't have a service privider available.
 * It's also returned by the findAvailableServiceProvider private method
 */
export class NoServiceProviderAvailable
  implements IAppointmentScheduleFailure {}

/**
 * @class
 * Returned when attempting to create an appointment that doesn't have a workspace available.
 * It's also returned by the findAvailableWorkspae private method
 */
export class NoWorkspaceAvailable implements IAppointmentScheduleFailure {}

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

  public scheduleAppointment(
    request: AppointmentRequest
  ): Result<void, IAppointmentScheduleFailure> {
    const providerOrFailure = this.findAvailableServiceProvider(request);
    if (providerOrFailure.err) return Err(new NoServiceProviderAvailable());

    const workspaceOrFailure = this.findAvailableWorkspace(request);
    if (workspaceOrFailure) return Err(new NoWorkspaceAvailable());
  }

  public rescheduleAppointment(
    request: AppointmentRequest,
    appointmentId: string
  ): void {
    throw new UnimplementedError();
  }

  private findAvailableServiceProvider(
    request: AppointmentRequest
  ): Result<ServiceProviderEntity, NoServiceProviderAvailable> {
    for(let i = 0; i < this._serviceProviders.length ; i++) {
      if(this._serviceProviders[i].isAvailable())
    }
  }

  private findAvailableWorkspace(
    request: AppointmentRequest
  ): Result<WorkspaceEntity, IDomainFailure> {
    throw UnimplementedError;
  }
}
