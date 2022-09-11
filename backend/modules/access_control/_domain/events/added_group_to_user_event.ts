import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { GroupEntity } from "../entities/access_control_group";

export default class AddedGroupsToUserEvent extends IDomainEvent {
  private id: UniqueEntityID;
  private data: GroupEntity[];

  constructor(id: UniqueEntityID, groups: GroupEntity[]) {
    super();
    this.id = id;
    this.data = groups;
  }

  get aggregateId(): UniqueEntityID {
    return this.id;
  }
}
