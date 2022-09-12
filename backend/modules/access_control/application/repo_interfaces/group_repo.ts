import { Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import { GroupAggregate } from "../../_domain/aggregates/access_group_aggregate";
import { GroupEntity } from "../../_domain/entities/access_control_group";

export abstract class IGroupRepoFailure extends Failure {}
export class DatabaseWriteFailure extends IGroupRepoFailure {}

export interface IGroupRepository {
  save(
    accessControlGroup: GroupAggregate
  ): Promise<Result<void, IGroupRepoFailure>>;

  getGroupById(id: string): Promise<Result<GroupAggregate, IGroupRepoFailure>>;

  getGroupByName(
    id: string
  ): Promise<Result<GroupAggregate, IGroupRepoFailure>>;

  getGroupByUserId(
    id: string
  ): Promise<Result<GroupAggregate, IGroupRepoFailure>>;
}
