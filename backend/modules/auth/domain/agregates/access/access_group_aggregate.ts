import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import Aggregate from "../../../../../core/interfaces/aggregate";
import { AddPolicyToGroupByName } from "../../../application/use_cases/access/add_policy_to_group_by_name";
import {
  AccessControlGroupEntity,
  IAccessControlGroupParams,
} from "../../entities/access/access_control_group";
import { AccessControlPolicyEntity } from "../../entities/access/access_control_policy";
import { AccessControlUserEntity } from "../../entities/access/access_control_user";
import { AddedPolicyToGroupEvent } from "../../events/access/added_policy_to_group_event";

export interface IAccessControlGroupAggregateParams {
  _users: AccessControlUserEntity[];
}

export class AccessControlGroupAggregate extends Aggregate<AccessControlGroupEntity> {
  private constructor(root: AccessControlGroupEntity) {
    super(root);
  }

  public static create(
    params: IAccessControlGroupParams
  ): AccessControlGroupAggregate {
    return new AccessControlGroupAggregate(
      AccessControlGroupEntity.create(params)
    );
  }

  addPolicy(policy: AccessControlPolicyEntity) {
    this.root.addPolicy(policy)
    this.addDomainEvent(new AddedPolicyToGroupEvent(this.root.id, policy);
  }

  removePolicy() {
    throw new UnimplementedError();
  }
}
