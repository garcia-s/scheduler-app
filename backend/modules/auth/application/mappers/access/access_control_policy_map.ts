import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { AccessControlPolicyEntity } from "../../../domain/entities/access/access_control_policy";
import AccessControlPolicyDTO from "../../dto/access/access_control_policy_dto";
import AccessControlPolicyModel from "../../models/access/access_control_policy_model";

export default abstract class AccessControlPolicyMap {
  public static fromEntityToDTO(
    policy: AccessControlPolicyEntity
  ): AccessControlPolicyDTO {
    return {
      id: policy.id.value,
      action: policy.action,
      subject: policy.subject,
      objectType: policy.objectType,
      objectOwner: policy.objectOwner,
      objectId: policy.objectId,
    };
  }

  public static fromModelToEntity(
    model: AccessControlPolicyModel
  ): AccessControlPolicyEntity {
    return AccessControlPolicyEntity.reconstitute(
      {
        subject: model.subject,
        action: model.action,
        objectType: model.objectType,
        objectOwner: model.objectOwner,
        objectId: model.objectId,
      },
      new UniqueEntityID(model.id)
    );
  }

  public static fromEntityToModel(
    entity: AccessControlPolicyEntity
  ): AccessControlPolicyModel {
    const policyModel = new AccessControlPolicyModel();
    policyModel.id = entity.id.value;
    policyModel.subject = entity.subject;
    policyModel.action = entity.action;
    policyModel.objectType = entity.objectType;
    policyModel.objectOwner = entity.objectOwner;
    policyModel.objectId = entity.objectId;
    return policyModel;
  }
}
