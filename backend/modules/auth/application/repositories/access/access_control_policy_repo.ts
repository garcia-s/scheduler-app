import { Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../../core/interfaces/failure";
import { AccessControlUserAggregate } from "../../../domain/agregates/access/access_user_aggregate";
import { AccessControlGroupEntity } from "../../../domain/entities/access/access_control_group";
import { AccessControlPolicyEntity } from "../../../domain/entities/access/access_control_policy";

export interface IAccessControlPolicyRepoFailure extends Failure {}

export interface IAccessControlPolicyRepository {
  save(
    AccessControlGroupEntity: AccessControlUserAggregate
  ): Promise<Result<void, IAccessControlPolicyRepoFailure>>;

  getPolicyByGroupId(
    id: UniqueEntityID
  ): Promise<Result<AccessControlPolicyEntity, IAccessControlPolicyRepoFailure>>;

  getPolicyById(
    id: UniqueEntityID
  ): Promise<Result<AccessControlPolicyEntity, IAccessControlPolicyRepoFailure>>;


  getGroupsById(
    ids: UniqueEntityID[]
  ): Promise<AccessControlGroupEntity[]>;

  getAccessControlGroupEntitiesByIds(
    ids: UniqueEntityID[]
  ): Promise<AccessControlGroupEntity[]>;
}
