import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { GroupEntity } from "../entities/access_control_group";

export default class AddedGroupsToUserEvent extends IDomainEvent {
  private id: string;
  private data: GroupEntity[];

  constructor(id: string, groups: GroupEntity[]) {
    super();
    this.id = id;
    this.data = groups;
  }

  get aggregateId(): string {
    return this.id;
  }
}
