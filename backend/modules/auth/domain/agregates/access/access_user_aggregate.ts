import { Err, Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import Aggregate from "../../../../../core/interfaces/aggregate";
import Failure from "../../../../../core/interfaces/failure";
import { AccessPolicy } from "../../entities/access/access_policy";
import { AccessGroup } from "../../entities/access/access_group";
import { AccessUser, IAccessUserParams } from "../../entities/access/access_user";
import { AddedUserPolicy } from "../../events/access/added_user_policy";
import { DeletedUserPolicy } from "../../events/access/deleted_user_policy";

export class AccessUserAggregate extends Aggregate<AccessUser>{

  private constructor(root: AccessUser) {
    super(root);
  }

  // Creation factory
  public static create(rootParams: IAccessUserParams): Result<AccessUserAggregate, IAccessUserAggregateFailure> {
    const rootOrFailure = AccessUser.create(rootParams)
    if(rootOrFailure.err) return Err(new InvalidAccesUserRootEntityFailure())
    return Ok(new AccessUserAggregate(rootOrFailure.val));
  }

  public addUserPolicy(policy: AccessPolicy) {
    this.addUserPolicy(policy);
    this.addDomainEvent(new AddedUserPolicy(this.root.id, policy));
  }

  public deleteUserPolicy(policyId: UniqueEntityID) {
    this.deleteUserPolicy(policyId);
    this.addDomainEvent(new DeletedUserPolicy(this.root.id, policyId));
  }
}


// -------------------- Failures ---------------------

// Interface
export abstract class IAccessUserAggregateFailure extends Failure {}

export class InvalidAccesUserRootEntityFailure extends IAccessUserAggregateFailure {}