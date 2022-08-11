import { Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import Aggregate from "../../../../../core/interfaces/aggregate";
import Failure from "../../../../../core/interfaces/failure";
import { AccessPolicy } from "../../entities/access/access_policy";
import { AccessGroup } from "../../entities/access/access_group";
import { AccessUser } from "../../entities/access/access_user";
import { AddedUserPolicy } from "../../events/access/added_user_policy";
import { DeletedUserPolicy } from "../../events/access/deleted_user_policy";

export interface IAccessUserAggregateParams {
  email: EmailAddress;
  accessGroups: AccessGroup[],
}

export class AccessUserAggregate extends Aggregate<IAccessUserAggregateParams> {
  
  get email(): EmailAddress {
    return this.props.email;
  }

  get accessGroups(): AccessGroup[] {
    return this.props.accessGroups;
  }

  constructor(params: IAccessUserAggregateParams, id?: UniqueEntityID) {
    super(params, id);
  }

  public static create(
    params: IAccessUserAggregateParams,
    id?: UniqueEntityID
  ): Result<AccessUserAggregate, Failure> {
    throw new UnimplementedError();
  }

  public addUserPolicy(policy: AccessPolicy) {
    this.addUserPolicy(policy);
    this.addDomainEvent(new AddedUserPolicy(this.id, policy));
  }

  public deleteUserPolicy(policyId: UniqueEntityID) {
    this.deleteUserPolicy(policyId);
    this.addDomainEvent(new DeletedUserPolicy(this.id, policyId));
  }
}
