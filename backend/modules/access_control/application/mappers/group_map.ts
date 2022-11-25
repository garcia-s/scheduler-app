import { StringEntityID } from "../../../../core/value_objects/string_entity_id";
import { GroupAggregate } from "../../_domain/aggregates/access_group_aggregate";
import { GroupEntity } from "../../_domain/entities/access_control_group";
import NewGroupDTO from "../dto/new_group_dto";
import GroupDTO from "../dto/role_dto";
import GroupModel from "../models/group_model";
import PolicyMap from "./access_control_policy_map";

export default abstract class GroupMap {
  public static fromEntityToDTO(group: GroupEntity): GroupDTO {
    return {
      name: group.id.value,
      policies: group.policies.map((policy) =>
        PolicyMap.fromEntityToDTO(policy)
      ),
    };
  }

  public static fromModelToEntity(model: GroupModel): GroupEntity {
    return GroupEntity.reconstitute(
      StringEntityID.reconstitute(model.name),
      model.policies.map((policy) => PolicyMap.fromModelToEntity(policy))
    );
  }

  public static fromCreationalDTOToAggregate(dto: NewGroupDTO) {
    return GroupAggregate.create(StringEntityID.reconstitute(dto.name));
  }

  public static fromEntityToModel(entity: GroupEntity): GroupModel {
    const groupModel = new GroupModel();
    groupModel.name = entity.id.value;
    groupModel.policies = entity.policies.map((policy) =>
      PolicyMap.fromEntityToModel(policy)
    );
    return groupModel;
  }

  public static fromAggregateToModel(group: GroupAggregate): GroupModel {
    const model = new GroupModel();
    model.name = group.id.value;
    model.policies = group.policies.map((policy) =>
      PolicyMap.fromEntityToModel(policy)
    );
    return model;
  }
}
