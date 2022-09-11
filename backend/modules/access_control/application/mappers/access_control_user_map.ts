
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { UserAggregate } from "../../_domain/agregates/access_user_aggregate";
import UserDTO from "../dto/access_control_user_dto";
import UserModel from "../models/access_control_user_model";
import GroupMap from "./access_control_group_map";

export default abstract class UserMap {
  public static fromAggregateToDTO(
    user: UserAggregate
  ): UserDTO {
    return {
      id: user.id.value,
      username: user.username,
      accessControlGroups: user.root.groups.map((group) =>
        GroupMap.fromEntityToDTO(group)
      ),
    };
  }

  public static fromAggregateToModel(
    user: UserAggregate
  ): UserModel {
    const userModel = new UserModel();
    userModel.id = user.id.value;
    userModel.username = user.username;
    userModel.groups = user.groups.map((group) =>
      GroupMap.fromEntityToModel(group)
    );
    return userModel;
  }

  public static fromModelToAggregate(user: UserModel) {
    return UserAggregate.reconstitute(
      new UniqueEntityID(user.id),
      {
        username: user.username,
        accessControlGroups: user.groups.map((group) =>
          GroupMap.fromModelToEntity(group)
        ),
      }
    );
  }
}
