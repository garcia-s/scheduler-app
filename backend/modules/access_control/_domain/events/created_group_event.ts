import { IDomainEvent } from "../../../../core/interfaces/domain_event";

export class CreateGroupEvent extends IDomainEvent {
  private _groupId: string;

  constructor(groupId: string) {
    super();
    this._groupId = groupId;
  }

  get groupId(): string {
    return this._groupId;
  }
}
