import { Err, Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import Aggregate from "../../../../../core/interfaces/aggregate";
import Failure from "../../../../../core/interfaces/failure";
import { AccessControlPolicyEntity } from "../../entities/access/access_control_policy";
import { AccessControlGroupEntity } from "../../entities/access/access_control_group";
import {
  AccessControlUserEntity,
  IAccessControlUserParams,
} from "../../entities/access/access_control_user";
import AddedGroupsToUserEvent from "../../events/access/added_group_to_user_event";

export class AccessControlUserAggregate extends Aggregate<AccessControlUserEntity> {
  private constructor(root: AccessControlUserEntity) {
    super(root);
  }

  public get username() : string {
    return this.root.username
  }

  public get groups(): AccessControlGroupEntity[] {
    return this.root.groups;
  }
  
  // Creation factory
  public static create(id: UniqueEntityID, username: string): AccessControlUserAggregate {
    const root = AccessControlUserEntity.create(id, username);
    return new AccessControlUserAggregate(root);
  }

  public static reconstitute(
    id: UniqueEntityID,
    params: IAccessControlUserParams
  ): AccessControlUserAggregate {
    const root = AccessControlUserEntity.reconstitute(id, params);
    return new AccessControlUserAggregate(root);
  }

  public addGroups(groups: AccessControlGroupEntity[]): void {
    this.root.addGroups(groups);
    this.addDomainEvent(
      new AddedGroupsToUserEvent(this.root.id, this.root.groups)
    );
  }
}

// -------------------- Failures ---------------------

// Interface
export abstract class IAccessControlUserAggregateFailure extends Failure {}

export class InvalidAccesUserRootEntityFailure extends IAccessControlUserAggregateFailure {}
