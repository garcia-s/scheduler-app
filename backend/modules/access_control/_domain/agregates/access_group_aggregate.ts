import { UnimplementedError } from "../../../../core/errors/general";
import AggregateRoot from "../../../../core/interfaces/aggregate";
import { GroupEntity, IGroupParams } from "../entities/access_control_group";
import { PolicyEntity } from "../entities/access_control_policy";
import { UserEntity } from "../entities/access_control_user";
import { AddedPolicyToGroupEvent } from "../events/added_policy_to_group_event";


export interface IGroupAggregateParams {
  _users: UserEntity[];
}

export class GroupAggregate extends AggregateRoot<GroupEntity> {
  private constructor(root: GroupEntity) {
    super(root);
  }

  public static create(
    params: IGroupParams
  ): GroupAggregate {
    return new GroupAggregate(
      GroupEntity.create(params)
    );
  }

  addPolicy(policy: PolicyEntity) {
    this.root.addPolicy(policy)
    this.addDomainEvent(new AddedPolicyToGroupEvent(this.root.id, policy))
  }

  removePolicy() {
    throw new UnimplementedError();
  }
}
