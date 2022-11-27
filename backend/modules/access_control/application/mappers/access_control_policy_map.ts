import { PolicyEntity } from "../../_domain/entities/access_control_policy";
import PolicyDTO from "../dto/policy_dto";
import PolicyModel from "../models/policy_model";
import { PolicyAttributeMap } from "./policy_attribute_map";
import { UUIDEntityID } from "../../../../core/value_objects/uuid_entity_id";

export default abstract class PolicyMap {
  public static fromEntityToDTO(policy: PolicyEntity): PolicyDTO {
    return {
      id: policy.id.value,
      action: policy.action,
      attributes: policy.attributes.map((e) =>
        PolicyAttributeMap.fromVOtoDTO(e)
      ),
    };
  }

  public static fromModelToEntity(model: PolicyModel): PolicyEntity {
    return PolicyEntity.reconstitute({
      id: UUIDEntityID.reconstitute(model.id),
      action: model.action,
      attributes: model.attributes.map((e) =>
        PolicyAttributeMap.fromModelToVO(e)
      ),
    });
  }

  public static fromEntityToModel(entity: PolicyEntity): PolicyModel {
    const policyModel = new PolicyModel();
    policyModel.id = entity.id.value;
    policyModel.action = entity.action;
    return policyModel;
  }

}
