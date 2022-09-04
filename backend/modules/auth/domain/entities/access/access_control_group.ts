import { Ok, Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import { Entity } from "../../../../../core/interfaces/entity";
import { AccessRequest } from "../../value_objects/access_request";
import { AccessControlPolicyEntity } from "./access_control_policy";

export interface IAccessControlGroupParams {
  name: string;
  policies: AccessControlPolicyEntity[];
}

export class AccessControlGroupEntity extends Entity<IAccessControlGroupParams> {
  get name() {
    return this.props.name;
  }

  get policies(): AccessControlPolicyEntity[] {
    return this.props.policies;
  }

  private constructor(params: IAccessControlGroupParams, id?: UniqueEntityID) {
    super(params, id);
  }

  public static create(params: IAccessControlGroupParams): AccessControlGroupEntity {
    return new AccessControlGroupEntity(params);
  }

  public static reconstitute(
    params: IAccessControlGroupParams,
    id: UniqueEntityID
  ): AccessControlGroupEntity {
    return new AccessControlGroupEntity(params, id);
  }

  deletePolicy(policyId: UniqueEntityID) {
    throw new UnimplementedError();
  }

  addPolicy(policy: AccessControlPolicyEntity) {
   this.props.policies.push(policy)
  }

  hasAccess(userId: UniqueEntityID, request:AccessRequest):boolean {
    for(let i = 0; i< this.policies.length; i++) {
      if(this.policies[i].hasAccess(userId, request)) return true;
    }
    return false;
  }

}
