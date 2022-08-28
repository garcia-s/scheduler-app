import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { userEvents } from "../../../../../socket-events";
import { AccessControlUserAggregate } from "../../../domain/agregates/access/access_user_aggregate";
import AccessControlUserDTO from "../../dto/access/access_control_user_dto";
import AccessControlUserModel from "../../models/access/access_control_user_model";
import AccessControlGroupMap from "./access_control_group_map";

export default abstract class AccessControlUserMap {
  public static fromAggregateToDTO(
    user: AccessControlUserAggregate
  ): AccessControlUserDTO {
    return {
      id: user.id.value,
      username: user.username,
      accessControlGroups: user.root.groups.map((group) =>
        AccessControlGroupMap.fromEntityToDTO(group)
      ),
    };
  }

  public static fromAggregateToModel(
    user: AccessControlUserAggregate
  ): AccessControlUserModel {
    const userModel = new AccessControlUserModel();
    userModel.id = user.id.value;
    userModel.username = user.username;
    userModel.groups = user.groups.map((group) =>
      AccessControlGroupMap.fromEntityToModel(group)
    );
    return userModel;
  }

  public static fromModelToAggregate(user: AccessControlUserModel) {
    return AccessControlUserAggregate.reconstitute(
      new UniqueEntityID(user.id),
      {
        username: user.username,
        accessControlGroups: user.groups.map((group) =>
          AccessControlGroupMap.fromModelToEntity(group)
        ),
      }
    );
  }
}
