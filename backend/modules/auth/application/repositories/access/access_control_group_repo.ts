import { Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../../core/interfaces/failure";
import { AccessControlGroupAggregate } from "../../../domain/agregates/access/access_group_aggregate";
import { AccessControlGroupEntity } from "../../../domain/entities/access/access_control_group";

export interface IAccessControlGroupRepoFailure extends Failure {}

export interface IAccessControlGroupRepository {
  save(
    accessControlGroup: AccessControlGroupAggregate
  ): Promise<Result<void, IAccessControlGroupRepoFailure>>;

  getAccessControlGroupById(
    id: UniqueEntityID
  ): Promise<
    Result<AccessControlGroupAggregate, IAccessControlGroupRepoFailure>
  >;

  getAccessControlGroupByName(
    id: UniqueEntityID
  ): Promise<
    Result<AccessControlGroupAggregate, IAccessControlGroupRepoFailure>
  >;

  getAccessControlGroupByUserId(
    id: UniqueEntityID
  ): Promise<
    Result<AccessControlGroupAggregate, IAccessControlGroupRepoFailure>
  >;

  getAccessControlGroupEntitiesByIds(
    ids: UniqueEntityID[]
  ): Promise<AccessControlGroupEntity[]>;
}
