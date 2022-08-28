import { Ok, Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import { Entity } from "../../../../../core/interfaces/entity";
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

  deleteRolePolicy(policyId: UniqueEntityID) {
    throw new UnimplementedError();
  }

  addRolePolicy(policy: AccessControlGroupEntity) {
    throw new UnimplementedError();
  }
}
