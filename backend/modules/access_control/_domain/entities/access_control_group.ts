import { Ok, Result } from "ts-results";
import { UnimplementedError } from "../../../../core/errors/general";
import { Entity } from "../../../../core/interfaces/entity";
import { AccessRequest } from "../value_objects/access_request";
import { PolicyEntity } from "./access_control_policy";


export class GroupEntity extends Entity {
  private _id: string;
  private _policies: PolicyEntity[];

  get id(): string {
    return this._id;
  }

  get policies(): PolicyEntity[] {
    return this._policies;
  }

  private constructor(
    id: string,
    policies: PolicyEntity[],
  ) {
    super();
    this._id = id;
    this._policies = policies;
  }

  public static create(name: string, policies: PolicyEntity[]): GroupEntity {
    return new GroupEntity(name, policies);
  }

  public static reconstitute(
    id: string,
    policies: PolicyEntity[],
  ): GroupEntity {
    return new GroupEntity(id, policies);
  }

  deletePolicy(policyId: string) {
    throw new UnimplementedError();
  }

  addPolicy(policy: PolicyEntity) {
    this._policies.push(policy);
  }

  hasAccess(userId: string, request: AccessRequest): boolean {
    for (let i = 0; i < this.policies.length; i++) {
      if (this.policies[i].hasAccess(userId, request)) return true;
    }
    return false;
  }
}
