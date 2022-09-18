
import { Err, Ok, Result } from "ts-results";
import { In } from "typeorm";
import GroupMap from "../mappers/group_map";
import UserMap from "../mappers/access_control_user_map";
import GroupModel from "../models/group_model";
import UserModel from "../models/user_model";
import {
  IUserRepository,
  IUserRepositoryFailure,
  UserDatabaseReadFailure,
  UserDatabaseWriteFailure,
  UserNotFound,
} from "../repo_interfaces/user_repo";
import { UserAggregate } from "../../_domain/aggregates/access_user_aggregate";
import { GroupEntity } from "../../_domain/entities/access_control_group";

export class UserRepository implements IUserRepository {
  async save(
    user: UserAggregate
  ): Promise<Result<null, IUserRepositoryFailure>> {
    try {
      const userModel = UserMap.fromAggregateToModel(user);
      console.log(userModel);
      await userModel.save()
      return Ok(null);
    } catch (e) {
    
      return Err(new UserDatabaseWriteFailure());
    }
  }

  async getGroupEntitiesByNames(
    names: string[]
  ): Promise<Result<GroupEntity[], IUserRepositoryFailure>> {
    try {
      const groupModels = await GroupModel.find({
        where: {
          name: In(names),
        },
        relations: {
          policies: true,
        },
      });
      const groupEntities = groupModels.map((group) =>
        GroupMap.fromModelToEntity(group)
      );
      return Ok(groupEntities);
    } catch (e) {
      console.log(e);
      return Err(new UserDatabaseReadFailure());
    }
  }

  async getUserById(id: string): Promise<Result<UserAggregate, UserNotFound>> {
    const userModel = await UserModel.findOne({
      where: { id: id },
      relationLoadStrategy: "query",
      relations: {
        groups: {
          policies: true,
        },
      },
    });

    if (userModel == null) return Err(new UserNotFound());
    return Ok(UserMap.fromModelToAggregate(userModel));
  }
}
