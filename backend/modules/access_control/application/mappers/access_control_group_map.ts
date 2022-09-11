import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { GroupEntity } from "../../_domain/entities/access_control_group";
import GroupDTO from "../dto/access_control_role_dto";
import GroupModel from "../models/access_control_group_model";
import PolicyMap from "./access_control_policy_map";

export default abstract class GroupMap {
  public static fromEntityToDTO(
    group: GroupEntity
  ): GroupDTO {
    return {
      id: group.id.value,
      name: group.name,
      policies: group.policies.map((policy) =>
        PolicyMap.fromEntityToDTO(policy)
      ),
    };
  }

  public static fromModelToEntity(
    model: GroupModel
  ): GroupEntity {
    return GroupEntity.reconstitute(
      {
        name: model.name,
        policies: model.policies.map((policy) =>
          PolicyMap.fromModelToEntity(policy)
        ),
      },
      new UniqueEntityID(model.id)
    );
  }

  public static fromEntityToModel(
    entity: GroupEntity
  ): GroupModel {
    const groupModel = new GroupModel();
    groupModel.id = entity.id.value;
    groupModel.name = entity.name;
    groupModel.policies = entity.policies.map((policy) =>
      PolicyMap.fromEntityToModel(policy)
    );

    return groupModel;
  }
}
