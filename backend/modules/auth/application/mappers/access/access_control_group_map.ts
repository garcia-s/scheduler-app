import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { AccessControlGroupEntity } from "../../../domain/entities/access/access_control_group";
import AccessControlGroupDTO from "../../dto/access/access_control_role_dto";
import AccessControlGroupModel from "../../models/access/access_control_group_model";
import AccessControlPolicyMap from "./access_control_policy_map";

export default abstract class AccessControlGroupMap {
  public static fromEntityToDTO(
    group: AccessControlGroupEntity
  ): AccessControlGroupDTO {
    return {
      id: group.id.value,
      name: group.name,
      policies: group.policies.map((policy) =>
        AccessControlPolicyMap.fromEntityToDTO(policy)
      ),
    };
  }

  public static fromModelToEntity(
    model: AccessControlGroupModel
  ): AccessControlGroupEntity {
    return AccessControlGroupEntity.reconstitute(
      {
        name: model.name,
        policies: model.policies.map((policy) =>
          AccessControlPolicyMap.fromModelToEntity(policy)
        ),
      },
      new UniqueEntityID(model.id)
    );
  }

  public static fromEntityToModel(
    entity: AccessControlGroupEntity
  ): AccessControlGroupModel {
    const groupModel = new AccessControlGroupModel();
    groupModel.id = entity.id.value;
    groupModel.name = entity.name;
    groupModel.policies = entity.policies.map((policy) =>
      AccessControlPolicyMap.fromEntityToModel(policy)
    );

    return groupModel;
  }
}
