import { Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import { Entity } from "../../../../../core/interfaces/entity";
import { AccessPolicy } from "./access_policy";

export interface IAccessGroupParams {
  name: string;
  policies: AccessPolicy[];
}

export class AccessGroup extends Entity<IAccessGroupParams> {
  get name() {
    return this.props.name;
  }

  get policies(): AccessPolicy[] {
    return this.props.policies;
  }

  private constructor(params: IAccessGroupParams, id?: UniqueEntityID) {
    super(params, id);
  }

  public static create(
    params: IAccessGroupParams,
    id?: UniqueEntityID
  ): Result<AccessGroup, Error> {
    throw new UnimplementedError();
  }

  deleteRolePolicy(policyId: UniqueEntityID) {
    throw new UnimplementedError();
  }

  addRolePolicy(policy: AccessGroup) {
    throw new UnimplementedError();
  }
}
