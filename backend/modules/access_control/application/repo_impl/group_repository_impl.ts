import { Err, Ok, Result } from "ts-results";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import { GroupAggregate } from "../../_domain/aggregates/access_group_aggregate";
import GroupMap from "../mappers/group_map";
import {
  IGroupRepoFailure,
  IGroupRepository,
  DatabaseWriteFailure,
} from "../repo_interfaces/group_repo";

export class GroupRepository implements IGroupRepository {
  async save(
    accessControlGroup: GroupAggregate
  ): Promise<Result<void, IGroupRepoFailure>> {
    try {
      const model = GroupMap.fromAggregateToModel(accessControlGroup);
      const responseModel = await model.save({transaction: true});

      return Ok(undefined);
    } catch (e) {
      return Err(new DatabaseWriteFailure());
    }
  }

  getGroupById(id: string): Promise<Result<GroupAggregate, IGroupRepoFailure>> {
    throw new UnimplementedError();
  }

  getGroupByName(
    id: string
  ): Promise<Result<GroupAggregate, IGroupRepoFailure>> {
    throw new UnimplementedError();
  }

  getGroupByUserId(
    id: string
  ): Promise<Result<GroupAggregate, IGroupRepoFailure>> {
    throw new UnimplementedError();
  }
}
