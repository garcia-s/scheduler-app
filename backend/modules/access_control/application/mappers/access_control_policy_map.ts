import { PolicyEntity } from "../../_domain/entities/access_control_policy";
import PolicyDTO from "../dto/policy_dto";
import { PolicyByNameAdditionDTO } from "../dto/new_access_control_policy_dto";
import PolicyModel from "../models/access_control_policy_model";
import NewPolicyDTO from "../dto/new_policy_dto";

export default abstract class PolicyMap {
  public static fromEntityToDTO(policy: PolicyEntity): PolicyDTO {
    return {
      id: policy.id,
      action: policy.action,
      objectType: policy.objectType,
      objectOwner: policy.objectOwner,
      objectId: policy.objectId,
    };
  }

  public static fromModelToEntity(model: PolicyModel): PolicyEntity {
    return PolicyEntity.reconstitute({
      id: model.id,
      action: model.action,
      objectType: model.objectType,
      objectOwner: model.objectOwner,
      objectId: model.objectId,
    });
  }

  public static fromEntityToModel(entity: PolicyEntity): PolicyModel {
    const policyModel = new PolicyModel();
    policyModel.id = entity.id;
    policyModel.action = entity.action;
    policyModel.objectType = entity.objectType;
    policyModel.objectOwner = entity.objectOwner;
    policyModel.objectId = entity.objectId;
    return policyModel;
  }

  public static fromDTOtoEntity(dto: NewPolicyDTO): PolicyEntity {
    return PolicyEntity.create({
      objectId: dto.objectId,
      action: dto.action,
      objectOwner: dto.objectOwner,
      objectType: dto.objectType,
    });
  }
}
