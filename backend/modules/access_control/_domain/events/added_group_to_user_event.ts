import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { StringEntityID } from "../../../../core/value_objects/string_entity_id";

export default class AddedGroupsToUserEvent extends IDomainEvent {
  private _userId: string;
  private _groupIds: StringEntityID[];

  constructor(params: {user: string, groupId:StringEntityID[]}) {
    super();
    this._userId = params.user;
    this._groupIds = params.groupId;
  }

  get userId(): string {
    return this._userId;
  }

  get groupIds(): StringEntityID[] {
    return this._groupIds
  }
}
