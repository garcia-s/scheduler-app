import { Err, Ok, Result } from "ts-results";
import { UnimplementedError } from "../../../../core/errors/general";
import { IDomainFailure } from "../../../../core/failures/interfaces";
import Aggregate from "../../../../core/interfaces/aggregate";
import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import {
  AppointmentEntity,
  AppointmentStatus,
} from "../entities/appointment_entity";
import { ServiceEntity } from "../entities/service_entity";
import { ServiceProviderEntity } from "../entities/service_provider_entity";
import { WorkspaceEntity } from "../entities/workspace_entity";
import { AppointmentRequest } from "../value_objects/appointment_request";

interface IAppointmentScheduleFailure {}

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

export class AppointmentNotFoundFailure {}



interface IAppointmentRescheduleFailure {}


export default class ServiceAggregate extends Aggregate<ServiceEntity> {
  private _serviceProviders: ServiceProviderEntity[];
  private _workSpaces: WorkspaceEntity[];
  private _appointments: AppointmentEntity[];

  constructor(params: {
    service: ServiceEntity;
    serviceProviders: ServiceProviderEntity[];
    workSpaces: WorkspaceEntity[];
    appointments: [];
  }) {
    super(params.service);
    this._serviceProviders = params.serviceProviders;
    this._workSpaces = params.workSpaces;
  }

  public static create(params: {}) {
    throw new UnimplementedError();
  }

  public static reconstitute() {
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

  /**
   *
   * @public method
   * @returns a new appointment when it has an available service provider and workspace.
   *
   */
  public scheduleAppointment(
    request: AppointmentRequest
  ): Result<AppointmentEntity, IAppointmentScheduleFailure> {
    const providerOrFailure = this.findAvailableServiceProvider(request);
    if (providerOrFailure.err) return Err(new NoServiceProviderAvailable());

    const workspaceOrFailure = this.findAvailableWorkspace(request);
    if (workspaceOrFailure.err) return Err(new NoWorkspaceAvailable());

    const appointment = AppointmentEntity.create({
      clientId: request.clientId,
      timeframe: request.timeFrame,
      serviceProviderId: providerOrFailure.val.id,
      workspaceId: workspaceOrFailure.val.id,
      status: AppointmentStatus.scheduled,
    });

    this._appointments.push(appointment);
    return Ok(appointment);
  }

  public rescheduleAppointment(params: {
    appointmentId: string;
    timeframe: string;

  }): Result<AppointmentEntity, IAppointmentRescheduleFailure> {
    const appointmentOrFailure = this.findAppointmentbyId();
    throw UnimplementedError;
  }

  /**
   * @private method
   * @returns  an available service provider or returns a NoServiceProvierAvailable failure.
   * If a providerId is given to the request should match the id with the provider and check if it's available.
   * Might need refactoring to balance the load of appointments to the least scheduled service providers.
   */
  private findAvailableServiceProvider(
    request: AppointmentRequest
  ): Result<ServiceProviderEntity, NoServiceProviderAvailable> {
    for (let i = 0; i < this._serviceProviders.length; i++) {
      if (
        request.providerId &&
        request.providerId !== this._serviceProviders[i].id
      )
        continue;

      if (this._serviceProviders[i].isAvailable(request.timeFrame))
        return Ok(this._serviceProviders[i]);
    }
    return Err(new NoServiceProviderAvailable());
  }

  /**
   * @private
   * Finds an available workspace or returns a NoWorkspaceAvailable failure.
   */
  private findAvailableWorkspace(
    request: AppointmentRequest
  ): Result<WorkspaceEntity, NoWorkspaceAvailable> {
    for (let i = 0; i < this._workSpaces.length; i++) {
      if (this._workSpaces[i].isAvailable(request.timeFrame))
        return Ok(this._workSpaces[i]);
    }
    return Err(new NoWorkspaceAvailable());
  }

  private findAppointmentbyId(): Result<
    AppointmentEntity,
    AppointmentNotFoundFailure
  > {
    throw UnimplementedError;
  }
}
