import { Err, Ok, Result } from "ts-results";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import { GroupAggregate } from "../../_domain/agregates/access_group_aggregate";
import GroupMap from "../mappers/access_control_group_map";
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
      await model.save();
      return Ok(undefined);
    } catch (e) {
      console.log(e);
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
