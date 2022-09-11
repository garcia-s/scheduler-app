import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { PolicyEntity } from "../../_domain/entities/access_control_policy";
import PolicyDTO from "../dto/access_control_policy_dto";
import { PolicyByNameAdditionDTO } from "../dto/new_access_control_policy_dto";
import PolicyModel from "../models/access_control_policy_model";

export default abstract class PolicyMap {
  public static fromEntityToDTO(
    policy: PolicyEntity
  ): PolicyDTO {
    return {
      id: policy.id.value,
      action: policy.action,
      objectType: policy.objectType,
      objectOwner: policy.objectOwner,
      objectId: policy.objectId,
    };
  }

  public static fromModelToEntity(
    model: PolicyModel
  ): PolicyEntity {
    return PolicyEntity.reconstitute(
      {
        action: model.action,
        objectType: model.objectType,
        objectOwner: model.objectOwner,
        objectId: model.objectId,
      },
      new UniqueEntityID(model.id)
    );
  }

  public static fromEntityToModel(
    entity: PolicyEntity
  ): PolicyModel {
    const policyModel = new PolicyModel();
    policyModel.id = entity.id.value;
    policyModel.action = entity.action;
    policyModel.objectType = entity.objectType;
    policyModel.objectOwner = entity.objectOwner;
    policyModel.objectId = entity.objectId;
    return policyModel;
  }

  public static fromDTOtoEntity(
    dto: PolicyByNameAdditionDTO
  ): PolicyEntity {
    
    return PolicyEntity.create({
      objectId: dto.objectId,
      action: dto.action,
      objectOwner: dto.objectOwner,
      objectType: dto.objectType,
    });
  }
}
