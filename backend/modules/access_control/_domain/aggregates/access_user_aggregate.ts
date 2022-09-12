import Aggregate from "../../../../core/interfaces/aggregate";
import Failure from "../../../../core/interfaces/failure";
import { Username } from "../../../../core/value_objects/username";
import { GroupEntity } from "../entities/access_control_group";
import { UserEntity } from "../entities/access_control_user";
import AccessRequestEvent from "../events/access_request_event";
import AddedGroupsToUserEvent from "../events/added_group_to_user_event";
import { AccessRequest } from "../value_objects/access_request";

export class UserAggregate extends Aggregate<UserEntity> {
  private constructor(root: UserEntity) {
    super(root);
  }

  public get groups(): GroupEntity[] {
    return this.root.groups;
  }

  // Creation factory
  public static create(id: string): UserAggregate {
    const root = UserEntity.create(id);
    return new UserAggregate(root);
  }

  public static reconstitute(params: {
    id: string;
    accessControlGroups: GroupEntity[];
  }): UserAggregate {
    const root = UserEntity.reconstitute(params);
    return new UserAggregate(root);
  }

  public addGroups(groups: GroupEntity[]): void {
    this.root.addGroups(groups);
    this.addDomainEvent(
      new AddedGroupsToUserEvent(this.root.id, this.root.groups)
    );
  }

  public hasAccess(request: AccessRequest): boolean {
    const access = this.root.hasAccess(request);
    this.addDomainEvent(new AccessRequestEvent(this.root.id, request));
    this.dispatchEventForAggregate();
    return access;
  }
}

// -------------------- Failures ---------------------

// Interface
export abstract class IUserAggregateFailure extends Failure {}

export class InvalidAccesUserRootEntityFailure extends IUserAggregateFailure {}
