import { PolicyEntity } from "../../_domain/entities/access_control_policy";
import PolicyDTO from "../dto/policy_dto";
import { PolicyByNameAdditionDTO } from "../dto/new_access_control_policy_dto";
import PolicyModel from "../models/policy_model";
import NewPolicyDTO from "../dto/new_policy_dto";
import { PolicyAttribute } from "../../_domain/value_objects/policy_attribute";
import { PolicyAttributeMap } from "./policy_attribute_map";

export default abstract class PolicyMap {
  public static fromEntityToDTO(policy: PolicyEntity): PolicyDTO {
    return {
      id: policy.id,
      action: policy.action,
      attributes: policy.attributes.map((e) =>
        PolicyAttributeMap.fromVOtoDTO(e)
      ),
    };
  }

  public static fromModelToEntity(model: PolicyModel): PolicyEntity {
    return PolicyEntity.reconstitute({
      id: model.id,
      action: model.action,
      attributes: model.attributes.map((e) =>
        PolicyAttributeMap.fromModelToVO(e)
      ),
    });
  }

  public static fromEntityToModel(entity: PolicyEntity): PolicyModel {
    const policyModel = new PolicyModel();
    policyModel.id = entity.id;
    policyModel.action = entity.action;
    return policyModel;
  }

}
