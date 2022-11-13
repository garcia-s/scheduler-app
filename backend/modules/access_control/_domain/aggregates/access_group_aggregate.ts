import { UnimplementedError } from "../../../../core/errors/general";
import AggregateRoot from "../../../../core/interfaces/aggregate";
import { GroupEntity } from "../entities/access_control_group";
import { PolicyEntity } from "../entities/access_control_policy";
import { AddedPolicyToGroupEvent } from "../events/added_policy_to_group_event";
import { v4 as uuid } from "uuid";

export class GroupAggregate extends AggregateRoot {
  private _policies: PolicyEntity[];
  private _userIds: string[];

  private constructor(params: {
    id: string;
    name: string;
    userIds: string[];
    policies: PolicyEntity[];
  }) {
    super(params.id);
    this._policies = params.policies;
    this._userIds = params.userIds;
  }

  public static create(name: string): GroupAggregate {
    return new GroupAggregate({ id: uuid(), name, policies: [], userIds: [] });
  }

  addPolicy(policy: PolicyEntity) {
    this.addDomainEvent(new AddedPolicyToGroupEvent(this.id, policy));
  }

  removePolicy() {
    throw new UnimplementedError();
  }

  get policies(): PolicyEntity[] {
    return this._policies;
  }
}
