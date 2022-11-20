import { PolicyAttribute } from "../../_domain/value_objects/policy_attribute";
import { PolicyAttributeDTO } from "../dto/policy_attribute_dto";
import PolicyAttributeModel from "../models/policy_attribute_model";
import PolicyModel from "../models/policy_model";

export abstract class PolicyAttributeMap {
  public static fromModelToVO(model: PolicyAttributeModel): PolicyAttribute {
    return PolicyAttribute.reconstitute({
      name: model.name,
      value: model.value,
    });
  }

  public static fromVOtoDTO(object: PolicyAttribute): PolicyAttributeDTO {
    return { name: object.name, value: object.value };
  }
}
