import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { GroupEntity } from "../entities/access_control_group";

export default class AddedGroupsToUserEvent extends IDomainEvent {
  private _userId: string;
  private _groupId: string;

  constructor(params: {user: string, groupId:string}) {
    super();
    this._userId = params.user;
    this._groupId = params.groupId;
  }

  get userId(): string {
    return this._userId;
  }

  get groupId(): string {
    return this._groupId
  }
}
