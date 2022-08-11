import { Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import { Entity } from "../../../../../core/interfaces/entity";
import { AccessGroup } from "./access_group";
import { AccessPolicy } from "./access_policy";

export interface IAccessUserParams {
  email: EmailAddress;
  accessGroups: AccessGroup[];
}

export class AccessUser extends Entity<IAccessUserParams> {
  private constructor(params: IAccessUserParams, id: UniqueEntityID) {
    super(params, id);
  }

  public static create(): Result<AccessUser, Error> {
    throw new UnimplementedError();
  }

  public addUserPolicy(policy: AccessPolicy) {
    throw new UnimplementedError();
  }

  public deleteUserPolicy(policyId: UniqueEntityID) {
    throw new UnimplementedError();
  }
}
