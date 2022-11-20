import { IDomainEvent } from "../../../../core/interfaces/domain_event";

export default class ChangedPasswordEvent extends IDomainEvent {
  private _userId: string;

  constructor(userId: string) {
    super();
    this._userId = userId;
  }

  get userId(): string {
    return this._userId;
  }
}
