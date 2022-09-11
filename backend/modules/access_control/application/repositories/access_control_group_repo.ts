import { Result } from "ts-results";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../core/interfaces/failure";
import { GroupAggregate } from "../../_domain/agregates/access_group_aggregate";
import { GroupEntity } from "../../_domain/entities/access_control_group";


export interface IGroupRepoFailure extends Failure {}

export interface IGroupRepository {
  save(
    accessControlGroup: GroupAggregate
  ): Promise<Result<void, IGroupRepoFailure>>;

  getGroupById(
    id: UniqueEntityID
  ): Promise<
    Result<GroupAggregate, IGroupRepoFailure>
  >;

  getGroupByName(
    id: UniqueEntityID
  ): Promise<
    Result<GroupAggregate, IGroupRepoFailure>
  >;

  getGroupByUserId(
    id: UniqueEntityID
  ): Promise<
    Result<GroupAggregate, IGroupRepoFailure>
  >;

  getGroupEntitiesByIds(
    ids: UniqueEntityID[]
  ): Promise<GroupEntity[]>;
}
