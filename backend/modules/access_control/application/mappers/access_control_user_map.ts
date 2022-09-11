
import { UserAggregate } from "../../_domain/agregates/access_user_aggregate";
import UserDTO from "../dto/user_dto";
import UserModel from "../models/access_control_user_model";
import GroupMap from "./access_control_group_map";

export default abstract class UserMap {
  public static fromAggregateToDTO(
    user: UserAggregate
  ): UserDTO {
    return {
      id: user.id,
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
    userModel.id = user.id;
    userModel.username = user.username;
    userModel.groups = user.groups.map((group) =>
      GroupMap.fromEntityToModel(group)
    );
    return userModel;
  }

  public static fromModelToAggregate(user: UserModel) {
    return UserAggregate.reconstitute(
      {
        id: user.id,
        username: user.username,
        accessControlGroups: user.groups.map((group) =>
          GroupMap.fromModelToEntity(group)
        ),
      }
    );
  }
}
