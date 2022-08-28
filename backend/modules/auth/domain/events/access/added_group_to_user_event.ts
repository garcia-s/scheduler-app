import { IDomainEvent } from "../../../../../core/domain/events/domain_event";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { AccessControlGroupEntity } from "../../entities/access/access_control_group";

export default class AddedGroupsToUserEvent extends IDomainEvent {
  private id: UniqueEntityID;
  private data: AccessControlGroupEntity[];

  constructor(id: UniqueEntityID, groups: AccessControlGroupEntity[]) {
    super();
    this.id = id;
    this.data = groups;
  }

  get aggregateId(): UniqueEntityID {
    return this.id;
  }
}
