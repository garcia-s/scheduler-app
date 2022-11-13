
import Aggregate from "../../../../core/interfaces/aggregate";
import Failure from "../../../../core/interfaces/failure";
import { GroupEntity } from "../entities/access_control_group";
import AccessRequestEvent from "../events/access_request_event";
import AddedGroupsToUserEvent from "../events/added_group_to_user_event";
import { AccessRequest } from "../value_objects/access_request";

export class UserAggregate extends Aggregate {

  private _accessControlGroups: GroupEntity[];
  private constructor(params: {
    id: string;
    accessControlGroups: GroupEntity[];
  }) {
    super(params.id);
    this._accessControlGroups = params.accessControlGroups;
  }

  public get groups(): GroupEntity[] {
    return this._accessControlGroups;
  }

  // Creation factory
  public static create(id: string): UserAggregate {
    return new UserAggregate({id, accessControlGroups: []});
  }

  public static reconstitute(params: {
    id: string;
    accessControlGroups: GroupEntity[];
  }): UserAggregate {
    return new UserAggregate(params);
  }

  public addGroups(groups: GroupEntity[]): void {
    
    this.addDomainEvent(
      new AddedGroupsToUserEvent(this.id, this.groups)
    );
  }

  public hasAccess(request: AccessRequest): boolean {
    let hasAccess = false
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].hasAccess(this._id, request)) hasAccess = true;
    }
    this.addDomainEvent(new AccessRequestEvent(this.id, request));
    this.dispatchEventsForAggregate();
    return hasAccess;
  }
}

// -------------------- Failures ---------------------

// Interface
export abstract class IUserAggregateFailure extends Failure {}

export class InvalidAccesUserRootEntityFailure extends IUserAggregateFailure {}
