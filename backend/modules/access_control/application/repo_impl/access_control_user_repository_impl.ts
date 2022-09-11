import { id } from "fp-ts/lib/Refinement";
import { Err, Ok, Result } from "ts-results";
import { In } from "typeorm";
import GroupMap from "../mappers/access_control_group_map";
import UserMap from "../mappers/access_control_user_map";
import GroupModel from "../models/access_control_group_model";
import UserModel from "../models/access_control_user_model";
import {
  IUserRepositoryFailure,
  UserDatabaseWriteFailure,
  UserNotFound,
} from "../repo_interfaces/user_repo";
import { UserAggregate } from "../../_domain/agregates/access_user_aggregate";
import { GroupEntity } from "../../_domain/entities/access_control_group";

export class UserRepository extends IUserRepositoryFailure {
  async save(
    user: UserAggregate
  ): Promise<Result<null, IUserRepositoryFailure>> {
    try {
      const userModel = UserMap.fromAggregateToModel(user);
      console.log(userModel);
      console.log(await userModel.save());
      return Ok(null);
    } catch (e) {
      console.log(e);
      return Err(new UserDatabaseWriteFailure());
    }
  }

  async getGroupEntitiesByNames(names: string[]): Promise<GroupEntity[]> {
    const groupModels = await GroupModel.findBy({
      name: In(names),
    });

    const groupEntities = groupModels.map((group) =>
      GroupMap.fromModelToEntity(group)
    );
    return groupEntities;
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
