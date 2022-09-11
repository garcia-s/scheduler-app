import { id } from "fp-ts/lib/Refinement";
import { Err, Ok, Result } from "ts-results";
import { In } from "typeorm";
import UniqueEntityID from "../../core/domain/value_objects/unique_entity_id";
import GroupMap from "../../modules/access_control/application/mappers/access_control_group_map";
import UserMap from "../../modules/access_control/application/mappers/access_control_user_map";
import GroupModel from "../../modules/access_control/application/models/access_control_group_model";
import UserModel from "../../modules/access_control/application/models/access_control_user_model";
import { IUserRepositoryFailure, UserDatabaseWriteFailure, UserNotFound } from "../../modules/access_control/application/repositories/access_control_user_repo";
import { UserAggregate } from "../../modules/access_control/_domain/agregates/access_user_aggregate";
import { GroupEntity } from "../../modules/access_control/_domain/entities/access_control_group";


export class UserRepository extends IUserRepositoryFailure {
  async save(
    user: UserAggregate
  ): Promise<Result<null, IUserRepositoryFailure>> {
    try {
      const userModel = UserMap.fromAggregateToModel(user);
      console.log(userModel)
      console.log(await userModel.save());
      return Ok(null);
    } catch (e) {
      console.log(e);
      return Err(new UserDatabaseWriteFailure());
    }
  }

  async getGroupEntitiesByIds(
    ids: UniqueEntityID[]
  ): Promise<GroupEntity[]> {
    const groupModels = await GroupModel.findBy({
      id: In(ids.map((id) => id.value)),
    });

    const groupEntities = groupModels.map((group) =>
      GroupMap.fromModelToEntity(group)
    );

    return groupEntities;
  }

  async getGroupEntitiesByNames(
    names: string[]
  ): Promise<GroupEntity[]> {
    const groupModels = await GroupModel.findBy({
      name: In(names),
    });

    const groupEntities = groupModels.map((group) =>
      GroupMap.fromModelToEntity(group)
    );

    return groupEntities;
  }

  async getUserById(
    id: UniqueEntityID
  ): Promise<Result<UserAggregate, UserNotFound>> {
    const userModel = await UserModel.findOne({
      where: { id: id.value },
      relationLoadStrategy: 'query',
      relations: {
        groups: {
          policies: true,
        }
      }
    });
    if (userModel == null) return Err(new UserNotFound());
    return Ok(UserMap.fromModelToAggregate(userModel));
  }
}
