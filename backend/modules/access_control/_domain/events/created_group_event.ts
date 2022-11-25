import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { StringEntityID } from "../../../../core/value_objects/string_entity_id";

export class CreateGroupEvent extends IDomainEvent {
  private _groupId: StringEntityID;

  constructor(groupId: StringEntityID) {
    super();
    this._groupId = groupId;
  }

  get groupId(): StringEntityID {
    return this._groupId;
  }
}
