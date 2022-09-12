import { Result } from "ts-results";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../core/interfaces/failure";
import { UserAggregate } from "../../_domain/aggregates/access_user_aggregate";
import { GroupEntity } from "../../_domain/entities/access_control_group";
import { PolicyEntity } from "../../_domain/entities/access_control_policy";


export interface IPolicyRepoFailure extends Failure {}

export interface IPolicyRepository {
  save(
    GroupEntity: UserAggregate
  ): Promise<Result<void, IPolicyRepoFailure>>;

  getPolicyByGroupId(
    id: UniqueEntityID
  ): Promise<Result<PolicyEntity, IPolicyRepoFailure>>;

  getPolicyById(
    id: UniqueEntityID
  ): Promise<Result<PolicyEntity, IPolicyRepoFailure>>;


  getGroupsById(
    ids: UniqueEntityID[]
  ): Promise<GroupEntity[]>;

  getGroupEntitiesByNames(
    ids: UniqueEntityID[]
  ): Promise<GroupEntity[]>;
}
