import { IDomainEvent } from "../../../../core/interfaces/domain_event";

export default class LoginAttemptEvent extends IDomainEvent {
  private _id: string;
  private _username: string;
  private _success: boolean;

  constructor(params: { id: string; username: string; success: boolean }) {
    super();
    this._id = params.id;
    this._username = params.username;
    this._success = params.success;
  }

  get aggregateId(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get success(): boolean {
    return this._success;
  }
}
