import { id } from "fp-ts/lib/Refinement";
import { Err, Ok, Result } from "ts-results";
import { In } from "typeorm";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../core/errors/general";
import { PostgresDataSource } from "../../../../datasources";
import AccessControlGroupMap from "../../application/mappers/access/access_control_group_map";
import AccessControlUserMap from "../../application/mappers/access/access_control_user_map";
import AccessControlGroupModel from "../../application/models/access/access_control_group_model";
import AccessControlUserModel from "../../application/models/access/access_control_user_model";
import {
  AccessControlUserDatabaseWriteFailure,
  AccessControlUserNotFound,
  IAccessControlUserRepositoryFailure,
} from "../../application/repositories/access/access_control_user_repo";
import { AccessControlUserAggregate } from "../../domain/agregates/access/access_user_aggregate";
import { AccessControlGroupEntity } from "../../domain/entities/access/access_control_group";

export class AccessControlUserRepository extends IAccessControlUserRepositoryFailure {
  async save(
    user: AccessControlUserAggregate
  ): Promise<Result<null, IAccessControlUserRepositoryFailure>> {
    try {
      const userModel = AccessControlUserMap.fromAggregateToModel(user);
      console.log(userModel)
      console.log(await userModel.save());
      return Ok(null);
    } catch (e) {
      console.log(e);
      return Err(new AccessControlUserDatabaseWriteFailure());
    }
  }

  async getAccessControlGroupEntitiesByIds(
    ids: UniqueEntityID[]
  ): Promise<AccessControlGroupEntity[]> {
    const groupModels = await AccessControlGroupModel.findBy({
      id: In(ids.map((id) => id.value)),
    });

    const groupEntities = groupModels.map((group) =>
      AccessControlGroupMap.fromModelToEntity(group)
    );

    return groupEntities;
  }

  async getAccessControlGroupEntitiesByNames(
    names: string[]
  ): Promise<AccessControlGroupEntity[]> {
    const groupModels = await AccessControlGroupModel.findBy({
      name: In(names),
    });

    const groupEntities = groupModels.map((group) =>
      AccessControlGroupMap.fromModelToEntity(group)
    );

    return groupEntities;
  }

  async getUserById(
    id: UniqueEntityID
  ): Promise<Result<AccessControlUserAggregate, AccessControlUserNotFound>> {
    console.log(id.value);
    const userModel = await AccessControlUserModel.findOne({
      where: { id: id.value },
      relationLoadStrategy: 'query',
      relations: {
        groups: true
      }
    });
    if (userModel == null) return Err(new AccessControlUserNotFound());
    console.log(userModel);
    return Ok(AccessControlUserMap.fromModelToAggregate(userModel));
  }
}
