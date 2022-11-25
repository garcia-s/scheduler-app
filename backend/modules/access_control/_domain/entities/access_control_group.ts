
import { UnimplementedError } from "../../../../core/errors/general";
import { Entity } from "../../../../core/interfaces/entity";
import { StringEntityID } from "../../../../core/value_objects/string_entity_id";
import { AccessRequest } from "../value_objects/access_request";
import { PolicyEntity } from "./access_control_policy";

export class GroupEntity extends Entity {
  private _policies: PolicyEntity[];

  get policies(): PolicyEntity[] {
    return this._policies;
  }

  private constructor(id: StringEntityID, policies: PolicyEntity[]) {
    super(id);
    this._policies = policies;
  }

  public static create(name: StringEntityID, policies: PolicyEntity[]): GroupEntity {
    return new GroupEntity(name, policies);
  }

  public static reconstitute(
    id: StringEntityID,
    policies: PolicyEntity[]
  ): GroupEntity {
    return new GroupEntity(id, policies);
  }

  deletePolicy(policyId: string) {
    throw new UnimplementedError();
  }

  addPolicy(policy: PolicyEntity) {
    this._policies.push(policy);
  }

  hasAccess(request: AccessRequest): boolean {
    for (let i = 0; i < this.policies.length; i++) {
      if (this.policies[i].hasAccess( request)) return true;
    }
    return false;
  }
}
